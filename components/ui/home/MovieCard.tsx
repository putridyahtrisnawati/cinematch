import Image from "next/image";

export default function MovieCard({ movie }: any) {
  return (
    <div className="group cursor-pointer">

      <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3 shadow-xl">

        {/* POSTER */}
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          sizes="(max-width: 768px) 50vw, 20vw"
          className="object-cover group-hover:scale-105 transition duration-300"
          priority={movie.id === 1} // 🔥 penting
        />

        {/* OVERLAY GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition"></div>

        {/* RATING */}
        <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-xs flex items-center gap-1">
          ⭐ <span className="font-bold">{movie.rating}</span>
        </div>

        {/* BUTTON HOVER */}
        <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition">
          <button className="w-full bg-yellow-400 text-black py-2 rounded-lg font-bold">
            Beli Tiket
          </button>
        </div>

      </div>

      <h3 className="font-semibold text-sm">{movie.title}</h3>
      <p className="text-xs text-gray-400">{movie.genre}</p>

    </div>
  );
}