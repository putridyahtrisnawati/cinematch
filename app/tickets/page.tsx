'use client';

import { useEffect, useState } from "react";
import TicketList from "@/components/ui/ticket/TicketList";
import TicketModal from "@/components/ui/ticket/TicketModal";

export default function TicketPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  // 🔥 DUMMY DATA
  useEffect(() => {
    const dummy = [
      {
        _id: "1",
        movieTitle: "Moana",
        cinema: "XXI Kediri",
        date: "2026-05-20",
        time: "19:30",
        seats: ["J12", "J13"],
        status: "ACTIVE"
      },
      {
        _id: "2",
        movieTitle: "Hoppers",
        cinema: "CGV Kediri Mall",
        date: "2026-05-18",
        time: "21:00",
        seats: ["A4"],
        status: "COMPLETED"
      },
      {
        _id: "3",
        movieTitle: "The Super Mario Galaxy Movie",
        cinema: "CGV Kediri Mall",
        date: "2026-05-05",
        time: "14:20",
        seats: ["F7", "F8"],
        status: "CANCELLED_USER"
      },
      {
        _id: "4",
        movieTitle: "Project Hall Mary",
        cinema: "Golden Theatre",
        date: "2026-04-27",
        time: "16:45",
        seats: ["D10"],
        status: "CANCELLED_SYSTEM"
      }
    ];

    setTickets(dummy);
  }, []);

  // 🔥 FETCH MOVIE (POSTER)
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data);
    };

    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen bg-[#041329] text-white p-8">

      <h1 className="text-2xl font-bold mb-6">
        Riwayat Tiket
      </h1>

      <div className="bg-[#0b1a2d] p-4 rounded-xl">
        <TicketList
          tickets={tickets}
          movies={movies}
          onShowQR={setSelectedTicket}
        />
      </div>

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}

    </main>
  );
}