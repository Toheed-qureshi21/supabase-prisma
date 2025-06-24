'use client'

import { addTask } from "@/libs/api-calling.js";
import { Loader2 } from "lucide-react";
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export default function TodoForm({userId}) {

    
    const [tasks, setTasks] = useState({
        title: "",
        description: "",
    });
    const dispatch = useDispatch();
    const {addLoading} = useSelector((state)=>state.todo);

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        if (!tasks.title.trim() || !tasks.description.trim()) {
            return;
        }
        const data = await addTask(tasks,dispatch,userId);
        console.log(data);
        setTasks({
              title: "",
        description: "",
        });
        

    }


    return (
        <div className="w-sm flex flex-col shadow-2xl bg-gray-100 mx-auto py-12  px-4 rounded-xl">
            <form className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
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
                    disabled={addLoading}
                    className={`w-full flex justify-center text-center bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition ${addLoading && "opacity-90"}`}
                >
                    {
                        addLoading ? (
                            <Loader2 className="animate-spin text-center w-5 h-5"/>
                        ):(
                           <span> Add Task</span>
                        )
                    }
                    
                </button>
            </form>
        </div>
    )
}