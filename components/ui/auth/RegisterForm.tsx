'use client'

import Link from "next/link";
import { useState } from "react";
import { Mail, User } from "lucide-react";
import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Register Data:", form);
    // TODO: connect ke backend
  };

  return (
    <div className="w-full max-w-md">

      {/* Mobile Logo */}
      <div className="lg:hidden text-center mb-8">
        <h1 className="text-yellow-400 text-2xl font-bold">
          CineMatch
        </h1>
      </div>

      {/* Title */}
      <div className="mb-8 text-center lg:text-left">
        <h1 className="text-3xl font-bold mb-2">
          Buat Akun Baru
        </h1>
        <p className="text-gray-400">
          Daftar untuk mulai memesan tiket film
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Username */}
        <div>
          <label className="text-sm text-gray-400 ml-1">
            Username
          </label>
          <div className="relative mt-1">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Masukkan username"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d1c32] text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-400 ml-1">
            Email
          </label>
          <div className="relative mt-1">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d1c32] text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <PasswordInput 
            label="Password" 
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <PasswordInput 
            label="Konfirmasi" 
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-start gap-2">
          <input type="checkbox" className="mt-1" />
          <p className="text-xs text-gray-400">
            Saya menyetujui{" "}
            <span className="text-yellow-400 cursor-pointer">
              syarat & ketentuan
            </span>
          </p>
        </div>

        {/* Button */}
        <button className="w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:opacity-90 transition">
          Daftar →
        </button>
      </form>

      {/* Login */}
      <p className="text-center text-gray-400 mt-6">
        Sudah punya akun?{" "}
        <Link href="/auth/login" className="text-yellow-400 font-bold hover:underline">
          Masuk
        </Link>
      </p>

    </div>
  );
}