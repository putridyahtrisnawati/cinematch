'use client'

import Link from "next/link";
import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
  return (
    <div className="w-full max-w-sm md:max-w-md">

      {/* Mobile Logo */}
      <div className="lg:hidden text-center mb-6">
        <h1 className="text-yellow-400 text-xl font-bold">
          CineMatch
        </h1>
      </div>

      {/* Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">
          Buat Akun Baru
        </h1>
        <p className="text-gray-400 text-sm">
          Daftar untuk mulai memesan tiket film
        </p>
      </div>

      <form className="space-y-4">

        <div>
          <label className="text-xs text-gray-400">Username</label>
          <input
            type="text"
            placeholder="Username"
            className="w-full mt-1 bg-[#0d1c32] rounded-xl p-3.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400">Email</label>
          <input
            type="email"
            placeholder="contoh@email.com"
            className="w-full mt-1 bg-[#0d1c32] rounded-xl p-3.5 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <PasswordInput label="Password" />
          <PasswordInput label="Konfirmasi" />
        </div>

        <div className="flex items-start gap-2">
          <input type="checkbox" className="mt-1" />
          <p className="text-xs text-gray-400">
            Saya menyetujui{" "}
            <span className="text-yellow-400">
              syarat & ketentuan
            </span>
          </p>
        </div>

        <button className="w-full bg-yellow-400 text-black text-sm font-bold py-3 rounded-xl hover:opacity-90">
          Daftar →
        </button>
      </form>

      <p className="text-center text-gray-400 text-xs mt-6">
        Sudah punya akun?{" "}
        <Link href="#" className="text-yellow-400 font-semibold">
          Masuk
        </Link>
      </p>

    </div>
  );
}