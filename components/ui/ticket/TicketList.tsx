"use client";

import TicketCard from "./TicketCard";

type Props = {
  tickets: any[];
  movies: any[];
  onShowQR: (ticket: any) => void;
  onRefresh: () => void;
};

export default function TicketList({
  tickets,
  movies,
  onShowQR,
  onRefresh,
}: Props) {
  const getMovie = (title: string) => {
    return movies.find(
      (m) =>
        m.title?.toLowerCase().trim() ===
        title?.toLowerCase().trim()
    );
  };

  if (!tickets || tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-5">
          <span className="material-symbols-outlined text-3xl">
            confirmation_number
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2">
          Belum Ada Tiket
        </h3>

        <p className="text-gray-400 text-sm">
          Tiket yang kamu pesan nanti akan muncul di sini.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((item) => {
        const movie = getMovie(item.movieTitle) || null;

        return (
          <TicketCard
            key={item._id || `${item.movieTitle}-${item.date}-${item.time}`}
            item={item}
            movie={movie}
            onShowQR={onShowQR}
            onRefresh={onRefresh}
          />
        );
      })}
    </div>
  );
}