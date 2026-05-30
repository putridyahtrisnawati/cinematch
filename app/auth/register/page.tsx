import Link from "next/link";
import LeftBanner from "@/components/ui/auth/LeftBanner";
import RegisterForm from "@/components/ui/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="relative flex min-h-screen bg-[#041329] text-white overflow-hidden">

      <Link
        href="/"
        aria-label="Kembali ke beranda"
        className="absolute top-6 left-6 z-50 group w-12 h-12 flex items-center justify-center rounded-full bg-[#0d1c32]/80 border border-yellow-400/20 text-yellow-400 backdrop-blur-md shadow-lg shadow-black/30 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 hover:scale-105 active:scale-95 transition-all duration-200"
      >
        <span className="material-symbols-outlined text-[24px] transition-transform duration-200 group-hover:-translate-x-0.5">
          keyboard_backspace
        </span>
      </Link>

      <LeftBanner />

      <section className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 lg:px-16">
        <RegisterForm />
      </section>
    </main>
  );
}