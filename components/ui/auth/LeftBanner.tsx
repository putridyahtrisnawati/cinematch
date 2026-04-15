import Image from "next/image";

export default function LeftBanner() {
  return (
    <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-end p-10">
      <div className="absolute inset-0">
        <Image
          src="/cinema-register.jpg"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-cover"
          alt="cinema"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#041329]/40 to-[#041329]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#041329] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-md">
        <h1 className="text-yellow-400 text-5xl font-extrabold mb-6">
          CineMatch
        </h1>

        <h2 className="text-4xl font-bold leading-tight mb-4">
          Rasakan Pengalaman{" "}
          <span className="text-yellow-400 italic">Sinematik</span> Terbaik.
        </h2>

        <p className="text-gray-300 text-sm">
          Temukan film favoritmu dan nikmati momen tak terlupakan di CineMatch. Daftar sekarang dan dapatkan promo spesial untuk pengalaman menonton yang lebih seru!
        </p>

        <div className="mt-6 bg-[#1c2a41]/70 p-3 rounded-lg border-l-4 border-yellow-400">
          <p className="font-semibold text-xs">
            Promo khusus pengguna baru!
          </p>
          <p className="text-xs text-gray-300">
            Diskon 50% tiket pertama kamu
          </p>
        </div>
      </div>
    </section>
  );
}