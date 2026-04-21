'use client'

import { useRef, useState } from "react";
import MovieCard from "./MovieCard";

export default function NowPlaying({ movies }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 300;

    scrollRef.current.scrollBy({
      left: direction === "right" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-10 px-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Sedang Tayang</h2>
          <p className="text-gray-400 text-sm">
            Film terpopuler di bioskop hari ini
          </p>
        </div>

        <button
          onClick={() => setShowAll(!showAll)}
          className="text-yellow-400 text-sm font-semibold hover:underline"
        >
          {showAll ? "Tutup" : "Lihat Semua >"}
        </button>
      </div>

      {/* GRID MODE */}
      {showAll ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {movies.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="relative">

          {/* FADE */}
          <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#041329] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full bg-gradient-to-l from-[#041329] to-transparent z-10 pointer-events-none" />

          {/* BUTTON LEFT */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 p-2 rounded-full"
          >
            ◀
          </button>

          {/* SLIDER */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-10 snap-x snap-mandatory"
          >
            {movies.map((movie: any) => (
              <div
                key={movie.id}
                className="min-w-[180px] md:min-w-[220px] snap-start"
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          {/* BUTTON RIGHT */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 p-2 rounded-full"
          >
            ▶
          </button>

        </div>
      )}

    </section>
  );
}