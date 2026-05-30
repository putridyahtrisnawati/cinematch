"use client";

type Props = {
  status: string;
};

export default function TicketStatus({ status }: Props) {
  const getLabel = () => {
    switch (status) {
      case "aktif":
        return "Aktif";
      case "selesai":
        return "Selesai";
      case "dibatalkan":
        return "Dibatalkan";
      case "expired":
        return "Expired";
      default:
        return "-";
    }
  };

  const getStyle = () => {
    switch (status) {
      case "aktif":
        return "bg-yellow-400 text-black border-yellow-400";

      case "selesai":
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";

      case "dibatalkan":
      case "expired":
        return "bg-red-500/20 text-red-400 border-red-500/30";

      default:
        return "bg-gray-400/20 text-gray-300 border-gray-400/30";
    }
  };

  return (
    <span
      className={`text-xs px-3 py-1 rounded-full border font-semibold ${getStyle()}`}
    >
      {getLabel()}
    </span>
  );
}