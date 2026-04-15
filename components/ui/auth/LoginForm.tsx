'use client';

import { useState } from "react";
import { Mail } from "lucide-react";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login Data:", form);
        // TODO: connect ke backend
    };

    return (
        <div className="w-full max-w-md">

            {/* Title */}
            <div className="mb-8 text-center lg:text-left">
                <h1 className="text-3xl font-bold mb-2">
                    Selamat Datang Kembali
                </h1>
                <p className="text-gray-400">
                    Masuk untuk melanjutkan pemesanan tiket film favoritmu
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Email */}
                <div>
                    <label className="text-sm text-gray-400 ml-1">
                        Email / Username
                    </label>
                    <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            autoComplete="username"
                            placeholder="Masukkan email atau username"
                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d1c32] text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>
                </div>

                {/* Password */}
                <PasswordInput
                    label="Password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                />

                {/* Button */}
                <button
                    type="submit"
                    className="w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:opacity-90 transition"
                >
                    Masuk
                </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
                <div className="flex-1 h-[1px] bg-gray-700"></div>
                <span className="text-xs text-gray-400 uppercase">atau</span>
                <div className="flex-1 h-[1px] bg-gray-700"></div>
            </div>

            {/* Google */}
            <button className="w-full py-3 bg-[#0d1c32] rounded-xl flex items-center justify-center gap-3 hover:bg-[#1c2a41] transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.32-2.11 4.52-1.12 1.12-2.8 2.32-5.73 2.32-4.94 0-8.9-4.04-8.9-8.9s3.96-8.9 8.9-8.9c2.62 0 4.64 1.04 6.06 2.42l2.32-2.32C18.66 1.14 15.9.12 12.48.12 6.54.12 1.7 4.96 1.7 10.9s4.84 10.78 10.78 10.78c3.2 0 5.64-1.06 7.56-3.06 1.98-1.98 2.6-4.76 2.6-7.1 0-.68-.06-1.34-.18-2H12.48z"
                        fill="#EA4335"
                    />
                </svg>
                Masuk dengan Google
            </button>

            {/* Register */}
            <p className="mt-6 text-center text-gray-400">
                Belum punya akun?{" "}
                <a href="/auth/register" className="text-yellow-400 font-bold hover:underline">
                    Daftar Sekarang
                </a>
            </p>

        </div>
    );
}