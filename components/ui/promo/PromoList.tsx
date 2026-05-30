"use client";

import PromoCard from "./PromoCard";

type Props = {
  promos: any[];
  onUse: (code: string) => void;
};

export default function PromoList({ promos, onUse }: Props) {
  if (!promos || promos.length === 0) {
    return (
      <div className="bg-[#0d1c32] border border-white/5 rounded-xl p-8 text-center">
        <p className="text-gray-400">
          Belum ada promo tersedia.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {promos.map((promo) => (
        <PromoCard
          key={promo._id || promo.code}
          promo={promo}
          onUse={onUse}
        />
      ))}
    </div>
  );
}