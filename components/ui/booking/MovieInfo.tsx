import Image from "next/image";

export default function MovieInfo({ movie }: any) {
  if (!movie) return null;

  const poster = movie.image || "/placeholder-movie.jpg";
  const statusLabel =
    movie.status === "now_playing" ? "SEDANG TAYANG" : "AKAN TAYANG";

  return (
    <div className="bg-[#0d1c32] p-5 rounded-2xl border border-white/5 shadow-xl">
      <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-4 bg-[#14243a]">
        <Image
          src={poster}
          alt={movie.title || "Poster film"}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority
        />
      </div>

      <span className="inline-block bg-yellow-400 text-black text-xs px-2 py-1 rounded font-semibold">
        {statusLabel}
      </span>

      <h2 className="text-xl font-bold mt-3 line-clamp-2">
        {movie.title || "Nama Film"}
      </h2>

      <p className="text-gray-400 text-sm mt-1 line-clamp-1">
        ⭐ {movie.rating || "-"} • {movie.genre || "Genre"}
      </p>

      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-2">
          Sinopsis Singkat
        </h3>

        <p className="text-gray-400 text-xs leading-relaxed line-clamp-5">
          {movie.description || "Sinopsis belum tersedia."}
        </p>
      </div>
    </div>
  );
}