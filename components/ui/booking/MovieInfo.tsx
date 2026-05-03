import Image from "next/image";

export default function MovieInfo({ movie }: any) {
  if (!movie) return null;

  return (
    <div className="bg-[#0d1c32] p-5 rounded-2xl">

      <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-4">
        <Image
          src={movie.image}
          alt={movie.title}
          fill
          className="object-cover"
        />
      </div>

      {/* 🔥 FIX DI SINI */}
      <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded">
        {movie.status === "now_playing" ? "SEDANG TAYANG" : "AKAN TAYANG"}
      </span>

      <h2 className="text-xl font-bold mt-2">{movie.title}</h2>

      <p className="text-gray-400 text-sm mt-1">
        ⭐ {movie.rating} • {movie.genre}
      </p>

      <div className="mt-4">
        <h3 className="text-sm font-semibold mb-2">Sinopsis Singkat</h3>

        <p className="text-gray-400 text-xs">
          {movie.description}
        </p>
      </div>

    </div>
  );
}