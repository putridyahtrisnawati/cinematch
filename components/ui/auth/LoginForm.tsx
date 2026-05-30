"use client";

import { useMemo, useState } from "react";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PasswordInput from "./PasswordInput";

export default function LoginForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState({
    open: false,
    title: "",
    message: "",
    success: false,
  });

  const isFormFilled = useMemo(() => {
    return form.email.trim() !== "" && form.password.trim() !== "";
  }, [form.email, form.password]);

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
      router.replace("/");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    if (!form.email.trim() || !form.password.trim()) {
      showPopup(
        "Form Belum Lengkap",
        "Email/username dan password wajib diisi."
      );
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
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
          "Login Gagal",
          data.message || "Email/username atau password salah."
        );
        return;
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      showPopup(
        "Login Berhasil",
        "Selamat datang kembali di CineMatch.",
        true
      );
    } catch (error) {
      console.error("Login error:", error);

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
      <div className="mb-8 text-center lg:text-left">
        <h1 className="text-3xl font-bold mb-2">
          Selamat Datang Kembali
        </h1>

        <p className="text-gray-400">
          Masuk untuk melanjutkan pemesanan tiket film favoritmu
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 ml-1">
            Email / Username
          </label>

          <div className="relative mt-1">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="username"
              placeholder="Masukkan email atau username"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d1c32] text-sm outline-none border border-white/5 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition"
            />
          </div>
        </div>

        <PasswordInput
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loading || !isFormFilled}
          className="w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              <span>Memproses...</span>
            </div>
          ) : (
            "Masuk"
          )}
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="flex-1 h-[1px] bg-gray-700"></div>
        <span className="text-xs text-gray-400 uppercase">
          atau
        </span>
        <div className="flex-1 h-[1px] bg-gray-700"></div>
      </div>

      <button
        type="button"
        disabled
        className="w-full py-3 bg-[#0d1c32] rounded-xl flex items-center justify-center gap-3 opacity-60 cursor-not-allowed"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.32-2.11 4.52-1.12 1.12-2.8 2.32-5.73 2.32-4.94 0-8.9-4.04-8.9-8.9s3.96-8.9 8.9-8.9c2.62 0 4.64 1.04 6.06 2.42l2.32-2.32C18.66 1.14 15.9.12 12.48.12 6.54.12 1.7 4.96 1.7 10.9s4.84 10.78 10.78 10.78c3.2 0 5.64-1.06 7.56-3.06 1.98-1.98 2.6-4.76 2.6-7.1 0-.68-.06-1.34-.18-2H12.48z"
            fill="#EA4335"
          />
        </svg>

        Masuk dengan Google
      </button>

      <p className="mt-6 text-center text-gray-400">
        Belum punya akun?{" "}
        <Link
          href="/auth/register"
          className="text-yellow-400 font-bold hover:underline"
        >
          Daftar Sekarang
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