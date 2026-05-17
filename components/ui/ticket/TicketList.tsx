'use client';

import TicketCard from "./TicketCard";

type Props = {
  tickets: any[];
  movies: any[];
  onShowQR: (ticket: any) => void;
};

export default function TicketList({ tickets, movies, onShowQR }: Props) {

  const getMovie = (title: string) => {
    return movies.find(
      (m) =>
        m.title.toLowerCase().trim() ===
        title.toLowerCase().trim()
    );
  };

  if (tickets.length === 0) {
    return <p className="text-center text-gray-400">Belum ada tiket</p>;
  }

  return (
    <div className="space-y-4">
      {tickets.map((item) => {
        const movie = getMovie(item.movieTitle);

        return (
          <TicketCard
            key={item._id}
            item={item}
            movie={movie}
            onShowQR={onShowQR}
          />
        );
      })}
    </div>
  );
}