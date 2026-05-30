"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  UserRound,
  Mail,
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  BadgeCheck,
} from "lucide-react";

export default function ProfileForm() {
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [initialUsername, setInitialUsername] = useState("");
  const [initialEmail, setInitialEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
    success: false,
  });

  const isChanged = useMemo(() => {
    return (
      username.trim() !== initialUsername.trim() ||
      email.trim() !== initialEmail.trim()
    );
  }, [username, email, initialUsername, initialEmail]);

  const isEmailValid = useMemo(() => {
    if (!email.trim()) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }, [email]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const savedUser = localStorage.getItem("user");

        if (!savedUser) {
          setFetching(false);
          return;
        }

        const user = JSON.parse(savedUser);
        const id = user?.id;

        setUsername(user?.username || "");
        setEmail(user?.email || "");
        setInitialUsername(user?.username || "");
        setInitialEmail(user?.email || "");

        if (!id) {
          setFetching(false);
          return;
        }

        setUserId(id);

        const res = await fetch(`/api/profile?id=${id}`);
        const data = await res.json();

        const fetchedUsername = data.user?.username || user?.username || "";
        const fetchedEmail = data.user?.email || user?.email || "";

        setUsername(fetchedUsername);
        setEmail(fetchedEmail);
        setInitialUsername(fetchedUsername);
        setInitialEmail(fetchedEmail);
      } catch (error) {
        console.error("Fetch profile error:", error);
      } finally {
        setFetching(false);
      }
    };

    getUser();
  }, []);

  const showPopup = (
    title: string,
    message: string,
    success: boolean = false
  ) => {
    setPopup({
      open: true,
      title,
      message,
      success,
    });
  };

  const closePopup = () => {
    const isSuccess = popup.success;

    setPopup({
      open: false,
      title: "",
      message: "",
      success: false,
    });

    if (isSuccess) {
      router.replace("/profile");
    }
  };

  const handleSave = async () => {
    if (loading) return;

    if (!userId) {
      showPopup(
        "User Belum Login",
        "Silakan login terlebih dahulu untuk mengubah profil."
      );
      return;
    }

    if (!username.trim() || !email.trim()) {
      showPopup(
        "Form Belum Lengkap",
        "Nama lengkap dan alamat email wajib diisi."
      );
      return;
    }

    if (!isEmailValid) {
      showPopup(
        "Email Tidak Valid",
        "Masukkan alamat email dengan format yang benar."
      );
      return;
    }

    if (!isChanged) {
      showPopup(
        "Tidak Ada Perubahan",
        "Data profil belum berubah, jadi tidak ada yang perlu disimpan."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`/api/profile?id=${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        showPopup(
          "Gagal Memperbarui Profil",
          data.message || "Terjadi kesalahan saat memperbarui profil."
        );
        return;
      }

      const updatedUser = {
        id: data.user._id || data.user.id,
        username: data.user.username,
        email: data.user.email,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setInitialUsername(updatedUser.username);
      setInitialEmail(updatedUser.email);

      showPopup(
        "Profil Berhasil Diperbarui",
        "Informasi profil Anda sudah tersimpan.",
        true
      );
    } catch (error) {
      console.error("Update profile error:", error);
      showPopup("Server Error", "Terjadi kesalahan pada server.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <section>
        <div className="mb-8">
          <div className="h-8 w-40 bg-white/10 rounded-lg animate-pulse" />
          <div className="h-4 w-64 bg-white/5 rounded-lg animate-pulse mt-3" />
        </div>

        <div className="relative overflow-hidden bg-gradient-to-b from-[#0d1c32] to-[#08172a] rounded-3xl p-7 border border-white/10 shadow-2xl shadow-black/30">
          <div className="absolute -top-24 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="h-24 bg-white/5 rounded-2xl animate-pulse" />
            <div className="h-24 bg-white/5 rounded-2xl animate-pulse" />
          </div>

          <div className="relative flex justify-end gap-3 mt-8">
            <div className="h-12 w-24 bg-white/5 rounded-xl animate-pulse" />
            <div className="h-12 w-40 bg-white/10 rounded-xl animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Edit Profil
          </h1>

          <p className="text-sm text-gray-400 mt-2">
            Perbarui nama dan email akun CineMatch Anda.
          </p>
        </div>

        <Link
          href="/profile"
          className="inline-flex items-center gap-2 rounded-xl bg-[#0d1c32] border border-white/10 px-4 py-3 text-sm text-gray-300 hover:text-yellow-400 hover:border-yellow-400/30 active:scale-95 transition-all duration-200"
        >
          <ArrowLeft size={16} />
          Kembali
        </Link>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-b from-[#0d1c32] to-[#08172a] rounded-3xl p-7 border border-white/10 shadow-2xl shadow-black/30">
        <div className="absolute -top-24 right-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative mb-6">
          <h2 className="text-lg font-semibold">
            Informasi Akun
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Pastikan data yang dimasukkan sudah benar sebelum disimpan.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-xs text-gray-400 mb-2 block">
              Nama Lengkap
            </label>

            <div className="relative group">
              <UserRound
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-yellow-400 transition"
              />

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full bg-[#14243a] border border-white/5 rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-2 block">
              Alamat Email
            </label>

            <div className="relative group">
              <Mail
                size={18}
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition ${
                  email && !isEmailValid
                    ? "text-red-400"
                    : "text-gray-400 group-focus-within:text-yellow-400"
                }`}
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan alamat email"
                className={`w-full bg-[#14243a] border rounded-2xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 transition ${
                  email && !isEmailValid
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                    : "border-white/5 focus:border-yellow-400 focus:ring-yellow-400/20"
                }`}
              />
            </div>

            {email && !isEmailValid && (
              <p className="text-xs text-red-400 mt-2">
                Format email belum benar.
              </p>
            )}
          </div>
        </div>

        <div className="relative mt-6 rounded-2xl bg-[#14243a]/70 border border-white/5 px-4 py-3">
          <p className="text-xs text-gray-400">
            Status perubahan:{" "}
            <span className={isChanged ? "text-yellow-400" : "text-gray-500"}>
              {isChanged
                ? "Ada perubahan yang belum disimpan."
                : "Belum ada perubahan."}
            </span>
          </p>
        </div>

        <div className="relative flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">
          <Link
            href="/profile"
            className="px-5 py-3 rounded-xl bg-[#14243a] text-sm text-gray-300 hover:bg-[#1b2d46] active:scale-95 transition-all duration-200 text-center"
          >
            Batal
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={loading || !isChanged}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-yellow-400 text-black text-sm font-bold hover:bg-yellow-300 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {popup.open && (
        <div
          className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closePopup}
        >
          <div
            className="bg-[#0d1c32] w-full max-w-md rounded-3xl p-7 border border-white/10 shadow-2xl animate-[popup_.25s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-5">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  popup.success
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {popup.success ? (
                  <CheckCircle2 size={34} />
                ) : (
                  <AlertCircle size={34} />
                )}
              </div>
            </div>

            <h3 className="text-center text-xl font-bold mb-2">
              {popup.title}
            </h3>

            <p className="text-center text-gray-400 mb-6 leading-relaxed">
              {popup.message}
            </p>

            <button
              type="button"
              onClick={closePopup}
              className="w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 active:scale-95 transition-all duration-200"
            >
              Oke
            </button>
          </div>
        </div>
      )}
    </section>
  );
}