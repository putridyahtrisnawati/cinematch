export default function SeatLegend() {
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8 text-sm text-gray-300">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-[#1c2a41] rounded border border-white/5" />
        <span>Tersedia</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-4 h-4 flex items-center justify-center text-gray-400">
          ✕
        </div>
        <span>Terisi</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-yellow-400 rounded" />
        <span>Dipilih</span>
      </div>
    </div>
  );
}