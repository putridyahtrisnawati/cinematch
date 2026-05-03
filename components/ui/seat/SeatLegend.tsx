export default function SeatLegend() {
  return (
    <div className="flex justify-center gap-8 mt-8 text-sm text-gray-300">

      {/* TERSEDIA */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-[#1c2a41] rounded" />
        <span>Tersedia</span>
      </div>

      {/* TERISI */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 flex items-center justify-center text-gray-400">
          ✕
        </div>
        <span>Terisi</span>
      </div>

      {/* DIPILIH */}
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-yellow-400 rounded" />
        <span>Dipilih</span>
      </div>

    </div>
  );
}