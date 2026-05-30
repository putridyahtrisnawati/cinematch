"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function PromoPage() {
  const router = useRouter();
  const params = useSearchParams();

  const title = params.get("title");
  const cinema = params.get("cinema");
  const date = params.get("date");
  const time = params.get("time");
  const seats = params.get("seats");
  const method = params.get("method");

  const [promos, setPromos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const isDataValid = useMemo(() => {
    return title && cinema && date && time && seats;
  }, [title, cinema, date, time, seats]);

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const res = await fetch("/api/promos");

        if (!res.ok) {
          throw new Error("Gagal mengambil promo");
        }

        const data = await res.json();

        setPromos(Array.isArray(data.promos) ? data.promos : []);
      } catch (error) {
        console.error("Fetch promo error:", error);
        setPromos([]);
        setErrorMessage("Gagal memuat promo. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    };

    fetchPromos();
  }, []);

  const goToPayment = (promoCode?: string | null) => {
    const query = new URLSearchParams({
      title: title || "",
      cinema: cinema || "",
      date: date || "",
      time: time || "",
      seats: seats || "",
      method: method || "",
    });

    if (promoCode) {
      query.set("promoCode", promoCode);
    }

    router.push(`/payment?${query.toString()}`);
  };

  const handleApply = () => {
    goToPayment(selected);
  };

  const formatRupiah = (value: number) => {
    return `Rp ${(value || 0).toLocaleString("id-ID")}`;
  };

  if (!isDataValid) {
    return (
      <main className="min-h-screen bg-[#041329] text-white px-6 pt-24 pb-24">
        <div className="max-w-xl mx-auto bg-[#0d1c32] border border-white/5 rounded-2xl p-10 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-5">
            <span className="material-symbols-outlined text-3xl">
              confirmation_number
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-2">
            Data Promo Tidak Lengkap
          </h2>

          <p className="text-gray-400 mb-6">
            Silakan pilih film, jadwal, kursi, dan metode pembayaran terlebih dahulu.
          </p>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 active:scale-95 transition-all duration-200"
          >
            Kembali ke Beranda
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#041329] text-white px-6 pt-24 pb-28">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Kembali"
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0d1c32] border border-white/10 text-yellow-400 hover:bg-yellow-400 hover:text-black active:scale-95 transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[20px]">
              arrow_back_ios_new
            </span>
          </button>

          <div>
            <p className="text-xs text-gray-400">
              PILIH VOUCHER
            </p>
            <h2 className="text-xl font-semibold">
              Voucher Promo
            </h2>
          </div>
        </div>

        <div className="bg-[#0d1c32] border border-white/5 rounded-2xl p-4 mb-5">
          <p className="text-sm text-gray-400">
            Promo akan diterapkan ke ringkasan pembayaran Anda.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl px-4 py-3 text-sm">
            {errorMessage}
          </div>
        )}

        <div className="space-y-3">
          {loading ? (
            <>
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-[#0d1c32] border border-white/5 rounded-xl p-4 flex justify-between items-center"
                >
                  <div className="space-y-3">
                    <div className="h-4 w-40 bg-white/10 rounded animate-pulse" />
                    <div className="h-3 w-28 bg-white/5 rounded animate-pulse" />
                  </div>

                  <div className="w-5 h-5 rounded-full bg-white/10 animate-pulse" />
                </div>
              ))}
            </>
          ) : promos.length === 0 ? (
            <div className="bg-[#0d1c32] border border-white/5 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-5">
                <span className="material-symbols-outlined text-3xl">
                  local_offer
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">
                Tidak Ada Promo
              </h3>

              <p className="text-gray-400 text-sm">
                Saat ini belum ada promo yang tersedia.
              </p>
            </div>
          ) : (
            promos.map((item) => {
              const isSelected = selected === item.code;

              return (
                <button
                  key={item._id || item.code}
                  type="button"
                  onClick={() => setSelected(isSelected ? null : item.code)}
                  className={`w-full relative p-4 rounded-xl flex justify-between items-center text-left transition-all duration-200 active:scale-[0.99] ${
                    isSelected
                      ? "border border-yellow-400 bg-[#0d1c32] shadow-lg shadow-yellow-400/10"
                      : "bg-[#0d1c32] border border-white/5 hover:border-yellow-400/40"
                  }`}
                >
                  <span className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] px-2 py-0.5 rounded font-semibold">
                    {item.discountPercent || 0}% OFF
                  </span>

                  <div className="pr-20">
                    <p className="font-semibold line-clamp-1">
                      {item.title || item.code}
                    </p>

                    <p className="text-[11px] text-gray-400 mt-1">
                      Kode:{" "}
                      <span className="text-yellow-400 font-semibold">
                        {item.code}
                      </span>
                    </p>

                    <p className="text-[11px] text-gray-500 mt-1">
                      Maks diskon {formatRupiah(item.maxDiscount)}
                    </p>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                      isSelected
                        ? "border-yellow-400"
                        : "border-gray-500"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#041329]/95 backdrop-blur-xl border-t border-white/10">
        <div className="max-w-3xl mx-auto grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => goToPayment(null)}
            className="w-full bg-[#0d1c32] border border-white/10 text-gray-300 py-4 rounded-xl font-semibold hover:bg-[#14243a] active:scale-95 transition-all duration-200"
          >
            Lewati
          </button>

          <button
            type="button"
            onClick={handleApply}
            disabled={loading}
            className="w-full bg-yellow-400 text-black py-4 rounded-xl font-bold hover:bg-yellow-300 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {selected ? "Gunakan Promo" : "OK"}
          </button>
        </div>
      </div>
    </main>
  );
}