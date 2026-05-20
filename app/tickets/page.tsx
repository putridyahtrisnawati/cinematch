'use client';

import { useEffect, useState } from "react";
import TicketList from "@/components/ui/ticket/TicketList";
import TicketModal from "@/components/ui/ticket/TicketModal";

export default function TicketPage() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH TICKETS FROM BACKEND
  const fetchTickets = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/tickets");
      const data = await res.json();

      setTickets(data.tickets || []);
    } catch (err) {
      console.error("Fetch tickets error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FETCH MOVIES (POSTER)
  const fetchMovies = async () => {
    try {
      const res = await fetch("/api/movies");
      const data = await res.json();

      setMovies(data || []);
    } catch (err) {
      console.error("Fetch movies error:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchMovies();
  }, []);

  return (
    <main className="min-h-screen bg-[#041329] text-white p-8">

      <h1 className="text-2xl font-bold mb-6">
        Riwayat Tiket
      </h1>

      <div className="bg-[#0b1a2d] p-4 rounded-xl">

        {/* 🔄 LOADING */}
        {loading ? (
          <p className="text-center text-gray-400">
            Loading tiket...
          </p>
        ) : (
          <TicketList
            tickets={tickets}
            movies={movies}
            onShowQR={setSelectedTicket}
            onRefresh={fetchTickets} // 🔥 biar bisa refresh setelah cancel
          />
        )}

      </div>

      {/* 🔥 MODAL QR */}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}

    </main>
  );
}