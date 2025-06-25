"use client";

import { api } from "@/libs/api-calling";
import { setUser } from "@/libs/redux/slices/user.slice";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
      setFormData({
        email: "",
        password: "",
      });

      if (data) {
        setUser(data.user)
        router.push("/");
      }
      router.push("/");
    } catch (error) {
      console.log(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={(e) => handleFormSubmission(e)}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={(e) => handleInputChange(e)}
          required
          className="w-full mb-4 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={(e) => handleInputChange(e)}
          required
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="flex gap-2 mb-4">
        <input type="checkbox" name="" id="" />
          Remember me
        </label>
        <button
          type="submit"
          className={`w-full bg-gradient-to-r flex justify-center from-blue-950 to-blue-600 text-white py-3 rounded font-semibold hover:from-blue-950 hover:to-blue-800 transition-all ease-in ${loading ? "opacity-80 hover:cursor-not-allowed":""}`}
          disabled={loading || !formData.email || !formData.password}
        >
          {loading ? (
            <Loader2Icon size={20} className="animate-spin" />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}
