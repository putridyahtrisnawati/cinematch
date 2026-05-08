type Props = {
  title?: string | null;
  cinema?: string | null;
  date?: string | null;
  time?: string | null;
  seats?: string[];
};

export default function PaymentSummary({
  title,
  cinema,
  date,
  time,
  seats = [],
}: Props) {

  const price = 50000;
  const fee = 4000;
  const total = seats.length * price + fee;

  return (
    <div className="bg-[#0b1a2d] p-6 rounded-2xl w-full max-w-sm">

      <h3 className="mb-4 font-semibold">
        Ringkasan Pesanan
      </h3>

      {/* MOVIE */}
      <div className="flex gap-3 mb-4">
        <div className="w-16 h-20 bg-[#1c2a41] rounded" />

        <div>
          <p className="font-semibold">
            {title || "Nama Film"}
          </p>
          <p className="text-xs text-yellow-400">
            Genre • Rating
          </p>
          <p className="text-xs text-gray-400">
            Durasi
          </p>
        </div>
      </div>

      {/* DETAIL */}
      <div className="text-sm space-y-2 mb-4">
        <div className="flex justify-between">
          <span>Bioskop</span>
          <span>{cinema || "-"}</span>
        </div>

        <div className="flex justify-between">
          <span>Jadwal</span>
          <span>{date} • {time}</span>
        </div>

        <div className="flex justify-between">
          <span>Kursi</span>
          <span>{seats.join(", ") || "-"}</span>
        </div>
      </div>

      <div className="border-t border-gray-700 my-3" />

      {/* PRICE */}
      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span>Harga Tiket ({seats.length}x)</span>
          <span>Rp {(seats.length * price).toLocaleString("id-ID")}</span>
        </div>

        <div className="flex justify-between">
          <span>Biaya Layanan</span>
          <span>Rp {fee.toLocaleString("id-ID")}</span>
        </div>
      </div>

      {/* TOTAL */}
      <div className="flex justify-between mt-4 font-semibold">
        <span>Total Bayar</span>
        <span className="text-yellow-400 text-lg">
          Rp {total.toLocaleString("id-ID")}
        </span>
      </div>

    </div>
  );
}