'use client';

type Props = {
  promo: {
    code: string;
    title: string;
    discountPercent: number;
    maxDiscount: number;
  };
  onUse: (code: string) => void;
};

export default function PromoCard({ promo, onUse }: Props) {
  return (
    <div className="bg-[#0d1c32] p-5 rounded-xl border border-gray-700 hover:border-yellow-400 transition">

      {/* CODE */}
      <h2 className="text-yellow-400 font-bold mb-2">
        {promo.code}
      </h2>

      {/* DESKRIPSI (GANTI DARI TITLE) */}
      <p className="text-sm text-gray-300 mb-3">
        Nikmati diskon hingga {promo.discountPercent}% untuk setiap transaksi
      </p>

      {/* MAX (DETAIL KECIL) */}
      <p className="text-xs text-gray-500 mb-4">
        Maks. Rp {promo.maxDiscount?.toLocaleString("id-ID")}
      </p>

      {/* BUTTON */}
      <button
        onClick={() => onUse(promo.code)}
        className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:opacity-90"
      >
        Gunakan Promo
      </button>

    </div>
  );
}