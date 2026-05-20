'use client';

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

  // 🔍 cari movie berdasarkan title
  const getMovie = (title: string) => {
    return movies.find(
      (m) =>
        m.title?.toLowerCase().trim() ===
        title?.toLowerCase().trim()
    );
  };

  // ❌ kalau belum ada tiket
  if (!tickets || tickets.length === 0) {
    return (
      <p className="text-center text-gray-400">
        Belum ada tiket
      </p>
    );
  }

  return (
    <div className="space-y-4">

      {tickets.map((item) => {
        const movie = getMovie(item.movieTitle) || null;

        return (
          <TicketCard
            key={item._id}
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