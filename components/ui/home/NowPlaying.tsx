"use client";

import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";

export default function NowPlaying({ search }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [movies, setMovies] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/movies");
        const data = await res.json();

        const filtered = data
          .filter((movie: any) => movie.status === "now_playing")
          .filter((movie: any) =>
            (movie.title || "")
              .toLowerCase()
              .includes((search || "").toLowerCase())
          );

        setMovies(filtered);
      } catch (err) {
        console.error("Fetch movies error:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [search]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-10 px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Sedang Tayang
          </h2>

          <p className="text-gray-400 text-sm mt-1">
            Film terpopuler di bioskop hari ini
          </p>
        </div>

        {!loading && movies.length > 0 && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            aria-label={showAll ? "Tutup semua film" : "Lihat semua film"}
            className="group inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-400 shadow-lg shadow-black/10 backdrop-blur-md hover:bg-yellow-400 hover:text-black hover:border-yellow-400 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>
              {showAll ? "Tutup" : "Lihat Semua"}
            </span>

            <span className="w-6 h-6 rounded-full bg-yellow-400/10 group-hover:bg-black/10 flex items-center justify-center transition-all duration-200">
              <span
                className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${showAll
                    ? "group-hover:-translate-y-0.5"
                    : "group-hover:translate-x-0.5"
                  }`}
              >
                {showAll ? "keyboard_arrow_up" : "arrow_forward"}
              </span>
            </span>
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex gap-6 overflow-hidden">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="min-w-[180px] md:min-w-[220px]"
            >
              <div className="aspect-[2/3] rounded-2xl bg-white/5 animate-pulse mb-3" />
              <div className="h-4 bg-white/10 rounded-md animate-pulse mb-2" />
              <div className="h-3 w-2/3 bg-white/5 rounded-md animate-pulse" />
            </div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className="bg-[#0d1c32] border border-white/5 rounded-2xl p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-3xl">
              movie_off
            </span>
          </div>

          <h3 className="text-xl font-bold mb-2">
            Film tidak ditemukan
          </h3>

          <p className="text-gray-400 text-sm">
            Coba gunakan kata kunci lain untuk mencari film yang sedang tayang.
          </p>
        </div>
      ) : showAll ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie: any) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#041329] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#041329] to-transparent z-10 pointer-events-none" />

          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Geser film ke kiri"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0d1c32]/90 border border-yellow-400/20 text-yellow-400 flex items-center justify-center shadow-xl shadow-black/30 backdrop-blur-md hover:bg-yellow-400 hover:text-black hover:border-yellow-400 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[30px]">
              chevron_left
            </span>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-12 snap-x snap-mandatory"
          >
            {movies.map((movie: any) => (
              <div
                key={movie._id}
                className="min-w-[180px] md:min-w-[220px] snap-start"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Geser film ke kanan"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#0d1c32]/90 border border-yellow-400/20 text-yellow-400 flex items-center justify-center shadow-xl shadow-black/30 backdrop-blur-md hover:bg-yellow-400 hover:text-black hover:border-yellow-400 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[30px]">
              chevron_right
            </span>
          </button>
        </div>
      )}
    </section>
  );
}