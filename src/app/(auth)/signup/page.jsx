'use client';
import { signup } from "@/libs/api-calling";
import { ApiError } from "next/dist/server/api-utils";
import { useState } from "react";

export default function Signup() {
  console.log(process.env.NEXT_PUBLIC_SUPABASE_API_KEY)
  const [formData,setFormData] = useState({
    user_name:"",
    email:"",
    password:""
  })
const handleInputChange = (e) => {
  const {name,value} = e.target;
  setFormData((prev)=>({...prev,[name]:value}))
}
const handleFormSubit = async(e) => {
  e.preventDefault()
  await signup(formData);
  setFormData({
     user_name:"",
    email:"",
    password:""
  })
  
}


    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <form onSubmit={handleFormSubit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
          
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={(e)=>handleInputChange(e)}
            placeholder="Full Name"
            required
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
             value={formData.email}
            onChange={(e)=>handleInputChange(e)}
            required
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="password"
            name="password"
             value={formData.password}
            onChange={(e)=>handleInputChange(e)}
            placeholder="Password"
            required
            className="w-full mb-6 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    );
  }
  