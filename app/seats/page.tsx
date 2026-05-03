'use client'

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import SeatGrid from "@/components/ui/seat/SeatGrid";
import SeatLegend from "@/components/ui/seat/SeatLegend";
import BookingSummary from "@/components/ui/seat/BookingSummary";

export default function SeatPage() {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // 🔥 ambil data dari URL
  const params = useSearchParams();
  const movieId = params.get("movieId");
  const title = params.get("title");
  const date = params.get("date");
  const time = params.get("time");
  const cinema = params.get("cinema");
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";

    const date = new Date(dateStr);

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#041329] text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* 🔙 BACK BUTTON */}
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0d1c32] hover:bg-yellow-400 hover:text-black transition"
          >
            ←
          </button>

          {/* TEXT */}
          <div>
            <p className="text-xs text-gray-400 tracking-wide">
              SEKARANG MEMILIH
            </p>
            <h2 className="text-xl font-semibold">
              {title || "Nama Film"}
            </h2>
          </div>

        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400 tracking-widest uppercase">
            TEMPAT & WAKTU
          </p>
          <p className="text-sm text-yellow-400 font-medium">
            {cinema || "-"} • {formatDate(date)} • {time || "-"}
          </p>
        </div>

      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT (SEAT AREA) */}
        <div className="lg:col-span-2 flex flex-col items-center">

          <SeatGrid
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
          />

          <SeatLegend />

        </div>

        {/* RIGHT (SUMMARY) */}
        <BookingSummary
          selectedSeats={selectedSeats}
          movieId={movieId}
          title={title}
          date={date}
          time={time}
          cinema={cinema}
        />

      </div>

    </main>
  );
}