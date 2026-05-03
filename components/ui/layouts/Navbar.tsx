'use client'

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#041329]/60 backdrop-blur-xl border-b border-white/5">

      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">

        {/* LEFT */}
        <div className="flex items-center gap-10">

          {/* LOGO */}
          <Link href="/" className="text-xl font-bold text-yellow-400">
            CineMatch
          </Link>

          {/* MENU */}
          <nav className="hidden md:flex items-center gap-8 text-sm">

            <Link
              href="/"
              className="text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
            >
              Beranda
            </Link>

            <Link
              href="#"
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              Promo
            </Link>

            <Link
              href="#"
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              Tiket Saya
            </Link>

          </nav>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* ICON PROFILE */}
          <button className="p-2 rounded-full hover:bg-white/10 transition">
            <span className="material-symbols-outlined text-yellow-400">
              account_circle
            </span>
          </button>

        </div>

      </div>

    </header>
  );
}

