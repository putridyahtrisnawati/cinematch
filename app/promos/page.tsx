'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PromoList from "@/components/ui/promo/PromoList";
import PromoHero from "@/components/ui/promo/PromoHero";

export default function PromoPage() {
  const router = useRouter();

  const [promos, setPromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔥 HANDLE USE PROMO
  const handleUsePromo = (code: string) => {
    router.push(`/?promoCode=${code}`);
  };

  // 🔥 FETCH PROMO DARI API
  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const res = await fetch("/api/promos");
        const data = await res.json();

        setPromos(data.promos || []);
      } catch (err) {
        console.error("Gagal ambil promo:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);

  return (
    <main className="min-h-screen bg-[#041329] text-white p-8">

      {/* HERO */}
      <PromoHero onUse={handleUsePromo} />

      {/* SECTION */}
      <h2 className="text-lg font-semibold mb-4">
        Promo Berjalan
      </h2>

      {/* SKELETON / LIST */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-40 bg-[#0d1c32] rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : promos.length === 0 ? (
        <p className="text-gray-400">
          Belum ada promo tersedia
        </p>
      ) : (
        <PromoList
          promos={promos}
          onUse={handleUsePromo}
        />
      )}

    </main>
  );
}