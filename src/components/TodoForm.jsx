'use client'

import { addTask } from "@/libs/api-calling.js";
import { useState } from "react"
import { useDispatch } from "react-redux";

export default function TodoForm() {
    const [todo, setTodo] = useState([]);
    const [tasks, setTasks] = useState({
        title: "",
        description: "",
    });
    const dispatch = useDispatch();

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const data = await addTask(tasks,dispatch);
        console.log(data);
        setTasks({
              title: "",
        description: "",
        })
        setTodo(data)
    }


    return (
        <div className="w-full max-w-sm mx-auto p-4 bg-white rounded-xl shadow-md">
            <form className="space-y-3" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={tasks.title}
                    onChange={(e) => setTasks((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Title"
                    // name="title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    placeholder="Description"
                    // name="description"
                    value={tasks.description}
                    onChange={(e) => setTasks((prev) => ({ ...prev, description: e.target.value }))}
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                    Add Task
                </button>
            </form>
        </div>
    )
}