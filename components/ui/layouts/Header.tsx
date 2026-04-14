'use client'

import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#041329]/60 backdrop-blur-xl">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">

        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl font-bold text-[#ffb400]">
            CineMatch
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-[#ffb400] font-semibold border-b-2 border-[#ffb400] pb-1">
              Beranda
            </Link>
            <Link href="#" className="text-[#b9c7e0] hover:text-[#ffd89c]">
              Promo
            </Link>
            <Link href="#" className="text-[#b9c7e0] hover:text-[#ffd89c]">
              Tiket Saya
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <button className="hover:bg-[#1c2a41]/50 p-2 rounded-lg">
            <span className="material-symbols-outlined text-[#ffd89c]">
              account_circle
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}