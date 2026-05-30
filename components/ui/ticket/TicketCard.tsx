"use client";

import { useRouter } from "next/navigation";
import TicketStatus from "./TicketStatus";

type Props = {
  item: any;
  movie: any;
  onShowQR: (ticket: any) => void;
  onRefresh: () => void;
};

export default function TicketCard({
  item,
  movie,
  onShowQR,
}: Props) {
  const router = useRouter();

  const formatDate = (date: string) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 bg-[#0d1c32] p-4 rounded-xl border border-white/5 hover:border-yellow-400/30 transition-all duration-200 shadow-lg shadow-black/10">
      <div className="flex gap-4 min-w-0">
        <img
          src={movie?.image || "/placeholder.png"}
          alt={movie?.title || item.movieTitle || "Poster film"}
          className="w-16 h-20 rounded-lg object-cover bg-[#14243a] shrink-0"
        />

        <div className="space-y-1 min-w-0">
          <p className="font-semibold text-sm line-clamp-1">
            {movie?.title || item.movieTitle || "Nama Film"}
          </p>

          <p className="text-xs text-gray-400 line-clamp-1">
            {item.cinema || "-"}
          </p>

          <p className="text-xs text-gray-400">
            {formatDate(item.date)} • {item.time || "-"}
          </p>

          <p className="text-xs text-gray-400 line-clamp-1">
            Kursi: {item.seats?.join(", ") || "-"}
          </p>
        </div>
      </div>

      <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">
        <TicketStatus status={item.status} />

        {item.status === "aktif" ? (
          <button
            type="button"
            onClick={() => onShowQR(item)}
            className="text-yellow-400 text-sm font-semibold hover:text-yellow-300 active:scale-95 transition-all duration-200"
          >
            Lihat E-Tiket
          </button>
        ) : (
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-yellow-400 text-sm font-semibold hover:text-yellow-300 active:scale-95 transition-all duration-200"
          >
            Beli Lagi
          </button>
        )}
      </div>
    </div>
  );
}