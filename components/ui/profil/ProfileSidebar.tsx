"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Camera,
  LogOut,
  Settings,
  PencilLine,
  Mail,
  ShieldCheck,
  Trash2,
} from "lucide-react";

export default function ProfileSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState("User");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const [logoutPopup, setLogoutPopup] = useState(false);

  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");

    if (savedImage) {
      setProfileImage(savedImage);
    }

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      setLoading(false);
      return;
    }

    try {
      const user = JSON.parse(savedUser);
      const id = user?.id;

      setUsername(user?.username || "User");
      setEmail(user?.email || "");

      if (!id) {
        setLoading(false);
        return;
      }

      fetch(`/api/profile?id=${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUsername(data.user?.username || user?.username || "User");
          setEmail(data.user?.email || user?.email || "");
        })
        .catch(() => {
          setUsername(user?.username || "User");
          setEmail(user?.email || "");
        })
        .finally(() => {
          setLoading(false);
        });
    } catch {
      setLoading(false);
    }
  }, []);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageUrl = reader.result as string;

      setProfileImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    localStorage.removeItem("profileImage");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLogoutPopup(false);
    router.replace("/auth/login");
  };

  if (loading) {
    return (
      <aside className="relative overflow-hidden bg-gradient-to-b from-[#0d1c32] to-[#08172a] rounded-3xl p-8 h-fit border border-white/10 shadow-2xl shadow-black/30">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-yellow-400/10 blur-3xl rounded-full" />

        <div className="relative flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full bg-white/10 animate-pulse" />
          <div className="mt-6 h-7 w-40 bg-white/10 rounded-lg animate-pulse" />
          <div className="mt-3 h-5 w-48 bg-white/5 rounded-lg animate-pulse" />
        </div>

        <div className="relative mt-8 space-y-4">
          <div className="h-14 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-14 bg-white/5 rounded-xl animate-pulse" />
          <div className="h-14 bg-white/5 rounded-xl animate-pulse" />
        </div>
      </aside>
    );
  }

  const menuClass = (active: boolean) =>
    `flex items-center gap-3 w-full rounded-2xl px-5 py-4 text-base transition-all duration-200 active:scale-[0.98] ${
      active
        ? "bg-yellow-400 text-black font-semibold shadow-lg shadow-yellow-400/10"
        : "text-gray-300 hover:bg-white/5 hover:text-yellow-400"
    }`;

  return (
    <>
      <aside className="relative overflow-hidden bg-gradient-to-b from-[#0d1c32] to-[#08172a] rounded-3xl p-8 h-fit border border-white/10 shadow-2xl shadow-black/30">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-yellow-400/10 blur-3xl rounded-full" />

        <div className="relative flex flex-col items-center text-center">
          <label className="relative cursor-pointer group">
            <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-xl shadow-yellow-400/10 transition-all duration-300 group-hover:scale-105">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Foto Profil"
                  className="w-full h-full rounded-full object-cover border-4 border-[#0d1c32]"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-yellow-400 flex items-center justify-center text-5xl font-extrabold text-black border-4 border-[#0d1c32]">
                  {username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <div className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-[#041329] border-2 border-[#0d1c32] flex items-center justify-center text-yellow-400 group-hover:bg-yellow-400 group-hover:text-black transition-all duration-200 shadow-lg">
              <Camera size={18} />
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {profileImage && (
            <button
              type="button"
              onClick={handleRemoveImage}
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white active:scale-95 transition-all duration-200"
            >
              <Trash2 size={14} />
              Hapus Foto
            </button>
          )}

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 text-xs text-yellow-400 font-semibold">
            <ShieldCheck size={14} />
            Akun CineMatch
          </div>

          <h2 className="mt-4 font-bold text-2xl leading-tight">
            {username}
          </h2>

          <div className="mt-2 flex items-center justify-center gap-2 text-gray-400 max-w-full">
            <Mail size={15} className="shrink-0" />

            <p className="text-sm break-all">
              {email || "Email belum tersedia"}
            </p>
          </div>
        </div>

        <div className="relative mt-8 space-y-3">
          <Link
            href="/profile/edit"
            className={menuClass(pathname === "/profile/edit")}
          >
            <PencilLine size={18} />
            <span>Edit Profil</span>
          </Link>

          <Link
            href="/profile/settings"
            className={menuClass(pathname === "/profile/settings")}
          >
            <Settings size={18} />
            <span>Pengaturan Akun</span>
          </Link>

          <button
            type="button"
            onClick={() => setLogoutPopup(true)}
            className="flex items-center gap-3 w-full text-left text-red-400 hover:bg-red-500/10 rounded-2xl px-5 py-4 text-base transition-all duration-200 active:scale-[0.98]"
          >
            <LogOut size={18} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {logoutPopup && (
        <div
          className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLogoutPopup(false)}
        >
          <div
            className="bg-[#0d1c32] w-full max-w-md rounded-3xl p-7 border border-white/10 shadow-2xl animate-[popup_.25s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-5">
              <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center">
                <LogOut size={30} />
              </div>
            </div>

            <h3 className="text-center text-xl font-bold mb-2">
              Keluar dari Akun?
            </h3>

            <p className="text-center text-gray-400 mb-6 leading-relaxed">
              Anda akan keluar dari akun CineMatch dan diarahkan ke halaman login.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLogoutPopup(false)}
                className="py-3 rounded-xl bg-[#14243a] text-gray-300 font-semibold hover:bg-[#1b2d46] active:scale-95 transition-all duration-200"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 active:scale-95 transition-all duration-200"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}