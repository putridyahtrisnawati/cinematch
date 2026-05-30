"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TicketList from "@/components/ui/ticket/TicketList";
import TicketModal from "@/components/ui/ticket/TicketModal";

export default function TicketPage() {
  const router = useRouter();

  const [tickets, setTickets] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [checkingLogin, setCheckingLogin] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const fetchTickets = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/tickets");

      if (!res.ok) {
        throw new Error("Gagal mengambil tiket");
      }

      const data = await res.json();

      setTickets(data.tickets || []);
    } catch (err) {
      console.error("Fetch tickets error:", err);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await fetch("/api/movies");

      if (!res.ok) {
        throw new Error("Gagal mengambil movies");
      }

      const data = await res.json();

      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch movies error:", err);
      setMovies([]);
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");

    setIsLogin(!!user);
    setCheckingLogin(false);

    if (user) {
      fetchTickets();
      fetchMovies();
    } else {
      setLoading(false);
    }
  }, []);

  if (checkingLogin) {
    return (
      <main className="min-h-screen bg-[#041329] text-white px-8 pt-24 pb-12">
        <div className="h-8 w-44 bg-white/10 rounded-lg animate-pulse mb-8" />

        <div className="bg-[#0b1a2d] rounded-2xl p-8 border border-white/5">
          <div className="space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-24 bg-white/5 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!isLogin) {
    return (
      <main className="min-h-screen bg-[#041329] text-white px-8 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">
          Riwayat Tiket
        </h1>

        <div className="bg-[#0b1a2d] border border-white/5 rounded-2xl p-12 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-5">
            <span className="material-symbols-outlined text-3xl">
              confirmation_number
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-3">
            Riwayat Tiket Kosong
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            Mohon maaf, riwayat tiket belum tersedia karena Anda belum login.
            Login terlebih dahulu untuk melihat tiket yang sudah Anda pesan.
          </p>

          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 active:scale-95 transition-all duration-200"
          >
            Login Sekarang
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#041329] text-white px-8 pt-24 pb-12">
      <h1 className="text-2xl font-bold mb-8">
        Riwayat Tiket
      </h1>

      <div className="bg-[#0b1a2d] p-4 rounded-2xl border border-white/5 shadow-xl">
        {loading ? (
          <div className="space-y-5 p-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-24 bg-white/5 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-5">
              <span className="material-symbols-outlined text-3xl">
                confirmation_number
              </span>
            </div>

            <h2 className="text-xl font-bold mb-2">
              Belum Ada Tiket
            </h2>

            <p className="text-gray-400 mb-6">
              Anda belum memiliki riwayat pemesanan tiket.
            </p>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 active:scale-95 transition-all duration-200"
            >
              Cari Film
            </button>
          </div>
        ) : (
          <TicketList
            tickets={tickets}
            movies={movies}
            onShowQR={setSelectedTicket}
            onRefresh={fetchTickets}
          />
        )}
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