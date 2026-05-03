type Props = {
  selectedSeats: string[];
  movieId?: string | null;
  title?: string | null;
  date?: string | null;
  time?: string | null;
  cinema?: string | null;
};

export default function BookingSummary({
  selectedSeats,
  movieId,
  title,
  date,
  time,
  cinema,
}: Props) {

  const pricePerSeat = 55000;
  const total = selectedSeats.length * pricePerSeat;
  const movieMeta: any = {
    "Moana": {
      genre: "Animation • Family",
      duration: "107 Menit",
    },
    "The Super Mario Galaxy Movie": {
      genre: "Animation • Adventure",
      duration: "104 Menit",
    },
    "Siksa Kubur": {
      genre: "Horror",
      duration: "117 Menit",
    },
  };

  const meta = movieMeta[title || ""] || {
    genre: "Genre",
    duration: "0 Menit",
  };

  return (
    <div className="bg-[#0b1a2d] p-6 rounded-2xl shadow-lg w-full max-w-sm">

      {/* POSTER */}
      <div className="h-44 bg-[#1c2a41] rounded-xl mb-4 flex items-center justify-center text-gray-500 text-sm">
        POSTER N/A
      </div>

      {/* MOVIE TITLE */}
      <h3 className="text-lg font-semibold mb-1">
        {title || "Nama Film"}
      </h3>

      <p className="text-sm text-gray-400 mb-3">
        {meta.genre} • {meta.duration}
      </p>

      <div className="border-t border-gray-700 my-3" />

      {/* SELECTED SEATS */}
      <div className="mb-3">
        <p className="text-sm text-gray-400 mb-2">Kursi Terpilih</p>

        <div className="flex gap-2 flex-wrap">
          {selectedSeats.length > 0 ? (
            selectedSeats.map((seat) => (
              <span
                key={seat}
                className="bg-[#1c2a41] px-3 py-1 rounded-full text-sm"
              >
                {seat}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">-</span>
          )}
        </div>
        <p className="text-sm font-medium text-gray-300 mt-2">
          Jumlah Tiket: {selectedSeats.length} tiket
        </p>
      </div>

      {/* TOTAL */}
      <div className="bg-[#14253d] p-4 rounded-xl mb-4">
        <p className="text-xs text-gray-400">TOTAL PEMBAYARAN</p>
        <p className="text-xl font-bold text-yellow-400">
          Rp {total.toLocaleString("id-ID")}
        </p>
        <p className="text-[10px] text-gray-500 mt-1">
          *Termasuk biaya layanan
        </p>
      </div>

      {/* BUTTON */}
      <button
        disabled={selectedSeats.length === 0}
        className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold disabled:opacity-50 hover:opacity-90 transition"
      >
        Lanjut Pembayaran →
      </button>

      {/* FOOTNOTE */}
      <p className="text-[10px] text-gray-500 text-center mt-3">
        Dengan menekan tombol di atas, Anda menyetujui
        <br />
        Syarat & Ketentuan CineMatch.
      </p>

    </div>
  );
}