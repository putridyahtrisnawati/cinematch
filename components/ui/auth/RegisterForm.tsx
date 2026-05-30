"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import PasswordInput from "./PasswordInput";

export default function RegisterForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
    success: false,
  });

  const isEmailValid = useMemo(() => {
    if (!form.email.trim()) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  }, [form.email]);

  const isPasswordValid = useMemo(() => {
    return form.password.length >= 6;
  }, [form.password]);

  const isConfirmValid = useMemo(() => {
    if (!form.confirmPassword) return false;
    return form.password === form.confirmPassword;
  }, [form.password, form.confirmPassword]);

  const isFormReady = useMemo(() => {
    return (
      form.username.trim() !== "" &&
      isEmailValid &&
      isPasswordValid &&
      isConfirmValid &&
      agree
    );
  }, [form.username, isEmailValid, isPasswordValid, isConfirmValid, agree]);

  const passwordStrength =
    form.password.length === 0
      ? ""
      : form.password.length < 6
      ? "Lemah"
      : form.password.length < 8
      ? "Sedang"
      : "Kuat";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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
      router.replace("/auth/login");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    if (!form.username.trim()) {
      showPopup("Form Belum Lengkap", "Username wajib diisi.");
      return;
    }

    if (!form.email.trim()) {
      showPopup("Form Belum Lengkap", "Email wajib diisi.");
      return;
    }

    if (!isEmailValid) {
      showPopup("Email Tidak Valid", "Masukkan format email yang benar.");
      return;
    }

    if (!form.password) {
      showPopup("Form Belum Lengkap", "Password wajib diisi.");
      return;
    }

    if (!isPasswordValid) {
      showPopup("Password Terlalu Pendek", "Password minimal 6 karakter.");
      return;
    }

    if (!form.confirmPassword) {
      showPopup("Form Belum Lengkap", "Konfirmasi password wajib diisi.");
      return;
    }

    if (!isConfirmValid) {
      showPopup(
        "Password Tidak Cocok",
        "Konfirmasi password harus sama dengan password."
      );
      return;
    }

    if (!agree) {
      showPopup(
        "Syarat & Ketentuan",
        "Silakan setujui syarat & ketentuan terlebih dahulu."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username.trim(),
          email: form.email.trim(),
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      let data: any = {};

      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok || !data.success) {
        showPopup(
          "Register Gagal",
          data.message || "Terjadi kesalahan saat membuat akun."
        );
        return;
      }

      showPopup(
        "Register Berhasil",
        "Akun berhasil dibuat. Silakan login untuk melanjutkan.",
        true
      );

      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setAgree(false);
    } catch (error) {
      console.error("Register error:", error);
      showPopup(
        "Server Error",
        "Terjadi kesalahan pada server. Coba lagi beberapa saat."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="lg:hidden text-center mb-8">
        <h1 className="text-yellow-400 text-2xl font-bold">
          CineMatch
        </h1>
      </div>

      <div className="mb-8 text-center lg:text-left">
        <h1 className="text-3xl font-bold mb-2">
          Buat Akun Baru
        </h1>

        <p className="text-gray-400">
          Daftar untuk mulai memesan tiket film
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 ml-1">
            Username
          </label>

          <div className="relative mt-1">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Masukkan username"
              autoComplete="username"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d1c32] text-sm outline-none border border-white/5 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400 ml-1">
            Email
          </label>

          <div className="relative mt-1">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              autoComplete="email"
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d1c32] text-sm outline-none border transition ${
                form.email && !isEmailValid
                  ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-400/20"
                  : "border-white/5 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
              }`}
            />
          </div>

          {form.email && !isEmailValid && (
            <p className="text-xs text-red-400 mt-2">
              Format email belum benar.
            </p>
          )}
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <PasswordInput
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              autoComplete="new-password"
            />

            <PasswordInput
              label="Konfirmasi"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

          {form.password && (
            <div className="mt-3">
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    form.password.length < 6
                      ? "w-1/3 bg-red-500"
                      : form.password.length < 8
                      ? "w-2/3 bg-yellow-400"
                      : "w-full bg-green-500"
                  }`}
                />
              </div>

              <p className="text-xs text-gray-400 mt-1">
                Kekuatan password:{" "}
                <span
                  className={
                    passwordStrength === "Lemah"
                      ? "text-red-400"
                      : passwordStrength === "Sedang"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                >
                  {passwordStrength}
                </span>
              </p>
            </div>
          )}

          {form.confirmPassword && !isConfirmValid && (
            <p className="text-xs text-red-400 mt-2">
              Konfirmasi password belum sama.
            </p>
          )}
        </div>

        <div
          onClick={() => setAgree(!agree)}
          className={`flex items-start gap-3 rounded-xl px-3 py-3 border cursor-pointer transition-all duration-200 ${
            agree
              ? "border-yellow-400/50 bg-yellow-400/10"
              : "border-white/10 bg-[#0d1c32]/60 hover:border-yellow-400/30"
          }`}
        >
          <button
            type="button"
            className={`w-5 h-5 mt-0.5 rounded-md border flex items-center justify-center text-xs font-bold transition ${
              agree
                ? "bg-yellow-400 border-yellow-400 text-black"
                : "border-gray-500 text-transparent"
            }`}
          >
            ✓
          </button>

          <p className="text-xs text-gray-400 leading-relaxed">
            Saya menyetujui{" "}
            <span className="text-yellow-400 cursor-pointer font-semibold">
              syarat & ketentuan
            </span>{" "}
            yang berlaku di CineMatch.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || !isFormReady}
          className="w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>Membuat Akun...</span>
            </div>
          ) : (
            "Daftar →"
          )}
        </button>
      </form>

      <p className="text-center text-gray-400 mt-6">
        Sudah punya akun?{" "}
        <Link
          href="/auth/login"
          className="text-yellow-400 font-bold hover:underline"
        >
          Masuk
        </Link>
      </p>

      {popup.open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d1c32] w-full max-w-md rounded-3xl p-7 border border-white/10 shadow-2xl animate-[popup_.25s_ease]">
            <div className="flex justify-center mb-5">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl font-bold ${
                  popup.success
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {popup.success ? "✓" : "!"}
              </div>
            </div>

            <h3 className="text-center text-xl font-bold mb-2">
              {popup.title}
            </h3>

            <p className="text-center text-gray-400 mb-6">
              {popup.message}
            </p>

            <button
              type="button"
              onClick={closePopup}
              className="w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition"
            >
              Oke
            </button>
          </div>
        </div>
      )}
    </div>
  );
}