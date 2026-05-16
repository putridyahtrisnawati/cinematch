type Props = {
  title?: string | null;
  cinema?: string | null;
  date?: string | null;
  time?: string | null;
  seats?: string[];
  movie?: any;
  summary?: any;
};

export default function PaymentSummary({
  title,
  cinema,
  date,
  time,
  seats = [],
  movie,
  summary
}: Props) {

  const price = summary?.ticketPrice || 0;
  const fee = summary?.serviceFee || 0;
  const total = summary?.total || 0;
  const discount = summary?.discount || 0;

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "-";

    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-[#0b1a2d] p-6 rounded-2xl w-full max-w-sm">

      <h3 className="mb-4 font-semibold">
        Ringkasan Pesanan
      </h3>

      {/* MOVIE */}
      <div className="flex gap-3 mb-4">
        <img
          src={movie?.image || "/placeholder.png"}
          alt={movie?.title}
          className="w-16 h-20 object-cover rounded"
        />

        <div>
          <p className="font-semibold">
            {title || "Nama Film"}
          </p>
          <p className="text-xs text-yellow-400">
            {movie?.genre} • ⭐ {movie?.rating}
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
          <span>{formatDate(date)} • {time}</span>
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
          <span>Harga Tiket ({summary?.ticketCount || seats.length}x)</span>
          <span>Rp {(seats.length * price).toLocaleString("id-ID")}</span>
        </div>

        <div className="flex justify-between">
          <span>Biaya Layanan</span>
          <span>Rp {fee.toLocaleString("id-ID")}</span>
        </div>

        {/* 🔥 DISKON */}
        {discount > 0 && (
          <div className="flex justify-between text-green-400">
            <span>Diskon</span>
            <span>-Rp {discount.toLocaleString("id-ID")}</span>
          </div>
        )}
      </div>

      {/* TOTAL */}
      <div className="flex justify-between mt-4 font-semibold">
        <span>Total Bayar</span>
        <span className="text-yellow-400 text-lg">
          Rp {total.toLocaleString("id-ID")}
        </span>
      </div>

      {/* BONUS */}
      {discount > 0 && (
        <p className="text-green-400 text-xs mt-2">
          Kamu hemat Rp {discount.toLocaleString("id-ID")} 🎉
        </p>
      )}

    </div>
  );
}