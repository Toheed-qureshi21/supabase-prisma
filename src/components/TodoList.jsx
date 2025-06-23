'use client';
import { getAllTodos, markTodoAsCompleted, toDeleteTodo, toUpdateTodo } from '@/libs/api-calling';
import { toggleCompletionTodo } from '@/libs/redux/slices/task.slice';
import { Loader2Icon, Pen, Trash2Icon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function TodoList() {
  const { todos,updateLoading,deleteLoading } = useSelector(state => state.todo);
  const dispatch = useDispatch();
  console.log("update loading ",updateLoading)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [editFields, setEditFields] = useState({ title: '', description: '' });

  useEffect(() => {
    getAllTodos(dispatch);
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

  const handleSave = async() => {
    try {
      await toUpdateTodo(editTodo.id,dispatch,editFields);
      closeDialog();
      
    } catch (error) {
      console.log(error);
      
    }
  };

  const handleDeleteTodo = async(id) => {
    try {
      await toDeleteTodo(id,dispatch);
      console.log("Task deleted successfully")
    } catch (error) {
      console.log(error);
      
    }
  }
  const handleTodoAsCompletion = async(id) => {
    try {
      await markTodoAsCompleted(id,dispatch);
    } catch (error) {
      console.log(error);
      
    }
  }
  

  return (
    <div className="w-full max-w-sm min-h-fit mx-auto px-4 py-6 space-y-6" >
      {todos?.length === 0 ? (
        <p className="text-center text-gray-400 italic">No todos yet. Start creating!</p>
      ) : (
        todos.map(todo => (
          <div
            key={todo.id}
            className={`group relative rounded-xl p-4 shadow-lg border border-transparent hover:border-indigo-400  transition-all duration-300 ${
              todo.isCompleted ? 'bg-gradient-to-r from-green-100 to-emerald-100' : 'bg-white'
            }`}
          >
            {/* Header row */}
            <div className="flex items-start justify-between">
              <div>
                <h2
                  className={`text-lg font-semibold ${
                    todo.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}
                >
                  {todo.title}
                </h2>
                <p
                  className={`mt-1 text-sm ${
                    todo.isCompleted ? 'line-through text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {todo.description}
                </p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => openEditDialog(todo)}
                  className="bg-yellow-600 p-2 rounded-full text-white hover:bg-yellow-700"
                >
                  <Pen size={16} />
                </button>
                <button
                  onClick={()=>handleDeleteTodo(todo.id)}
                  className="bg-red-600 p-2 rounded-full text-white hover:bg-red-700"
                  title="Delete"
                >
                  <Trash2Icon size={18} />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-4 text-sm">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-500 rounded-full font-medium">
                {new Date(todo.created_at).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>

              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={() =>handleTodoAsCompletion(todo.id)}
                  className="h-4 w-4 accent-emerald-600"
                />
                <span
                  className={`font-medium ${
                    todo.isCompleted ? 'text-emerald-600' : 'text-gray-700'
                  }`}
                >
                  {todo.isCompleted ? 'Completed' : 'Mark Complete'}
                </span>
              </label>
            </div>
          </div>
        ))
      )}

      {/* Modal Dialog */}
     {isDialogOpen && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-sm p-6 rounded-xl shadow-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Edit Todo</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="edit-title"
            type="text"
            value={editFields.title}
            onChange={(e) => setEditFields(prev => ({ ...prev, title: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="edit-description"
            value={editFields.description}
            onChange={(e) => setEditFields(prev => ({ ...prev, description: e.target.value }))}
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
            onClick={()=>handleSave()}
            className="flex justify-center text-center px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm"
          >
            {
              updateLoading ?  <Loader2Icon className='w-5 h-5 animate-spin'/>  :"Save"
            }
            
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
}
