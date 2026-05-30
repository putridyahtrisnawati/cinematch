"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import SeatGrid from "@/components/ui/seat/SeatGrid";
import SeatLegend from "@/components/ui/seat/SeatLegend";
import BookingSummary from "@/components/ui/seat/BookingSummary";

export default function SeatPage() {
  const router = useRouter();
  const params = useSearchParams();

  const movieId = params.get("movieId");
  const title = params.get("title");
  const date = params.get("date");
  const time = params.get("time");
  const cinema = params.get("cinema");
  const seatsParam = params.get("seats");

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [movie, setMovie] = useState<any>(null);
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);

  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingSeats, setLoadingSeats] = useState(true);
  const [seatError, setSeatError] = useState("");

  useEffect(() => {
    if (!seatsParam) return;

    const seatsArray = seatsParam
      .split(",")
      .map((seat) => seat.trim())
      .filter(Boolean);

    setSelectedSeats(seatsArray);
  }, [seatsParam]);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) {
        setLoadingMovie(false);
        return;
      }

      try {
        setLoadingMovie(true);

        const res = await fetch(`/api/movies/${movieId}`);

        if (!res.ok) {
          throw new Error("Gagal mengambil data movie");
        }

        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Fetch movie error:", error);
        setMovie(null);
      } finally {
        setLoadingMovie(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    const fetchSeats = async () => {
      const isReady = movieId && cinema && date && time;

      if (!isReady) {
        setLoadingSeats(false);
        return;
      }

      try {
        setLoadingSeats(true);
        setSeatError("");

        const query = new URLSearchParams({
          movieId: movieId || "",
          cinema: cinema || "",
          date: date || "",
          time: time || "",
        });

        const res = await fetch(`/api/seats?${query.toString()}`);

        if (!res.ok) {
          throw new Error("Gagal mengambil data kursi");
        }

        const data = await res.json();

        setOccupiedSeats(
          Array.isArray(data.occupiedSeats) ? data.occupiedSeats : []
        );
      } catch (error) {
        console.error("Fetch seats error:", error);
        setOccupiedSeats([]);
        setSeatError("Gagal memuat data kursi. Silakan coba refresh halaman.");
      } finally {
        setLoadingSeats(false);
      }
    };

    fetchSeats();
  }, [movieId, cinema, date, time]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";

    const dateObj = new Date(dateStr);

    if (Number.isNaN(dateObj.getTime())) {
      return dateStr;
    }

    return dateObj.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleGoToPayment = () => {
    if (selectedSeats.length === 0) return;

    const seatParam = selectedSeats.join(",");

    const query = new URLSearchParams({
      title: title || "",
      cinema: cinema || "",
      date: date || "",
      time: time || "",
      seats: seatParam,
      movieId: movieId || "",
    });

    router.push(`/payment?${query.toString()}`);
  };

  const isScheduleValid = movieId && cinema && date && time;

  if (!isScheduleValid) {
    return (
      <main className="min-h-screen bg-[#041329] text-white px-8 pt-24 pb-12">
        <div className="max-w-xl mx-auto bg-[#0b1a2d] border border-white/5 rounded-2xl p-10 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-5">
            <span className="material-symbols-outlined text-3xl">
              event_busy
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-2">
            Data Jadwal Tidak Lengkap
          </h2>

          <p className="text-gray-400 mb-6">
            Silakan pilih jadwal film terlebih dahulu sebelum memilih kursi.
          </p>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 active:scale-95 transition-all duration-200"
          >
            Kembali ke Beranda
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#041329] text-white px-8 pt-24 pb-12">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Kembali"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0d1c32] border border-white/10 text-yellow-400 hover:bg-yellow-400 hover:text-black active:scale-95 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[20px]">
              arrow_back_ios_new
            </span>
          </button>

          <div>
            <p className="text-xs text-gray-400">
              SEKARANG MEMILIH
            </p>

            <h2 className="text-xl font-semibold">
              {title || movie?.title || "Nama Film"}
            </h2>
          </div>
        </div>

        <div className="md:text-right bg-[#0b1a2d] border border-white/5 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400">
            TEMPAT & WAKTU
          </p>

          <p className="text-sm text-yellow-400 font-medium">
            {cinema || "-"} • {formatDate(date)} • {time || "-"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col items-center bg-[#0b1a2d] border border-white/5 rounded-2xl p-6 shadow-xl">
          {loadingSeats ? (
            <div className="w-full flex flex-col items-center">
              <div className="w-full max-w-xl h-[2px] bg-yellow-400 mb-3" />

              <div className="h-4 w-28 bg-white/10 rounded animate-pulse mb-8" />

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((row) => (
                  <div key={row} className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-white/10 rounded animate-pulse" />

                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((seat) => (
                        <div
                          key={seat}
                          className="w-9 h-9 bg-white/5 rounded animate-pulse"
                        />
                      ))}
                    </div>

                    <div className="w-6" />

                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((seat) => (
                        <div
                          key={seat}
                          className="w-9 h-9 bg-white/5 rounded animate-pulse"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : seatError ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-5">
                <span className="material-symbols-outlined text-3xl">
                  error
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">
                Kursi Gagal Dimuat
              </h3>

              <p className="text-gray-400 mb-6">
                {seatError}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 active:scale-95 transition-all duration-200"
              >
                Refresh
              </button>
            </div>
          ) : (
            <SeatGrid
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              occupiedSeats={occupiedSeats}
            />
          )}

          <SeatLegend />
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
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

          {loadingMovie && (
            <p className="text-xs text-gray-500 text-center mt-3">
              Memuat detail film...
            </p>
          )}
        </div>
      </div>
    </main>
  );
}