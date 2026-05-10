'use client'

type Props = {
  selectedSeats: string[];
  setSelectedSeats: (seats: string[]) => void;
  occupiedSeats?: string[]; // 🔥 optional biar aman
};

const rows = ["A", "B", "C", "D", "E"];

export default function SeatGrid({ 
  selectedSeats, 
  setSelectedSeats, 
  occupiedSeats = [] // 🔥 default biar ga undefined
}: Props) {

  const toggleSeat = (seat: string) => {
    if (occupiedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const renderSeat = (seat: string) => {
    const isBooked = occupiedSeats.includes(seat);
    const isSelected = selectedSeats.includes(seat);

    return (
      <button
        key={seat}
        onClick={() => toggleSeat(seat)}
        className={`w-9 h-9 rounded flex items-center justify-center text-xs transition ${
          isBooked
            ? "text-gray-500 cursor-not-allowed"
            : isSelected
            ? "bg-yellow-400 text-black"
            : "bg-[#1c2a41] hover:bg-yellow-400 hover:text-black"
        }`}
      >
        {isBooked ? "✕" : ""}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center">

      <div className="w-full max-w-xl h-[2px] bg-yellow-400 mb-3" />
      <p className="text-xs text-gray-400 mb-6">
        LAYAR BIOSKOP
      </p>

      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-4">

            <span className="w-4 text-sm">{row}</span>

            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => {
                const seat = `${row}${i + 1}`;
                return renderSeat(seat);
              })}
            </div>

            <div className="w-6" />

            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => {
                const seat = `${row}${i + 5}`;
                return renderSeat(seat);
              })}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}