"use client";

import { api } from "@/libs/api-calling";
import { setUser } from "@/libs/redux/slices/user.slice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function Signup() {
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.user_name) {
      return  toast.error("All fields are required!");
    }
    setLoading(true)

    try {
      const res = await api.post(`/auth/signup`, formData);
      console.log("Signup user data: ", res);

      setFormData({ user_name: "", email: "", password: "" });

      toast.success(res.data.message);
      dispatch(setUser(res.data.user));

      router.push("/"); // Redirect after signup
    } catch (error) {
      const message = error?.response?.data?.message || "Signup failed";
      toast.error(message);
      console.error(message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Create an Account</h2>
          <p className="text-gray-500 text-sm">Sign up to get started</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-5">
          <input
            type="text"
            name="user_name"
            value={formData.user_name}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r flex text-center justify-center from-blue-900 to-blue-600 text-white py-3 rounded-md font-semibold hover:from-blue-950 hover:to-blue-700 transition"
          >
            {
                loading ? <Loader2 size={18} className="animate-spin"/>  :"Sign up"
            }
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-700 font-medium hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
