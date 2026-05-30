"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PromoList from "@/components/ui/promo/PromoList";
import PromoHero from "@/components/ui/promo/PromoHero";

export default function PromoPage() {
  const router = useRouter();

  const [promos, setPromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsePromo = (code?: string) => {
    if (!code) {
      router.push("/");
      return;
    }

    const query = new URLSearchParams({
      promoCode: code,
    });

    router.push(`/?${query.toString()}`);
  };

  const fetchPromos = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await fetch("/api/promos");

      if (!res.ok) {
        throw new Error("Gagal mengambil data promo");
      }

      const data = await res.json();

      setPromos(Array.isArray(data.promos) ? data.promos : []);
    } catch (err) {
      console.error("Gagal ambil promo:", err);
      setPromos([]);
      setErrorMessage("Gagal memuat promo. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  return (
    <main className="min-h-screen bg-[#041329] text-white px-8 pt-28 pb-16">
      <div className="max-w-7xl mx-auto">
        <PromoHero onUse={() => handleUsePromo(promos[0]?.code)} />

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
          <div>
            <h2 className="text-lg font-semibold">
              Promo Berjalan
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              Pilih promo yang tersedia untuk mendapatkan potongan harga.
            </p>
          </div>

          {!loading && promos.length > 0 && (
            <p className="text-xs text-gray-500">
              {promos.length} promo tersedia
            </p>
          )}
        </div>

        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-300 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm">
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={fetchPromos}
              className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-600 active:scale-95 transition-all duration-200"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-[#0d1c32] border border-white/5 rounded-xl p-5 animate-pulse"
              >
                <div className="h-5 w-28 bg-white/10 rounded mb-4" />

                <div className="h-4 w-full bg-white/5 rounded mb-3" />
                <div className="h-4 w-2/3 bg-white/5 rounded mb-5" />

                <div className="h-3 w-32 bg-white/5 rounded mb-6" />

                <div className="h-10 w-full bg-white/10 rounded-lg" />
              </div>
            ))}
          </div>
        ) : promos.length === 0 && !errorMessage ? (
          <div className="bg-[#0d1c32] border border-white/5 rounded-2xl p-12 text-center shadow-xl">
            <div className="w-16 h-16 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-5">
              <span className="material-symbols-outlined text-3xl">
                local_offer
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2">
              Belum Ada Promo
            </h3>

            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Saat ini belum ada promo yang tersedia. Cek kembali nanti untuk
              mendapatkan penawaran menarik dari CineMatch.
            </p>
          </div>
        ) : (
          <PromoList
            promos={promos}
            onUse={handleUsePromo}
          />
        )}
      </div>
    </main>
  );
}