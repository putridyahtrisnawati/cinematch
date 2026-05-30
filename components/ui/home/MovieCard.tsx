import Image from "next/image";
import Link from "next/link";

export default function MovieCard({ movie }: any) {
  const poster = movie?.image || "/placeholder-movie.jpg";

  return (
    <Link
      href={`/movies/${movie._id}`}
      className="group block cursor-pointer"
    >
      <div className="transition-all duration-300 group-hover:-translate-y-1">
        <div className="relative aspect-[2/3] rounded-2xl overflow-hidden mb-3 bg-[#0d1c32] shadow-xl shadow-black/30 border border-white/5">
          <Image
            src={poster}
            alt={movie.title || "Movie poster"}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-70" />

          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-300" />

          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-white/10">
            <span>⭐</span>
            <span className="font-bold">
              {movie.rating || "-"}
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              type="button"
              className="w-full bg-yellow-400 text-black py-2.5 rounded-xl font-bold hover:bg-yellow-300 active:scale-95 transition"
            >
              Beli Tiket
            </button>
          </div>
        </div>

        <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-yellow-400 transition">
          {movie.title}
        </h3>

        <p className="text-xs text-gray-400 line-clamp-1 mt-1">
          {movie.genre}
        </p>
      </div>
    </Link>
  );
}