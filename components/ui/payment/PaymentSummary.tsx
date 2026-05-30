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
  summary,
}: Props) {
  const price = summary?.ticketPrice || 0;
  const fee = summary?.serviceFee || 0;
  const discount = summary?.discount || 0;
  const ticketCount = summary?.ticketCount || seats.length;

  const subtotal =
    summary?.subtotal ?? price * ticketCount;

  const total =
    summary?.total ?? subtotal + fee - discount;

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "-";

    const parsedDate = new Date(dateStr);

    if (Number.isNaN(parsedDate.getTime())) {
      return dateStr;
    }

    return parsedDate.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatRupiah = (value: number) => {
    return `Rp ${(value || 0).toLocaleString("id-ID")}`;
  };

  return (
    <div className="bg-[#0b1a2d] p-6 rounded-2xl w-full max-w-sm border border-white/5 shadow-xl">
      <h3 className="mb-4 font-semibold">
        Ringkasan Pesanan
      </h3>

      <div className="flex gap-3 mb-4">
        <img
          src={movie?.image || "/placeholder.png"}
          alt={movie?.title || title || "Poster film"}
          className="w-16 h-20 object-cover rounded-lg bg-[#14243a] shrink-0"
        />

        <div className="min-w-0">
          <p className="font-semibold line-clamp-2">
            {title || movie?.title || "Nama Film"}
          </p>

          <p className="text-xs text-yellow-400 mt-1 line-clamp-1">
            {movie?.genre || "Genre"} • ⭐ {movie?.rating || "-"}
          </p>
        </div>
      </div>

      <div className="text-sm space-y-2 mb-4">
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">Bioskop</span>
          <span className="text-right line-clamp-1">
            {cinema || "-"}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-gray-400">Jadwal</span>
          <span className="text-right">
            {formatDate(date)} • {time || "-"}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-gray-400">Kursi</span>
          <span className="text-right line-clamp-2">
            {seats.join(", ") || "-"}
          </span>
        </div>
      </div>

      <div className="border-t border-gray-700 my-3" />

      <div className="text-sm space-y-2">
        <div className="flex justify-between gap-4">
          <span className="text-gray-400">
            Harga Tiket ({ticketCount}x)
          </span>

          <span>
            {formatRupiah(price * ticketCount)}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-gray-400">
            Biaya Layanan
          </span>

          <span>
            {formatRupiah(fee)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between gap-4 text-green-400">
            <span>Diskon</span>
            <span>-{formatRupiah(discount)}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-700 my-3" />

      <div className="flex justify-between gap-4 font-semibold">
        <span>Total Bayar</span>

        <span className="text-yellow-400 text-lg">
          {formatRupiah(total)}
        </span>
      </div>

      {discount > 0 && (
        <div className="mt-3 rounded-xl bg-green-500/10 border border-green-500/20 px-3 py-2">
          <p className="text-green-400 text-xs">
            Kamu hemat {formatRupiah(discount)} 🎉
          </p>
        </div>
      )}
    </div>
  );
}