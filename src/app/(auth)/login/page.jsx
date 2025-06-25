"use client";

import { api } from "@/libs/api-calling";
import { setUser } from "@/libs/redux/slices/user.slice";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      console.log("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post(`/auth/login`, formData);
      console.log("login frontend data ", data);
      setFormData({ email: "", password: "" });

      if (data) {
        setUser(data.user);
        router.push("/");
      }
    } catch (error) {
      console.log(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Login to your account</p>
        </div>

        <form onSubmit={handleFormSubmission} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-blue-600" />
              Remember me
            </label>
            {/* You can add a Forgot Password link here */}
          </div>

          <button
            type="submit"
            disabled={loading || !formData.email || !formData.password}
            className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-900 to-blue-600 text-white py-3 rounded-md font-semibold transition-all ${
              loading
                ? "opacity-80 cursor-not-allowed"
                : "hover:from-blue-950 hover:to-blue-700"
            }`}
          >
            {loading ? <Loader2Icon size={20} className="animate-spin" /> : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Not registered yet?{" "}
          <Link href="/signup" className="text-blue-700 font-medium hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
