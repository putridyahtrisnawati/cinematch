"use client";

import { useRef, useEffect, useState } from "react";
import ComingCard from "./ComingCard";

export default function ComingSoon() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const res = await fetch("/api/movies");

        if (!res.ok) {
          throw new Error("Gagal mengambil data movie");
        }

        const data = await res.json();

        const filtered = Array.isArray(data)
          ? data.filter((movie: any) => movie.status === "coming_soon")
          : [];

        setMovies(filtered);
      } catch (err) {
        console.error("Fetch coming soon error:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "right" ? 360 : -360,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-16 px-8 max-w-7xl mx-auto">
      <div className="bg-[#0d1c32] rounded-2xl p-6 relative border border-white/5 shadow-xl">
        <div className="mb-6">
          <h2 className="text-xl font-bold">
            Akan Tayang
          </h2>

          <p className="text-gray-400 text-sm">
            Jangan lewatkan penayangan perdana film favoritmu
          </p>
        </div>

        {!loading && movies.length > 0 && (
          <>
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Geser film ke kiri"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#041329]/90 border border-yellow-400/20 text-yellow-400 flex items-center justify-center shadow-xl shadow-black/30 backdrop-blur-md hover:bg-yellow-400 hover:text-black hover:border-yellow-400 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[28px]">
                chevron_left
              </span>
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Geser film ke kanan"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#041329]/90 border border-yellow-400/20 text-yellow-400 flex items-center justify-center shadow-xl shadow-black/30 backdrop-blur-md hover:bg-yellow-400 hover:text-black hover:border-yellow-400 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span className="material-symbols-outlined text-[28px]">
                chevron_right
              </span>
            </button>
          </>
        )}

        {loading ? (
          <div className="flex gap-4 overflow-hidden px-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex gap-4 min-w-[380px] bg-[#0d1c32] rounded-xl p-4"
              >
                <div className="w-24 h-32 rounded-lg bg-white/10 animate-pulse" />

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="h-3 w-24 bg-white/10 rounded animate-pulse mb-3" />
                    <div className="h-4 w-40 bg-white/10 rounded animate-pulse mb-3" />
                    <div className="h-3 w-full bg-white/5 rounded animate-pulse mb-2" />
                    <div className="h-3 w-2/3 bg-white/5 rounded animate-pulse" />
                  </div>

                  <div className="h-3 w-28 bg-white/10 rounded animate-pulse mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : movies.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-400 text-sm">
            Belum ada film yang akan tayang.
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-[#0d1c32] via-[#0d1c32]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-[#0d1c32] via-[#0d1c32]/80 to-transparent z-10 pointer-events-none" />

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-6"
            >
              {movies.map((movie: any) => (
                <ComingCard
                  key={movie._id}
                  title={movie.title}
                  date={movie.date || movie.releaseDate || "Segera tayang"}
                  desc={
                    movie.desc ||
                    movie.description ||
                    "Informasi film akan segera tersedia."
                  }
                  image={movie.image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}