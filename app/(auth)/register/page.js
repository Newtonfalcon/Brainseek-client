"use client"
import { useState } from "react";

export default function RegisterPage() {
      const [name, setName] = useState("")
      const [email, setEmail] = useState("")

      const [password, setPassword] = useState("")


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-gray-800">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
            BS
          </div>
        </div>

        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Create your BrainSeek Account
        </h1>

        <form className="space-y-5"
        onSubmit={(e)=> {e.preventDefault()
             return alert( email, password)}}
        >
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Full Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2 text-sm">Email</label>
            <input
              type="email"
               onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2 text-sm">Password</label>
            <input
              type="password"
               onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-gradient-to-r from-purple-600 to-blue-500 hover:opacity-90 text-white font-medium rounded-xl transition"
          >
            Register
          </button>
        </form>

        <p className="text-gray-500 text-center text-sm mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-purple-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
