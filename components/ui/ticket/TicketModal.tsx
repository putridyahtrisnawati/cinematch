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
      <div className="bg-[#0b1a2d] p-6 rounded-xl text-center">

        <h2 className="mb-4 font-semibold">E-Ticket</h2>

        <QRCodeCanvas
          value={JSON.stringify(ticket)}
          size={200}
        />

        <p className="mt-4 text-sm">{ticket?.movieTitle}</p>

        <button
          onClick={onClose}
          className="mt-4 bg-yellow-400 text-black px-4 py-2 rounded"
        >
          Tutup
        </button>

      </div>
    </div>
  );
}