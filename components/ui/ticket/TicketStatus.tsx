'use client';

type Props = {
  status: string;
};

export default function TicketStatus({ status }: Props) {

  const getLabel = () => {
    switch (status) {
      case "ACTIVE": return "Aktif";
      case "COMPLETED": return "Selesai";
      case "CANCELLED_USER": return "Dibatalkan";
      case "CANCELLED_SYSTEM": return "Expired";
      default: return "-";
    }
  };

  const getStyle = () => {
    switch (status) {
      case "ACTIVE": return "bg-yellow-400 text-black";
      case "COMPLETED": return "bg-gray-500 text-white";
      case "CANCELLED_USER":
      case "CANCELLED_SYSTEM":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <span className={`text-xs px-3 py-1 rounded-full ${getStyle()}`}>
      {getLabel()}
    </span>
  );
}