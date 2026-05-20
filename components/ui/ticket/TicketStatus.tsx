'use client';

type Props = {
  status: string;
};

export default function TicketStatus({ status }: Props) {

  const getLabel = () => {
    switch (status) {
      case "aktif": return "Aktif";
      case "selesai": return "Selesai";
      case "dibatalkan": return "Dibatalkan";
      case "expired": return "Expired";
      default: return "-";
    }
  };

  const getStyle = () => {
    switch (status) {
      case "aktif":
        return "bg-yellow-400 text-black";

      case "selesai":
        return "bg-gray-500 text-white";

      case "dibatalkan":
      case "expired":
        return "bg-red-500 text-white";

      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <span className={`text-xs px-3 py-1 rounded-full ${getStyle()}`}>
      {getLabel()}
    </span>
  );
}