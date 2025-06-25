"use client";
import {
  api,
  getAllTodos,
  toDeleteTodo,
  toUpdateTodo,
} from "@/libs/api-calling";
import {
  toggleCompletionTodo,
  updateTodoByCompletionMark,
} from "@/libs/redux/slices/task.slice";
import { Loader2Icon, Pen, Trash2Icon, CheckCircle2Icon, ArrowDownNarrowWideIcon, LucideArrowDownNarrowWide, MenuIcon, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoSkeleton from "./TodoSkeleton";
import toast from "react-hot-toast";

export default function TodoList({ userId }) {
  const { todos, updateLoading, loading,isUpdated } = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [editTodo, setEditTodo] = useState(null);
  const [editFields, setEditFields] = useState({ title: "", description: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async()=>{
      await getAllTodos(dispatch, userId);   
    })();
    
  }, [dispatch]);

  const openEditDialog = (todo) => {
    setEditTodo(todo);
    setEditFields({ title: todo.title, description: todo.description });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditTodo(null);
  };

  const handleSave = async () => {
    try {
      await toUpdateTodo(editTodo.id, dispatch, editFields);
      closeDialog();
    } catch (error) {
      console.log(error);
    }
  };

  const handleTodoAsCompletion = async (todo) => {
    try {
      if (!todo.isCompleted) {
        const { data } = await api.patch(`/markascomplete/${todo.id}`);
        dispatch(toggleCompletionTodo(todo.id));
        dispatch(updateTodoByCompletionMark(data.data[0]));
        toast.success("Marked as completed!");
      } else {
        const { data } = await api.patch(`/markasuncomplete/${todo.id}`);
        dispatch(toggleCompletionTodo(todo.id));
        dispatch(updateTodoByCompletionMark(data));

        toast.success("Marked as pending.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  const filteredTodos = todos?.filter(
    (todo) =>
      todo?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
      todo?.description?.toLowerCase()?.includes(search?.toLowerCase())
  );

  if (loading) {
    return Array.from({ length: 4 }).map((_, index) => (
      <TodoSkeleton key={index} />
    ));
  }

  return (
    <div className="w-xs sm:w-md mx-auto py-6">
      {/* Search Input */}
      {
        todos?.length > 0 && (
             <div className="mb-6">
        <input
          className="w-full px-4 py-2 border bg-white border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
        ) 
      }
     

      {/* Todo List */}
      <div className="space-y-6">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-400 italic">
            No todos found. Create one!
          </p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`relative transition-all duration-300 p-5  rounded-xl shadow-md  overflow-hidden bg-white border-2 ${
                todo.isCompleted
                  ? " border-green-700"
                  : " border-indigo-700"
              }`}
            >
              {/* Completed icon */}
             
                <div className="absolute top-2 right-2  bg-white/80 px-2 py-1 rounded-full text-xs font-medium shadow">
                  {
                    todo.isCompleted ? (
                      <span className="text-green-600">
                         <CheckCircle2Icon className="inline-block w-4 h-4 mr-1" />
                  Completed
                      </span>
                    ):(
                      <span className="text-red-500">Pending</span>
                    )
                  }
                 
                </div>
             

              {/* Title + Description */}
              <div>
                <h2
                  className={`text-lg font-semibold ${
                    todo.isCompleted ? "text-gray-700 line-through" : ""
                  }`}
                >
                  {todo.title}
                </h2>
                <p
                  className={`mt-1 text-sm ${
                    todo.isCompleted ? "text-gray-700 line-through" : ""
                  }`}
                >
                  {todo.description}
                </p>
              </div>

              <div className="flex justify-between max-sm:gap-1 items-end mt-4">
                {/* Date */}
                <div className="text-xs text-gray-500">
                  <p>{isUpdated ? "Updated at" : "Created at"}</p>
                  <p>
                    {isUpdated
                      ? new Date(todo.created_at).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : new Date(todo.created_at).toLocaleDateString()}
                  </p>
                  <p>
                    {isUpdated
                      ? new Date(todo.created_at).toLocaleTimeString(
                          undefined,
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : new Date(todo.created_at).toLocaleTimeString()}
                  </p>
                </div>

                {/*  Dropdown */}
                <div className="flex flex-col gap-1 text-sm">
                  <label className="text-gray-600 font-medium text-center">Status</label>
                  <div className="relative w-full ">
                    <select
                      value={todo.isCompleted ? "completed" : "pending"}
                      onChange={() => handleTodoAsCompletion(todo)}
                      className={`w-full appearance-none px-4 py-2 pr-10 rounded-lg border text-sm font-medium shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        todo.isCompleted
                          ? "bg-green-50 text-green-800 border-green-500 focus:ring-green-300"
                          : "bg-red-50 text-red-700 border-red-500 focus:ring-red-300"
                      }`}
                    >
                      <option
                        value="pending"
                        className="bg-red-100 text-red-700 font-semibold py-2"
                      >
                        Pending
                      </option>
                      <option
                        value="completed"
                        className="bg-green-100 text-green-800 font-semibold py-2"
                      >
                        Completed
                      </option>
                    </select>

                    {/* Down arrow icon */}
                    <div className="pointer-events-none absolute top-2 right-3 transform -translate-y-1/2 text-gray-500">
                      <ChevronDown/>
                    </div>
                  </div>
                </div>

                {/* Edit & Delete */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditDialog(todo)}
                    className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
                    title="Edit"
                  >
                    <Pen size={16} />
                  </button>
                  <button
                    onClick={() => toDeleteTodo(todo.id, dispatch)}
                    className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white"
                    title="Delete"
                  >
                    <Trash2Icon size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-sm p-6 rounded-lg shadow-2xl">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Edit Todo
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="edit-title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  id="edit-title"
                  type="text"
                  value={editFields.title}
                  onChange={(e) =>
                    setEditFields((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter title"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="edit-description"
                  value={editFields.description}
                  onChange={(e) =>
                    setEditFields((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter description"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeDialog}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm"
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={updateLoading}
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
                >
                  {updateLoading ? (
                    <Loader2Icon className="w-5 h-5 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
