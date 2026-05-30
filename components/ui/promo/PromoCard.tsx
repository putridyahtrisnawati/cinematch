"use client";

type Props = {
  promo: {
    code: string;
    title?: string;
    discountPercent: number;
    maxDiscount: number;
  };
  onUse: (code: string) => void;
};

export default function PromoCard({ promo, onUse }: Props) {
  const maxDiscount = promo.maxDiscount || 0;
  const discountPercent = promo.discountPercent || 0;

  return (
    <div className="bg-[#0d1c32] p-5 rounded-xl border border-gray-700 hover:border-yellow-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-400/10 transition-all duration-300">
      <h2 className="text-yellow-400 font-bold mb-2 line-clamp-1">
        {promo.code}
      </h2>

      <p className="text-sm text-gray-300 mb-3 leading-relaxed">
        Nikmati diskon hingga {discountPercent}% untuk setiap transaksi
      </p>

      <p className="text-xs text-gray-500 mb-4">
        Maks. Rp {maxDiscount.toLocaleString("id-ID")}
      </p>

      <button
        type="button"
        onClick={() => onUse(promo.code)}
        disabled={!promo.code}
        className="w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
      >
        Gunakan Promo
      </button>
    </div>
  );
}