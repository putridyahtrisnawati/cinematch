'use client'

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
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";

    const date = new Date(dateStr);

    return date.toLocaleDateString("id-ID", {
      weekday: "long", // 🔥 ini biar ada "Sabtu"
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  useEffect(() => {
    if (!id) return;

    async function fetchData() {
      try {
        const movieRes = await fetch(`/api/movies/${id}`);
        const movieData = await movieRes.json();

        const showtimesRes = await fetch(`/api/movies/${id}/showtimes`);
        const showtimesData = await showtimesRes.json();

        setMovie(movieData);
        setShowtimes(showtimesData);

        if (showtimesData.length > 0) {
          setSelectedDate(showtimesData[0].date);
        }
      } catch (error) {
        console.error("Gagal fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const filteredShowtime = showtimes.find(
    (item) => item.date === selectedDate
  );

  const handleSelectSchedule = (cinema: any, time: string) => {
    setSelectedCinema(cinema);
    setSelectedTime(time);
  };

  const handleCariKursi = () => {
    if (!selectedCinema || !selectedTime || !selectedDate) return;

    router.push(
      `/seats?movieId=${id}&title=${movie.title}&cinema=${selectedCinema.name}&date=${selectedDate}&time=${selectedTime}`
    );
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!movie) return <div className="p-8">Movie tidak ditemukan</div>;

  return (
    <main className="flex flex-col min-h-screen bg-[#041329] text-white pb-28">

      {/* 🔥 HEADER */}
      <div className="flex items-center gap-3 p-8 pb-0">

        {/* BACK BUTTON */}
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0d1c32] hover:bg-yellow-400 hover:text-black transition"
        >
          ←
        </button>

        {/* TITLE */}
        <div>
          <h2 className="text-lg font-semibold tracking-wide">
            Pilih Jadwal
          </h2>
        </div>

      </div>
      <div className="flex-1 p-8">
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
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#041329]/95 border-t border-white/10 px-8 py-4 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-10">
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
            onClick={handleCariKursi}
            disabled={!selectedCinema || !selectedTime}
            className={`px-10 py-3 rounded-xl font-bold transition ${selectedCinema && selectedTime
              ? "bg-yellow-400 text-black"
              : "bg-gray-500 text-gray-300 cursor-not-allowed"
              }`}
          >
            Cari Kursi
          </button>
        </div>
      </div>
    </main>
  );
}