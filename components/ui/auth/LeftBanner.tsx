import Image from "next/image";

export default function LeftBanner() {
  return (
    <section className="hidden lg:flex lg:w-1/2 h-[100dvh] relative overflow-hidden items-center p-12 bg-[#041329]">
      <Image
        src="/cinema-register.jpg"
        fill
        sizes="50vw"
        priority
        className="object-cover object-center scale-105"
        alt="cinema"
      />

      <div className="absolute inset-0 bg-[#041329]/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#041329]/20 via-[#041329]/45 to-[#041329]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#041329]/95 via-[#041329]/20 to-transparent" />

      <div className="relative z-10 max-w-md">
        <h1 className="text-yellow-400 text-5xl font-extrabold mb-6">
          CineMatch
        </h1>

        <h2 className="text-4xl font-bold leading-tight mb-4">
          Rasakan Pengalaman{" "}
          <span className="text-yellow-400 italic">Sinematik</span>{" "}
          Terbaik.
        </h2>

        <p className="text-gray-300 text-sm leading-relaxed">
          Temukan film favoritmu dan nikmati momen tak terlupakan di CineMatch.
          Daftar sekarang dan dapatkan promo spesial untuk pengalaman menonton
          yang lebih seru!
        </p>

        <div className="mt-8 bg-[#1c2a41]/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 border-l-4 border-l-yellow-400 shadow-xl">
          <p className="font-semibold text-sm">
            Promo khusus pengguna baru!
          </p>

          <p className="text-xs text-gray-300 mt-1">
            Diskon 50% tiket pertama kamu
          </p>
        </div>
      </div>
    </section>
  );
}