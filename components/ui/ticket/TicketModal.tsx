'use client';

import { QRCodeCanvas } from "qrcode.react";

type Props = {
  ticket: any;
  onClose: () => void;
};

export default function TicketModal({ ticket, onClose }: Props) {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-[#0b1a2d] p-6 rounded-xl text-center w-[300px]">

        <h2 className="mb-4 font-semibold text-lg">
          E-Ticket
        </h2>

        {/* QR CODE */}
        <div className="flex justify-center">
          <QRCodeCanvas
            value={JSON.stringify(ticket)}
            size={200}
          />
        </div>

        {/* INFO */}
        <div className="mt-4 text-sm space-y-1">
          <p className="font-semibold">
            {ticket.movieTitle}
          </p>

          <p className="text-gray-400">
            {ticket.cinema}
          </p>

          <p className="text-gray-400">
            {ticket.date
              ? new Date(ticket.date).toLocaleDateString("id-ID")
              : "-"}{" "}
            • {ticket.time || "-"}
          </p>

          <p className="text-gray-400">
            Kursi: {ticket.seats?.join(", ") || "-"}
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={onClose}
          className="mt-5 w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold"
        >
          Tutup
        </button>

      </div>

    </div>
  );
}