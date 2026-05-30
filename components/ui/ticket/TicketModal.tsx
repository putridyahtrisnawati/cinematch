"use client";

import { useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

type Props = {
  ticket: any;
  onClose: () => void;
};

export default function TicketModal({ ticket, onClose }: Props) {
  useEffect(() => {
    if (!ticket) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [ticket, onClose]);

  if (!ticket) return null;

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
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999] px-4"
      onClick={onClose}
    >
      <div
        className="bg-[#0b1a2d] border border-white/10 p-6 rounded-3xl text-center w-full max-w-sm shadow-2xl animate-[popup_.25s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-3xl">
            qr_code_2
          </span>
        </div>

        <h2 className="mb-4 font-semibold text-lg">
          E-Ticket
        </h2>

        <div className="flex justify-center bg-white p-4 rounded-2xl">
          <QRCodeCanvas
            value={JSON.stringify({
              id: ticket._id,
              movieTitle: ticket.movieTitle,
              cinema: ticket.cinema,
              date: ticket.date,
              time: ticket.time,
              seats: ticket.seats,
              status: ticket.status,
            })}
            size={190}
          />
        </div>

        <div className="mt-5 text-sm space-y-1">
          <p className="font-semibold line-clamp-1">
            {ticket.movieTitle}
          </p>

          <p className="text-gray-400">
            {ticket.cinema}
          </p>

          <p className="text-gray-400">
            {formatDate(ticket.date)} • {ticket.time || "-"}
          </p>

          <p className="text-gray-400">
            Kursi: {ticket.seats?.join(", ") || "-"}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 active:scale-95 transition-all duration-200"
        >
          Tutup
        </button>

        <p className="text-[11px] text-gray-500 mt-4">
          Tunjukkan QR Code ini saat masuk studio.
        </p>
      </div>
    </div>
  );
}