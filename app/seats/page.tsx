'use client'

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import SeatGrid from "@/components/ui/seat/SeatGrid";
import SeatLegend from "@/components/ui/seat/SeatLegend";
import BookingSummary from "@/components/ui/seat/BookingSummary";

export default function SeatPage() {
  const router = useRouter();

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [movie, setMovie] = useState<any>(null);
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
  const [loadingSeats, setLoadingSeats] = useState(false);

  const params = useSearchParams();
  const movieId = params.get("movieId");
  const title = params.get("title");
  const date = params.get("date");
  const time = params.get("time");
  const cinema = params.get("cinema");
  const seatsParam = params.get("seats");

  useEffect(() => {
    if (!seatsParam) return;

    const seatsArray = seatsParam.split(",");
    setSelectedSeats(seatsArray);

  }, [seatsParam]);

  console.log("PARAMS:", {
    movieId,
    cinema,
    date,
    time,
    seatsParam
  });

  // 🎬 FETCH MOVIE
  useEffect(() => {
    if (!movieId) return;

    fetch(`/api/movies/${movieId}`)
      .then(res => res.json())
      .then(data => setMovie(data))
      .catch(() => setMovie(null));

  }, [movieId]);

  // 🎟 FETCH SEATS
  useEffect(() => {
    const isReady = movieId && cinema && date && time;

    if (!isReady) return;

    console.log("FETCH SEATS TRIGGERED");

    setLoadingSeats(true);

    fetch(`/api/seats?movieId=${movieId}&cinema=${cinema}&date=${date}&time=${time}`)
      .then(res => res.json())
      .then(data => {
        console.log("SEATS DATA:", data);
        setOccupiedSeats(data.occupiedSeats || []);
        setLoadingSeats(false);
      })
      .catch((err) => {
        console.error(err);
        setOccupiedSeats([]);
        setLoadingSeats(false);
      });

  }, [movieId, cinema, date, time]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";

    const dateObj = new Date(dateStr);

    return dateObj.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleGoToPayment = () => {
    if (selectedSeats.length === 0) return;

    const seatParam = selectedSeats.join(",");

    router.push(
      `/payment?title=${encodeURIComponent(title || "")}&cinema=${encodeURIComponent(cinema || "")}&date=${date}&time=${time}&seats=${seatParam}`
    );
  };

  return (
    <main className="min-h-screen bg-[#041329] text-white p-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0d1c32] hover:bg-yellow-400 hover:text-black transition"
          >
            ←
          </button>

          <div>
            <p className="text-xs text-gray-400">SEKARANG MEMILIH</p>
            <h2 className="text-xl font-semibold">
              {title || "Nama Film"}
            </h2>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">TEMPAT & WAKTU</p>
          <p className="text-sm text-yellow-400 font-medium">
            {cinema || "-"} • {formatDate(date)} • {time || "-"}
          </p>
        </div>

      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2 flex flex-col items-center">

          {loadingSeats ? (
            <p className="text-gray-400">Loading kursi...</p>
          ) : (
            <SeatGrid
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              occupiedSeats={occupiedSeats}
            />
          )}

          <SeatLegend />
        </div>

        <BookingSummary
          selectedSeats={selectedSeats}
          movieId={movieId}
          movie={movie}
          title={title}
          date={date}
          time={time}
          cinema={cinema}
          onCheckout={handleGoToPayment}
        />

      </div>

    </main>
  );
}