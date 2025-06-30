"use client";

import { addTask } from "@/libs/api-calling.js";
import { Calendar, Flag, Bell, MoreHorizontal, Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";

export default function TodoForm({ userId }) {
  const [tasks, setTasks] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const dispatch = useDispatch();
  const { addLoading } = useSelector((state) => state.todo);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTasks((prev) => ({ ...prev, [id]: value }));
    
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!tasks.title.trim() || !tasks.description.trim()) return;

    const data = await addTask(tasks, dispatch, userId);
    console.log(data);

    setTasks({ title: "", description: "", dueDate: "" });
  };

  return (
    <div className="w-full max-w-3xl border rounded-lg p-4 bg-white space-y-2 shadow">
      <form onSubmit={handleFormSubmit} className="space-y-2">
        {/* Title & Description */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <input
              type="text"
              id="title"
              placeholder="Task title..."
              value={tasks.title}
              onChange={handleChange}
              required
              className="w-full text-lg font-medium text-gray-800 focus:outline-none"
            />
            <input
              type="text"
              id="description"
              placeholder="Description"
              value={tasks.description}
              onChange={handleChange}
              className="w-full text-sm text-gray-500 mt-1 focus:outline-none"
            />
          </div>
          {/* Optional Icon */}
          <button type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="red"
              className="bi bi-soundwave"
              viewBox="0 0 16 16"
            >
              <path d="M2 8a.5.5 0 0 1 .5.5v-.998a.5.5 0 0 1-.5.5zm2-3a.5.5 0 0 1 .5.5v4.998a.5.5 0 0 1-1 0V5.5a.5.5 0 0 1 .5-.5zm2-2a.5.5 0 0 1 .5.5v8.998a.5.5 0 0 1-1 0V3.5a.5.5 0 0 1 .5-.5zm2 4a.5.5 0 0 1 .5.5v.998a.5.5 0 0 1-1 0V7.5a.5.5 0 0 1 .5-.5zm2-3a.5.5 0 0 1 .5.5v6.998a.5.5 0 0 1-1 0V5.5a.5.5 0 0 1 .5-.5zm2 2a.5.5 0 0 1 .5.5v2.998a.5.5 0 0 1-1 0V7.5a.5.5 0 0 1 .5-.5z" />
            </svg>
          </button>
        </div>

        {/* Extras */}
        <div className="flex flex-wrap items-center space-x-2 text-sm mt-2">
          <label className="flex items-center space-x-1 px-2 py-1 border rounded text-green-600 hover:bg-green-50 cursor-pointer">
            <Calendar size={14} />
            <input
              type="date"
              name="dueDate"
              id="dueDate"
              min={new Date().toISOString().split("T")[0]}
              value={tasks.dueDate}
              onChange={handleChange}
              className="outline-none bg-transparent cursor-pointer"
            />
          </label>
          {/* <button
            type="button"
            className="flex items-center space-x-1 px-2 py-1 border rounded text-gray-600 hover:bg-gray-50"
          >
            <Flag size={14} />
            <span>Priority</span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-1 px-2 py-1 border rounded text-gray-600 hover:bg-gray-50"
          >
            <Bell size={14} />
            <span>Reminders</span>
          </button>
          <button
            type="button"
            className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-50"
          >
            <MoreHorizontal size={14} />
          </button> */}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end  items-center pt-2 border-t mt-2">
          <div className="space-x-2 flex ">
             <Button
              type="submit"
        
              disabled={addLoading}
              className="w-18 py-1 text-sm flex items-center text-center gap-1"
            >
              {addLoading ? <Loader2 className="w-4 h-4 animate-spin" />:"Add Task"}
            </Button>
            <Button
              type="button"
              variant='destructive'
              className="px-3 py-1 text-sm "
              onClick={() =>
                setTasks({ title: "", description: "", dueDate: "" })
              }
            >
              Cancel
            </Button>
           
          </div>
        </div>
      </form>
    </div>
  );
}
