"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import MovieInfo from "@/components/ui/booking/MovieInfo";
import DateSelector from "@/components/ui/booking/DateSelector";
import CinemaList from "@/components/ui/booking/CinemaList";

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [movie, setMovie] = useState<any>(null);
  const [showtimes, setShowtimes] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCinema, setSelectedCinema] = useState<any>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [loginPopup, setLoginPopup] = useState(false);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";

    const date = new Date(dateStr);

    if (Number.isNaN(date.getTime())) {
      return dateStr;
    }

    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        setLoading(true);

        const movieRes = await fetch(`/api/movies/${id}`);

        if (!movieRes.ok) {
          throw new Error("Gagal mengambil data movie");
        }

        const movieData = await movieRes.json();

        const showtimesRes = await fetch(`/api/movies/${id}/showtimes`);

        if (!showtimesRes.ok) {
          throw new Error("Gagal mengambil data showtimes");
        }

        const showtimesData = await showtimesRes.json();

        setMovie(movieData);
        setShowtimes(Array.isArray(showtimesData) ? showtimesData : []);

      } catch (error) {
        console.error("Gagal fetch data:", error);
        setMovie(null);
        setShowtimes([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!loginPopup) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLoginPopup(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [loginPopup]);

  const filteredShowtime = showtimes.find(
    (item) => item.date === selectedDate
  );

  const handleSelectSchedule = (cinema: any, time: string) => {
    setSelectedCinema(cinema);
    setSelectedTime(time);
  };

  const handleCariKursi = () => {
    if (!selectedCinema || !selectedTime || !selectedDate) return;

    const user = localStorage.getItem("user");

    if (!user) {
      setLoginPopup(true);
      return;
    }

    const query = new URLSearchParams({
      movieId: String(id || ""),
      title: movie?.title || "",
      cinema: selectedCinema?.name || "",
      date: selectedDate || "",
      time: selectedTime || "",
    });

    router.push(`/seats?${query.toString()}`);
  };

  const handleGoLogin = () => {
    setLoginPopup(false);
    router.push("/auth/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#041329] text-white px-8 pt-24 pb-28">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-full bg-white/10 animate-pulse" />
          <div className="h-6 w-32 bg-white/10 rounded-lg animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="h-[520px] bg-white/5 rounded-2xl animate-pulse" />

          <div className="lg:col-span-2 space-y-6">
            <div className="h-24 bg-white/5 rounded-2xl animate-pulse" />
            <div className="h-80 bg-white/5 rounded-2xl animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="min-h-screen bg-[#041329] text-white px-8 pt-24 pb-12">
        <div className="max-w-xl mx-auto bg-[#0d1c32] border border-white/5 rounded-2xl p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center mx-auto mb-5">
            <span className="material-symbols-outlined text-3xl">
              movie_off
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-2">
            Movie Tidak Ditemukan
          </h2>

          <p className="text-gray-400 mb-6">
            Data film tidak tersedia atau terjadi kesalahan saat mengambil data.
          </p>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 active:scale-95 transition"
          >
            Kembali ke Beranda
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#041329] text-white px-8 pt-24 pb-28">
      <div className="flex items-center gap-3 mb-8">
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
            PILIH
          </p>

          <h2 className="text-lg font-semibold tracking-wide">
            Jadwal
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <MovieInfo movie={movie} />

        <div className="lg:col-span-2 space-y-6">
          <DateSelector
            onSelect={(date: string) => {
              setSelectedDate(date);
              setSelectedCinema(null);
              setSelectedTime(null);
            }}
          />

          <CinemaList
            data={filteredShowtime}
            selectedCinema={selectedCinema}
            selectedTime={selectedTime}
            onSelectSchedule={handleSelectSchedule}
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#041329]/95 backdrop-blur-xl border-t border-white/10 px-8 py-4 z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            <div>
              <p className="text-xs text-gray-400">BIOSKOP PILIHAN</p>
              <p className="font-semibold">
                {selectedCinema ? selectedCinema.name : "-"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-400">WAKTU</p>
              <p className="font-semibold">
                {selectedDate && selectedTime
                  ? `${formatDate(selectedDate)} • ${selectedTime}`
                  : "-"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCariKursi}
            disabled={!selectedCinema || !selectedTime}
            className={`w-full sm:w-auto px-10 py-3 rounded-xl font-bold transition-all duration-200 ${
              selectedCinema && selectedTime
                ? "bg-yellow-400 text-black hover:bg-yellow-300 active:scale-95 shadow-lg shadow-yellow-400/10"
                : "bg-gray-500 text-gray-300 cursor-not-allowed opacity-60"
            }`}
          >
            Cari Kursi
          </button>
        </div>
      </div>

      {loginPopup && (
        <div
          className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
          onClick={() => setLoginPopup(false)}
        >
          <div
            className="w-full max-w-md bg-[#0d1c32] border border-white/10 rounded-3xl p-7 shadow-2xl animate-[popup_.25s_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-yellow-400/10 flex items-center justify-center border border-yellow-400/20">
              <span className="material-symbols-outlined text-yellow-400 text-4xl">
                lock
              </span>
            </div>

            <h2 className="text-xl font-bold text-center mb-2">
              Login Diperlukan
            </h2>

            <p className="text-gray-400 text-sm text-center leading-relaxed mb-6">
              Silakan login terlebih dahulu untuk memilih kursi dan melanjutkan
              proses pemesanan tiket.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setLoginPopup(false)}
                className="py-3 rounded-xl bg-[#14243a] text-gray-300 font-semibold hover:bg-[#1b2d46] active:scale-95 transition-all duration-200"
              >
                Nanti Saja
              </button>

              <button
                type="button"
                onClick={handleGoLogin}
                className="py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-yellow-300 active:scale-95 transition-all duration-200"
              >
                Login
              </button>
            </div>

            <p className="text-[11px] text-gray-500 text-center mt-5">
              Tekan ESC atau klik area luar untuk menutup popup.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}