'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import {
  api,
  getAllTodos,
  addTask,
  toUpdateTodo,
  toDeleteTodo,
} from '@/libs/api-calling';
import {
  toggleCompletionTodo,
  updateTodoByCompletionMark,
} from '@/libs/redux/slices/task.slice';
import {
  Loader2Icon,
  Pen,
  Trash2Icon,
  CheckCircle2Icon,
} from 'lucide-react';

export default function TodoPage({ userId }) {
  const dispatch = useDispatch();
  const { todos, loading, addLoading, updateLoading } = useSelector(
    (s) => s.todo
  );

  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [editTodo, setEditTodo] = useState(null);
  const [editFields, setEditFields] = useState({
    title: '',
    description: '',
  });
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllTodos(dispatch, userId);
  }, [dispatch, userId]);

  const openAdd = () => setIsAdding(true);
  const closeAdd = () => {
    setIsAdding(false);
    setNewTask({ title: '', description: '', dueDate: '' });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    await addTask(
      {
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
      },
      dispatch,
      userId
    );
    closeAdd();
  };

  const openEdit = (todo) => {
    setEditTodo(todo);
    setEditFields({ title: todo.title, description: todo.description });
  };
  const closeEdit = () => setEditTodo(null);

  const handleSave = async () => {
    await toUpdateTodo(editTodo.id, dispatch, editFields);
    closeEdit();
  };

  const handleToggle = async (todo) => {
    try {
      const url = todo.isCompleted
        ? `/markasuncomplete/${todo.id}`
        : `/markascomplete/${todo.id}`;
      const { data } = await api.patch(url);
      dispatch(toggleCompletionTodo(todo.id));
      dispatch(updateTodoByCompletionMark(data.data || data));
      toast.success(todo.isCompleted ? 'Marked pending' : 'Marked complete');
    } catch {
      toast.error('Error updating status');
    }
  };

  const handleDelete = (id) => toDeleteTodo(id, dispatch);

  const filteredTodos = todos?.filter(
    (todo) =>
      todo?.title?.toLowerCase()?.includes(search.toLowerCase()) ||
      todo?.description?.toLowerCase()?.includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create Today’s Tasks
          </h1>
          {!isAdding && todos.length === 0 && (
            <button
              onClick={openAdd}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              + Add Task
            </button>
          )}
        </div>

        {/* Add Task Form */}
        {isAdding && (
          <form
            onSubmit={handleAdd}
            className="bg-white p-6 rounded-lg shadow space-y-4 border border-gray-200"
          >
            <input
              type="text"
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask((p) => ({ ...p, title: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="Description (optional)"
              rows="3"
              value={newTask.description}
              onChange={(e) =>
                setNewTask((p) => ({ ...p, description: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={newTask.dueDate}
              onChange={(e) =>
                setNewTask((p) => ({ ...p, dueDate: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={closeAdd}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={addLoading}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center gap-2"
              >
                {addLoading && (
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                )}
                Add
              </button>
            </div>
          </form>
        )}

        {/* Search Input */}
        {todos.length > 0 && (
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border bg-white border-indigo-400 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        )}

        {/* Task List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading tasks...</p>
        ) : filteredTodos.length === 0 ? (
          <p className="text-center text-gray-400 italic">
            No tasks found. Add or adjust search.
          </p>
        ) : (
          <div className="space-y-4">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`relative bg-gradient-to-br from-blue-700 via-indigo-600 to-purple-700 text-white transition-all duration-300 p-5 rounded-xl shadow-md overflow-hidden border-2 ${
                  todo.isCompleted
                    ? 'border-green-700'
                    : 'border-indigo-700'
                }`}
              >
                {/* Status */}
                <div className="absolute top-2 right-2 bg-white/80 px-2 py-1 rounded-full text-xs font-medium shadow">
                  {todo.isCompleted ? (
                    <span className="text-green-600">
                      <CheckCircle2Icon className="inline-block w-4 h-4 mr-1" />
                      Completed
                    </span>
                  ) : (
                    <span className="text-red-500">Pending</span>
                  )}
                </div>

                {/* Title + Description */}
                <div>
                  <h2
                    className={`text-lg font-semibold ${
                      todo.isCompleted
                        ? 'text-gray-200 line-through'
                        : ''
                    }`}
                  >
                    {todo.title}
                  </h2>
                  {todo.description && (
                    <p className="text-sm text-white/90 mt-1">
                      {todo.description}
                    </p>
                  )}
                  {todo.dueDate && (
                    <p className="text-xs text-white/70 mt-1">
                      Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleToggle(todo)}
                    className="text-sm bg-white text-black px-3 py-1 rounded-full"
                  >
                    {todo.isCompleted ? 'Undo' : 'Mark Done'}
                  </button>
                  <button
                    onClick={() => openEdit(todo)}
                    className="text-yellow-300"
                  >
                    <Pen size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="text-red-300"
                  >
                    <Trash2Icon size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Modal */}
        {editTodo && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-sm space-y-4 shadow-lg">
              <h3 className="text-lg font-medium">Edit Task</h3>
              <input
                type="text"
                value={editFields.title}
                onChange={(e) =>
                  setEditFields((p) => ({ ...p, title: e.target.value }))
                }
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-400"
                placeholder="Title"
              />
              <textarea
                rows="3"
                value={editFields.description}
                onChange={(e) =>
                  setEditFields((p) => ({
                    ...p,
                    description: e.target.value,
                  }))
                }
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-400"
                placeholder="Description"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={closeEdit}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={updateLoading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  {updateLoading ? (
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
