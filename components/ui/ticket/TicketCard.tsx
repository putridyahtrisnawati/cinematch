'use client';

import TicketStatus from "./TicketStatus";

type Props = {
  item: any;
  movie: any;
  onShowQR: (ticket: any) => void;
};

export default function TicketCard({ item, movie, onShowQR }: Props) {

  return (
    <div className="flex justify-between items-center bg-[#0d1c32] p-4 rounded-xl">

      {/* LEFT */}
      <div className="flex gap-4">
        <img
          src={movie?.image || "/placeholder.png"}
          alt={movie?.title}
          className="w-16 h-20 rounded object-cover"
        />

        <div className="space-y-1">
          <p className="font-semibold text-sm">
            {movie?.title || item.movieTitle}
          </p>

          <p className="text-xs text-gray-400">
            {item.cinema}
          </p>

          <p className="text-xs text-gray-400">
            {item.date
              ? new Date(item.date).toLocaleDateString("id-ID")
              : "-"}{" "}
            • {item.time || "-"}
          </p>

          <p className="text-xs text-gray-400">
            Kursi: {item.seats?.join(", ") || "-"}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-2">

        {/* STATUS */}
        <TicketStatus status={item.status} />

        {/* ACTION */}
        {item.status === "ACTIVE" ? (
          <button
            onClick={() => onShowQR(item)}
            className="text-yellow-400 text-sm hover:underline"
          >
            Lihat E-Tiket
          </button>
        ) : (
          <button
            onClick={() => window.location.href = "/"}
            className="text-yellow-400 text-sm hover:underline"
          >
            Beli Lagi
          </button>
        )}

      </div>

    </div>
  );
}