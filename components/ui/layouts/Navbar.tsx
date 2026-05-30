"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isLogin, setIsLogin] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const [username, setUsername] = useState("User");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedImage = localStorage.getItem("profileImage");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        setIsLogin(true);
        setUsername(user?.username || "User");
        setProfileImage(savedImage || null);
      } catch {
        setIsLogin(false);
        setUsername("User");
        setProfileImage(null);
      }
    } else {
      setIsLogin(false);
      setUsername("User");
      setProfileImage(null);
    }

    setOpenDropdown(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    return null;
  }

  const handleProfileClick = () => {
    const user = localStorage.getItem("user");

    if (user) {
      router.push("/profile");
      return;
    }

    setIsLogin(false);
    setOpenDropdown((prev) => !prev);
  };

  const handleLoginClick = () => {
    setOpenDropdown(false);
    router.push("/auth/login");
  };

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#041329]/75 backdrop-blur-xl border-b border-white/5">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-xl font-bold text-yellow-400 hover:text-yellow-300 transition"
          >
            CineMatch
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            <Link
              href="/"
              className={
                isActive("/")
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
                  : "text-gray-300 hover:text-yellow-400 transition"
              }
            >
              Beranda
            </Link>

            <Link
              href="/promos"
              className={
                isActive("/promos")
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
                  : "text-gray-300 hover:text-yellow-400 transition"
              }
            >
              Promo
            </Link>

            <Link
              href="/tickets"
              className={
                isActive("/tickets")
                  ? "text-yellow-400 font-semibold border-b-2 border-yellow-400 pb-1"
                  : "text-gray-300 hover:text-yellow-400 transition"
              }
            >
              Tiket Saya
            </Link>
          </nav>
        </div>

        <div ref={dropdownRef} className="relative">
          <button
            type="button"
            onClick={handleProfileClick}
            aria-label="Menu profil"
            className={`w-12 h-12 rounded-full border flex items-center justify-center overflow-hidden shadow-lg transition-all duration-200 group active:scale-95 ${
              openDropdown
                ? "bg-yellow-400 border-yellow-400 text-black scale-105"
                : "bg-[#0d1c32] border-yellow-400/30 text-yellow-400 shadow-yellow-400/10 hover:bg-yellow-400 hover:text-black hover:scale-105"
            }`}
          >
            {isLogin ? (
              profileImage ? (
                <img
                  src={profileImage}
                  alt="Foto Profil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-lg font-bold">
                  {username.charAt(0).toUpperCase()}
                </span>
              )
            ) : (
              <span className="material-symbols-outlined transition">
                account_circle
              </span>
            )}
          </button>

          {!isLogin && openDropdown && (
            <div className="absolute right-0 mt-4 w-64 rounded-2xl bg-[#0d1c32] border border-white/10 shadow-2xl shadow-black/40 p-3 animate-[popup_.18s_ease]">
              <div className="px-4 py-3 border-b border-white/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full bg-yellow-400/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-yellow-400 text-[22px]">
                      lock
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-white">
                    Belum login?
                  </p>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed">
                  Login dulu untuk akses profil, tiket, dan pemesanan kursi.
                </p>
              </div>

              <button
                type="button"
                onClick={handleLoginClick}
                className="mt-3 w-full bg-yellow-400 text-black font-semibold rounded-xl px-4 py-3 hover:bg-yellow-300 active:scale-95 transition-all duration-200"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}