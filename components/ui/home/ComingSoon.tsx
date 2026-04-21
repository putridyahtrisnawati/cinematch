'use client'

import { useRef } from "react";
import ComingCard from "./ComingCard";

export default function ComingSoon({ movies }: any) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === "right" ? 300 : -300,
      behavior: "smooth",
    });
  };

  return (
    <section className="mt-16 px-8 max-w-7xl mx-auto">

      <div className="bg-[#0d1c32] rounded-2xl p-6 relative">

        {/* TITLE */}
        <div className="mb-6">
          <h2 className="text-xl font-bold">Akan Tayang</h2>
          <p className="text-gray-400 text-sm">
            Jangan lewatkan penayangan perdana film favoritmu
          </p>
        </div>

        {/* BUTTON LEFT */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 p-2 rounded-full"
        >
          ◀
        </button>

        {/* BUTTON RIGHT */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/60 p-2 rounded-full"
        >
          ▶
        </button>

        {/* SLIDER */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-6"
        >
          {movies?.map((movie: any) => (
            <ComingCard key={movie.id} {...movie} />
          ))}
        </div>

      </div>

    </section>
  );
}

