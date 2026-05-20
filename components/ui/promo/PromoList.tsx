'use client';

import PromoCard from "./PromoCard";

type Props = {
  promos: any[];
  onUse: (code: string) => void;
};

export default function PromoList({ promos, onUse }: Props) {
  if (promos.length === 0) {
    return <p className="text-center text-gray-400">Belum ada promo</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {promos.map((promo, i) => (
        <PromoCard key={i} promo={promo} onUse={onUse} />
      ))}
    </div>
  );
}