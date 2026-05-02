'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import MovieInfo from "@/components/ui/booking/MovieInfo";
import DateSelector from "@/components/ui/booking/DateSelector";
import CinemaList from "@/components/ui/booking/CinemaList";

export default function BookingPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState<any>(null);
  const [showtimes, setShowtimes] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="p-8">Loading...</div>;
  if (!movie) return <div className="p-8">Movie tidak ditemukan</div>;

  return (
    <main className="flex flex-col min-h-screen bg-[#041329] text-white">
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <MovieInfo movie={movie} />

          <div className="lg:col-span-2 space-y-6">
            <DateSelector onSelect={setSelectedDate} />
            <CinemaList data={filteredShowtime} />
          </div>
        </div>
      </div>
    </main>
  );
}