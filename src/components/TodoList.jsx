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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  CheckCircle2Icon,
  ChevronDown,
  Loader2Icon,
  Pen,
  Trash2Icon,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoSkeleton from "./TodoSkeleton";
import toast from "react-hot-toast";

export default function TodoList({ userId }) {
  const { todos, updateLoading, loading, isUpdated } = useSelector(
    (state) => state.todo
  );
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [editFields, setEditFields] = useState({ title: "", description: "" });
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
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
        dispatch(updateTodoByCompletionMark(data.data));
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
    return <TodoSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      {todos?.length > 0 && (
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search todos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border-gray-300"
          />
        </div>
      )}

      <div className="overflow-x-auto border rounded-lg">
        <Table className="table-auto border border-gray-300">
          <TableHeader>
            <TableRow className="bg-gray-100 border-b border-gray-300">
              <TableHead className="w-[200px] border-r border-gray-300 px-4 py-2">
                Title
              </TableHead>
              <TableHead className="border-r border-gray-300 px-4 py-2">
                Description
              </TableHead>
              <TableHead className="border-r border-gray-300 px-4 py-2">
                Status
              </TableHead>
              <TableHead className="text-center border-r border-gray-300 px-4 py-2">
                Due Date
              </TableHead>
              <TableHead className="text-center px-4 py-2">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTodos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center italic text-gray-400 px-4 py-2 border-t border-gray-300"
                >
                  No todos found. Create one!
                </TableCell>
              </TableRow>
            ) : (
              filteredTodos.map((todo) => (
                <TableRow key={todo.id} className="border-t border-gray-300">
                  <TableCell
                    className={`px-4 py-2 border-r border-gray-300 ${
                      todo.isCompleted ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.title}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-2 border-r border-gray-300 ${
                      todo.isCompleted ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.description}
                  </TableCell>
                  <TableCell className="px-4 py-2 border-r border-gray-300">
                    <Select
                      value={todo.isCompleted ? "completed" : "pending"}
                      onValueChange={() => handleTodoAsCompletion(todo)}
                    >
                      <SelectTrigger
                        className={`w-[130px] ${
                          todo.isCompleted
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-xs text-center text-gray-600 px-4 py-2 border-r border-gray-300">
                    <div>
                      <p>
                        {new Date(todo.due_date).toLocaleDateString("en-Gb")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center px-4 py-2">
                    <div className="flex justify-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => openEditDialog(todo)}
                      >
                        <Pen size={16} />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => toDeleteTodo(todo.id, dispatch)}
                      >
                        <Trash2Icon size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogContent className="sm:max-w-md w-full rounded-xl">

          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                value={editFields.title}
                onChange={(e) =>
                  setEditFields((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            </div>
            <div>
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Input
                id="description"
                value={editFields.description}
                onChange={(e) =>
                  setEditFields((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button variant="secondary" onClick={closeDialog}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={updateLoading}>
              {updateLoading ? (
                <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
