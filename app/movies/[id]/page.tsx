'use client'

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import MovieInfo from "@/components/ui/booking/MovieInfo";
import DateSelector from "@/components/ui/booking/DateSelector";
import CinemaList from "@/components/ui/booking/CinemaList";

export default function BookingPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/movies/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal fetch");
        return res.json();
      })
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!movie) return <div className="p-8">Movie tidak ditemukan</div>;

  return (
    <main className="flex flex-col min-h-screen bg-[#041329] text-white">
      <div className="flex-1 p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <MovieInfo movie={movie} />

          <div className="lg:col-span-2 space-y-6">
            <DateSelector />
            <CinemaList />
          </div>

        </div>
      </div>
    </main>
  );
}