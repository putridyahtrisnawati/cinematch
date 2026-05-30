"use client";

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
  subtotal?: number;
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
  onCheckout,
}: Props) {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  useEffect(() => {
    if (!movieId || !date || selectedSeats.length === 0) {
      setSummary(null);
      return;
    }

    const fetchSummary = async () => {
      try {
        setLoadingSummary(true);

        const res = await fetch("/api/bookings/summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId,
            date,
            seats: selectedSeats,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Gagal mengambil summary");
        }

        setSummary(data);
      } catch (err) {
        console.error("Fetch summary error:", err);
        setSummary(null);
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchSummary();
  }, [selectedSeats, movieId, date]);

  const ticketCount = summary?.ticketCount || selectedSeats.length;
  const ticketPrice = summary?.ticketPrice || 0;
  const subtotal = summary?.subtotal ?? ticketPrice * ticketCount;
  const totalPayment = summary?.total ?? subtotal;

  return (
    <div className="bg-[#0b1a2d] p-6 rounded-2xl shadow-lg w-full max-w-sm border border-white/5">
      {movie?.image ? (
        <img
          src={movie.image}
          alt={movie.title || "Poster film"}
          className="h-44 w-full object-cover rounded-xl mb-4 bg-[#1c2a41]"
        />
      ) : (
        <div className="h-44 bg-[#1c2a41] rounded-xl mb-4 flex items-center justify-center text-gray-500 text-sm">
          POSTER N/A
        </div>
      )}

      <h3 className="text-lg font-semibold mb-1 line-clamp-1">
        {title || movie?.title || "Nama Film"}
      </h3>

      <p className="text-sm text-gray-400 mb-3 line-clamp-1">
        {movie?.genre || "Genre"} • ⭐ {movie?.rating || "-"}
      </p>

      <div className="border-t border-gray-700 my-3" />

      <div className="mb-3">
        <p className="text-sm text-gray-400 mb-2">Kursi Terpilih</p>

        <div className="flex gap-2 flex-wrap min-h-[32px]">
          {selectedSeats.length > 0 ? (
            selectedSeats.map((seat) => (
              <span
                key={seat}
                className="bg-[#1c2a41] px-3 py-1 rounded-full text-sm border border-white/5"
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

      <div className="bg-[#14253d] p-4 rounded-xl mb-4">
        <p className="text-xs text-gray-400">TOTAL PEMBAYARAN</p>

        {loadingSummary ? (
          <div className="h-7 w-40 bg-white/10 rounded-md animate-pulse mt-2" />
        ) : (
          <p className="text-xl font-bold text-yellow-400">
            Rp {totalPayment.toLocaleString("id-ID")}
          </p>
        )}

        {selectedSeats.length > 0 && !loadingSummary && (
          <p className="text-[11px] text-gray-500 mt-1">
            {selectedSeats.length} tiket dipilih
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={onCheckout}
        disabled={selectedSeats.length === 0 || loadingSummary}
        className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-300 active:scale-95 transition-all duration-200"
      >
        {loadingSummary ? "Menghitung..." : "Lanjut Pembayaran →"}
      </button>

      <p className="text-[10px] text-gray-500 text-center mt-3">
        Dengan menekan tombol di atas, Anda menyetujui
        <br />
        Syarat & Ketentuan CineMatch.
      </p>
    </div>
  );
}