"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  KeyRound,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react";

export default function SettingsPage() {
  const [openPassword, setOpenPassword] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showDeletePassword, setShowDeletePassword] = useState(false);

  return (
    <main className="min-h-screen bg-[#07111f] text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/profile"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0d1c32] hover:bg-yellow-400 hover:text-black transition"
          >
            ←
          </Link>

          <h1 className="text-3xl font-bold">Pengaturan Akun</h1>
        </div>

        <div className="space-y-5">
          <div className="bg-[#0d1c32] rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenPassword(!openPassword)}
              className="w-full flex items-center justify-between px-6 py-5 hover:bg-[#14243a] transition"
            >
              <div className="flex items-center gap-3">
                <KeyRound size={18} className="text-gray-400" />
                <span className="font-medium">Ganti Password</span>
              </div>

              {openPassword ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {openPassword && (
              <div className="px-6 pb-6 space-y-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Password Lama
                  </label>

                  <div className="relative">
                    <input
                      type={showOldPassword ? "text" : "password"}
                      placeholder="Masukkan password lama"
                      className="w-full bg-[#14243a] border border-white/5 rounded-xl px-4 py-3 pr-12 outline-none focus:border-yellow-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
                    >
                      {showOldPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Password Baru
                  </label>

                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Masukkan password baru"
                      className="w-full bg-[#14243a] border border-white/5 rounded-xl px-4 py-3 pr-12 outline-none focus:border-yellow-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
                    >
                      {showNewPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition">
                  Simpan Password
                </button>
              </div>
            )}
          </div>

          <div className="bg-[#0d1c32] rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setOpenDelete(!openDelete)}
              className="w-full flex items-center justify-between px-6 py-5 hover:bg-[#14243a] transition"
            >
              <div className="flex items-center gap-3">
                <Trash2 size={18} className="text-gray-400" />
                <span className="font-medium">Delete Account</span>
              </div>

              {openDelete ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {openDelete && (
              <div className="px-6 pb-6 space-y-4">
                <p className="text-sm text-gray-400">
                  Untuk menghapus akun, masukkan password Anda terlebih dahulu.
                </p>

                <div className="relative">
                  <input
                    type={showDeletePassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    className="w-full bg-[#14243a] border border-white/5 rounded-xl px-4 py-3 pr-12 outline-none focus:border-red-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowDeletePassword(!showDeletePassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition"
                  >
                    {showDeletePassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <button className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-semibold transition">
                  Hapus Akun
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}