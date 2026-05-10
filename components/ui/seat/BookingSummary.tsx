'use client'

import { useEffect, useState } from "react";

type Movie = {
  title?: string;
  image?: string;
  genre?: string;
  rating?: number;
};

type Props = {
  selectedSeats: string[];
  movieId?: string | null;
  movie?: Movie | null;
  title?: string | null;
  date?: string | null;
  time?: string | null;
  cinema?: string | null;
  onCheckout?: () => void;
};

type Summary = {
  ticketPrice: number;
  serviceFee: number;
  ticketCount: number;
  total: number;
};

export default function BookingSummary({
  selectedSeats,
  movieId,
  movie,
  title,
  date,
  time,
  cinema,
  onCheckout
}: Props) {

  const [summary, setSummary] = useState<Summary | null>(null);

  // 🔥 FETCH SUMMARY DARI API
  useEffect(() => {
    if (!movieId || !date || selectedSeats.length === 0) return;

    fetch("/api/bookings/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        movieId,
        date,
        seats: selectedSeats
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("SUMMARY:", data);
        setSummary(data);
      })
      .catch(err => {
        console.error(err);
        setSummary(null);
      });

  }, [selectedSeats, movieId, date]);

  return (
    <div className="bg-[#0b1a2d] p-6 rounded-2xl shadow-lg w-full max-w-sm">

      {/* POSTER */}
      {movie?.image ? (
        <img
          src={movie.image}
          alt={movie.title}
          className="h-44 w-full object-cover rounded-xl mb-4"
        />
      ) : (
        <div className="h-44 bg-[#1c2a41] rounded-xl mb-4 flex items-center justify-center text-gray-500 text-sm">
          POSTER N/A
        </div>
      )}

      {/* TITLE */}
      <h3 className="text-lg font-semibold mb-1">
        {title || movie?.title || "Nama Film"}
      </h3>

      <p className="text-sm text-gray-400 mb-3">
        {movie?.genre || "Genre"} • ⭐ {movie?.rating || "-"}
      </p>

      <div className="border-t border-gray-700 my-3" />

      {/* SEATS */}
      <div className="mb-3">
        <p className="text-sm text-gray-400 mb-2">Kursi Terpilih</p>

        <div className="flex gap-2 flex-wrap">
          {selectedSeats.length > 0 ? (
            selectedSeats.map((seat) => (
              <span
                key={seat}
                className="bg-[#1c2a41] px-3 py-1 rounded-full text-sm"
              >
                {seat}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">-</span>
          )}
        </div>

        <p className="text-sm font-medium text-gray-300 mt-2">
          Jumlah Tiket: {selectedSeats.length} tiket
        </p>
      </div>

      {/* 🔥 TOTAL DARI API */}
      <div className="bg-[#14253d] p-4 rounded-xl mb-4">
        <p className="text-xs text-gray-400">TOTAL PEMBAYARAN</p>

        <p className="text-xl font-bold text-yellow-400">
          Rp {((summary?.ticketPrice || 0) * (summary?.ticketCount || 0)).toLocaleString("id-ID")}
        </p>
      </div>

      {/* BUTTON */}
      <button
        onClick={onCheckout}
        disabled={selectedSeats.length === 0}
        className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold disabled:opacity-50 hover:opacity-90 transition"
      >
        Lanjut Pembayaran →
      </button>

      <p className="text-[10px] text-gray-500 text-center mt-3">
        Dengan menekan tombol di atas, Anda menyetujui
        <br />
        Syarat & Ketentuan CineMatch.
      </p>

    </div>
  );
}