"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ProfileSidebar() {
  const pathname = usePathname();

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
  };

  return (
    <aside className="bg-[#0d1c32] rounded-2xl p-8 h-fit">

      <div className="flex flex-col items-center text-center">

        <label className="relative cursor-pointer group">

          {profileImage ? (
            <img
              src={profileImage}
              alt="Foto Profil"
              className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-yellow-400 flex items-center justify-center text-5xl font-bold text-black">
              A
            </div>
          )}

          <div className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-[#07111f] border-2 border-[#0d1c32] flex items-center justify-center text-sm text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-200 shadow-lg">
            🖉
          </div>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

        </label>

        <h2 className="mt-6 font-semibold text-2xl">
          Aris Setiawan
        </h2>

        <p className="text-base text-gray-400 mt-1">
          aris@email.com
        </p>

      </div>

      <div className="mt-8 space-y-4">

        <Link
          href="/profile/edit"
          className={`block w-full rounded-xl px-5 py-4 text-base transition-all duration-200 ${pathname === "/profile/edit"
            ? "bg-yellow-400 text-black font-semibold"
            : "text-gray-300 hover:bg-yellow-400 hover:text-black hover:font-semibold"
            }`}
        >
          Edit Profil
        </Link>

        <Link
          href="/profile/settings"
          className={`block w-full rounded-xl px-5 py-4 text-base transition-all duration-200 ${pathname === "/profile/settings"
            ? "bg-yellow-400 text-black font-semibold"
            : "text-gray-300 hover:bg-yellow-400 hover:text-black hover:font-semibold"
            }`}
        >
          Pengaturan Akun
        </Link>

        <button className="w-full text-left text-red-400 hover:bg-red-500/10 rounded-xl px-5 py-4 text-base transition-all duration-200">
          Keluar
        </button>

      </div>

    </aside>
  );
}