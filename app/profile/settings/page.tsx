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
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  LockKeyhole,
} from "lucide-react";
import { useRouter } from "next/navigation";

type PopupType = "success" | "error" | "warning" | "confirm";

type Popup = {
  open: boolean;
  type: PopupType;
  title: string;
  message: string;
  action?: "delete-account" | "redirect-register";
};

export default function SettingsPage() {
  const router = useRouter();

  const [openPassword, setOpenPassword] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showDeletePassword, setShowDeletePassword] = useState(false);

  const [loadingPassword, setLoadingPassword] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [popup, setPopup] = useState<Popup>({
    open: false,
    type: "warning",
    title: "",
    message: "",
  });

  const showPopup = (
    type: PopupType,
    title: string,
    message: string,
    action?: Popup["action"]
  ) => {
    setPopup({
      open: true,
      type,
      title,
      message,
      action,
    });
  };

  const closePopup = () => {
    const action = popup.action;

    setPopup({
      open: false,
      type: "warning",
      title: "",
      message: "",
    });

    if (action === "redirect-register") {
      router.replace("/auth/register");
    }
  };

  const getUserId = () => {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) return null;

    try {
      const user = JSON.parse(savedUser);
      return user?.id;
    } catch {
      return null;
    }
  };

  const handleChangePassword = async () => {
    const userId = getUserId();

    if (!userId) {
      showPopup(
        "warning",
        "User Belum Login",
        "Silakan login terlebih dahulu untuk mengganti password."
      );
      return;
    }

    if (!oldPassword.trim() || !newPassword.trim()) {
      showPopup(
        "warning",
        "Form Belum Lengkap",
        "Password lama dan password baru wajib diisi."
      );
      return;
    }

    if (newPassword.length < 6) {
      showPopup(
        "warning",
        "Password Terlalu Pendek",
        "Password baru minimal 6 karakter."
      );
      return;
    }

    try {
      setLoadingPassword(true);

      const res = await fetch(`/api/profile/password?id=${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      let data: any = {};

      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        showPopup(
          "error",
          "Gagal Mengganti Password",
          data.message || "Terjadi kesalahan saat mengganti password."
        );
        return;
      }

      setOldPassword("");
      setNewPassword("");
      setOpenPassword(false);

      showPopup(
        "success",
        "Password Berhasil Diperbarui",
        "Silakan gunakan password baru saat login berikutnya."
      );
    } catch (error) {
      console.error(error);

      showPopup(
        "error",
        "Server Error",
        "Terjadi kesalahan pada server. Coba lagi beberapa saat."
      );
    } finally {
      setLoadingPassword(false);
    }
  };

  const requestDeleteAccount = () => {
    const userId = getUserId();

    if (!userId) {
      showPopup(
        "warning",
        "User Belum Login",
        "Silakan login terlebih dahulu untuk menghapus akun."
      );
      return;
    }

    if (!deletePassword.trim()) {
      showPopup(
        "warning",
        "Password Wajib Diisi",
        "Masukkan password terlebih dahulu untuk menghapus akun."
      );
      return;
    }

    showPopup(
      "confirm",
      "Hapus Akun Permanen?",
      "Data akun Anda akan dihapus permanen dan tidak bisa dikembalikan.",
      "delete-account"
    );
  };

  const handleDeleteAccount = async () => {
    const userId = getUserId();

    if (!userId) {
      showPopup(
        "warning",
        "User Belum Login",
        "Silakan login terlebih dahulu untuk menghapus akun."
      );
      return;
    }

    try {
      setLoadingDelete(true);

      const res = await fetch(`/api/profile/delete?id=${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: deletePassword,
        }),
      });

      let data: any = {};

      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok) {
        showPopup(
          "error",
          "Gagal Menghapus Akun",
          data.message || "Password salah atau akun gagal dihapus."
        );
        return;
      }

      localStorage.removeItem("user");
      localStorage.removeItem("profileImage");

      setDeletePassword("");
      setOpenDelete(false);

      showPopup(
        "success",
        "Akun Berhasil Dihapus",
        "Akun Anda sudah dihapus. Anda akan diarahkan ke halaman register.",
        "redirect-register"
      );
    } catch (error) {
      console.error(error);

      showPopup(
        "error",
        "Server Error",
        "Terjadi kesalahan pada server. Coba lagi beberapa saat."
      );
    } finally {
      setLoadingDelete(false);
    }
  };

  const popupIconClass =
    popup.type === "success"
      ? "bg-green-500/20 text-green-400"
      : popup.type === "confirm"
      ? "bg-red-500/20 text-red-400"
      : popup.type === "error"
      ? "bg-red-500/20 text-red-400"
      : "bg-yellow-400/20 text-yellow-400";

  const renderPopupIcon = () => {
    if (popup.type === "success") return <CheckCircle2 size={34} />;
    if (popup.type === "confirm") return <HelpCircle size={34} />;
    if (popup.type === "error") return <AlertCircle size={34} />;
    return <AlertTriangle size={34} />;
  };

  return (
    <main className="min-h-screen bg-[#041329] text-white px-6 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Pengaturan Akun
            </h1>

            <p className="text-sm text-gray-400 mt-2">
              Kelola password dan keamanan akun CineMatch Anda.
            </p>
          </div>

          <Link
            href="/profile"
            aria-label="Kembali ke profil"
            className="inline-flex items-center gap-2 rounded-xl bg-[#0d1c32] border border-white/10 px-4 py-3 text-sm text-gray-300 hover:text-yellow-400 hover:border-yellow-400/30 active:scale-95 transition-all duration-200"
          >
            <ArrowLeft size={16} />
            Kembali
          </Link>
        </div>

        <div className="space-y-5">
          <div className="relative overflow-hidden bg-gradient-to-b from-[#0d1c32] to-[#08172a] rounded-3xl border border-white/10 shadow-2xl shadow-black/30">
            <div className="absolute -top-24 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />

            <button
              type="button"
              onClick={() => setOpenPassword(!openPassword)}
              className="relative w-full flex items-center justify-between px-6 py-5 hover:bg-white/5 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-yellow-400/10 text-yellow-400 flex items-center justify-center">
                  <KeyRound size={20} />
                </div>

                <div className="text-left">
                  <p className="font-semibold">
                    Ganti Password
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Perbarui password akun secara berkala.
                  </p>
                </div>
              </div>

              <div className="text-gray-400">
                {openPassword ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </div>
            </button>

            {openPassword && (
              <div className="relative px-6 pb-6 space-y-4 animate-[popup_.18s_ease]">
                <div className="rounded-2xl bg-[#14243a]/70 border border-white/5 p-4">
                  <p className="text-xs text-gray-400">
                    Gunakan password baru minimal 6 karakter agar akun lebih aman.
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Password Lama
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type={showOldPassword ? "text" : "password"}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Masukkan password lama"
                      className="w-full bg-[#14243a] border border-white/5 rounded-2xl pl-11 pr-12 py-3 outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition"
                    />

                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
                    >
                      {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Password Baru
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${
                        newPassword && newPassword.length < 6
                          ? "text-yellow-400"
                          : "text-gray-400"
                      }`}
                    />

                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Masukkan password baru"
                      className={`w-full bg-[#14243a] border rounded-2xl pl-11 pr-12 py-3 outline-none focus:ring-2 transition ${
                        newPassword && newPassword.length < 6
                          ? "border-yellow-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                          : "border-white/5 focus:border-yellow-400 focus:ring-yellow-400/20"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
                    >
                      {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {newPassword && newPassword.length < 6 && (
                    <p className="text-xs text-yellow-400 mt-2">
                      Password minimal 6 karakter.
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleChangePassword}
                  disabled={loadingPassword || !oldPassword || !newPassword}
                  className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-black px-5 py-3 rounded-xl font-bold hover:bg-yellow-300 active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loadingPassword ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound size={17} />
                      <span>Simpan Password</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="relative overflow-hidden bg-gradient-to-b from-[#0d1c32] to-[#08172a] rounded-3xl border border-red-500/20 shadow-2xl shadow-black/30">
            <div className="absolute -top-24 right-0 w-64 h-64 bg-red-500/10 rounded-full blur-3xl" />

            <button
              type="button"
              onClick={() => setOpenDelete(!openDelete)}
              className="relative w-full flex items-center justify-between px-6 py-5 hover:bg-red-500/5 transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center">
                  <Trash2 size={20} />
                </div>

                <div className="text-left">
                  <p className="font-semibold text-red-400">
                    Delete Account
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Hapus akun secara permanen dari CineMatch.
                  </p>
                </div>
              </div>

              <div className="text-gray-400">
                {openDelete ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
              </div>
            </button>

            {openDelete && (
              <div className="relative px-6 pb-6 space-y-4 animate-[popup_.18s_ease]">
                <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-4">
                  <p className="text-sm text-red-300 font-semibold mb-1">
                    Tindakan ini permanen
                  </p>
                  <p className="text-xs text-gray-400">
                    Akun, data profil, dan sesi login akan dihapus. Pastikan Anda benar-benar ingin melanjutkan.
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-400 block mb-2">
                    Password Akun
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400"
                    />

                    <input
                      type={showDeletePassword ? "text" : "password"}
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      placeholder="Masukkan password"
                      className="w-full bg-[#14243a] border border-white/5 rounded-2xl pl-11 pr-12 py-3 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-400/20 transition"
                    />

                    <button
                      type="button"
                      onClick={() => setShowDeletePassword(!showDeletePassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400 transition"
                    >
                      {showDeletePassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={requestDeleteAccount}
                  disabled={loadingDelete || !deletePassword}
                  className="inline-flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-bold transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loadingDelete ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Menghapus...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 size={17} />
                      <span>Hapus Akun</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {popup.open && (
        <div
          className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={closePopup}
        >
          <div
            className="w-full max-w-md bg-[#0d1c32] border border-white/10 rounded-3xl p-7 shadow-2xl animate-[popup_.25s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center ${popupIconClass}`}
            >
              {renderPopupIcon()}
            </div>

            <h2 className="text-xl font-bold text-center mb-2">
              {popup.title}
            </h2>

            <p className="text-gray-400 text-sm text-center leading-relaxed mb-6">
              {popup.message}
            </p>

            {popup.type === "confirm" && popup.action === "delete-account" ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={closePopup}
                  className="py-3 rounded-xl bg-[#14243a] text-gray-300 font-semibold hover:bg-[#1b2d46] active:scale-95 transition-all duration-200"
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPopup({
                      open: false,
                      type: "warning",
                      title: "",
                      message: "",
                    });

                    handleDeleteAccount();
                  }}
                  className="py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 active:scale-95 transition-all duration-200"
                >
                  Ya, Hapus
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={closePopup}
                className="w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 active:scale-95 transition-all duration-200"
              >
                Oke
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}