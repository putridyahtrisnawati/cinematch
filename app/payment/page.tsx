"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

import PaymentMethod from "@/components/ui/payment/PaymentMethod";
import PaymentSummary from "@/components/ui/payment/PaymentSummary";

export default function PaymentPage() {
  const router = useRouter();
  const params = useSearchParams();

  const methodFromURL = params.get("method");
  const title = params.get("title");
  const cinema = params.get("cinema");
  const date = params.get("date");
  const time = params.get("time");
  const promoCode = params.get("promoCode");

  const seats = useMemo(() => {
    return (params.get("seats") || "")
      .split(",")
      .map((seat) => seat.trim())
      .filter(Boolean);
  }, [params]);

  const [method, setMethod] = useState<string | null>(methodFromURL);
  const [movie, setMovie] = useState<any>(null);
  const [summary, setSummary] = useState<any>(null);

  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const [loadingMovie, setLoadingMovie] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (methodFromURL) {
      setMethod(methodFromURL);
    }
  }, [methodFromURL]);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!title) {
        setLoadingMovie(false);
        return;
      }

      try {
        setLoadingMovie(true);
        setErrorMessage("");

        const res = await fetch("/api/movies");

        if (!res.ok) {
          throw new Error("Gagal mengambil data movie");
        }

        const data = await res.json();

        const selectedMovie = Array.isArray(data)
          ? data.find(
              (m: any) =>
                m.title?.toLowerCase() === title?.toLowerCase()
            )
          : null;

        setMovie(selectedMovie || null);
      } catch (err) {
        console.error("Gagal ambil movie:", err);
        setMovie(null);
        setErrorMessage("Gagal mengambil data film.");
      } finally {
        setLoadingMovie(false);
      }
    };

    fetchMovie();
  }, [title]);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!movie?._id || !date || seats.length === 0) {
        setLoadingSummary(false);
        return;
      }

      try {
        setLoadingSummary(true);
        setErrorMessage("");

        const res = await fetch("/api/bookings/summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId: movie._id.toString(),
            date,
            seats,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Gagal mengambil ringkasan pembayaran");
        }

        setSummary(data);
      } catch (err) {
        console.error("Gagal ambil summary:", err);
        setSummary(null);
        setErrorMessage("Gagal mengambil ringkasan pembayaran.");
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchSummary();
  }, [movie?._id, date, seats.join(",")]);

  useEffect(() => {
    const applyPromo = async () => {
      if (!promoCode || !summary?.subtotal) {
        setDiscount(0);
        setFinalTotal(summary?.total || 0);
        return;
      }

      try {
        const res = await fetch("/api/promos/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            promoCode,
            subtotal: summary.subtotal,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setDiscount(0);
          setFinalTotal(summary.total || 0);
          return;
        }

        setDiscount(data.discountAmount || 0);
        setFinalTotal(
          (data.totalAfterDiscount || summary.subtotal) +
            (summary.serviceFee || 0)
        );
      } catch (err) {
        console.error("Promo error:", err);
        setDiscount(0);
        setFinalTotal(summary?.total || 0);
      }
    };

    applyPromo();
  }, [promoCode, summary]);

  const handleGoToDetail = () => {
    if (!method || !movie?._id) return;

    const query = new URLSearchParams({
      method,
      movieId: movie._id,
      title: title || "",
      cinema: cinema || "",
      date: date || "",
      time: time || "",
      seats: seats.join(","),
      promoCode: promoCode || "",
    });

    router.push(`/payment/detail?${query.toString()}`);
  };

  const isPageLoading = loadingMovie || loadingSummary;
  const isScheduleValid = title && cinema && date && time && seats.length > 0;

  if (!isScheduleValid) {
    return (
      <main className="min-h-screen bg-[#041329] text-white px-8 pt-24 pb-12">
        <div className="max-w-xl mx-auto bg-[#0b1a2d] border border-white/5 rounded-2xl p-10 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-5">
            <span className="material-symbols-outlined text-3xl">
              receipt_long
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-2">
            Data Pembayaran Tidak Lengkap
          </h2>

          <p className="text-gray-400 mb-6">
            Silakan pilih film, jadwal, dan kursi terlebih dahulu sebelum
            melanjutkan pembayaran.
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
    <main className="min-h-screen bg-[#041329] text-white px-8 pt-24 pb-12">
      <div className="mb-6 flex items-center gap-3">
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
            LANJUTKAN KE
          </p>
          <h2 className="text-xl font-semibold">
            Pembayaran
          </h2>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl px-4 py-3 text-sm">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PaymentMethod
            selected={method}
            onSelect={setMethod}
            title={title}
            cinema={cinema}
            date={date}
            time={time}
            seats={seats}
          />
        </div>

        <div className="space-y-4 lg:sticky lg:top-24 h-fit">
          {isPageLoading ? (
            <div className="bg-[#0b1a2d] border border-white/5 rounded-2xl p-6 shadow-xl">
              <div className="h-44 bg-white/5 rounded-xl animate-pulse mb-4" />
              <div className="h-5 w-40 bg-white/10 rounded animate-pulse mb-3" />
              <div className="h-4 w-56 bg-white/5 rounded animate-pulse mb-6" />
              <div className="space-y-3">
                <div className="h-4 bg-white/5 rounded animate-pulse" />
                <div className="h-4 bg-white/5 rounded animate-pulse" />
                <div className="h-6 bg-white/10 rounded animate-pulse" />
              </div>
            </div>
          ) : (
            <PaymentSummary
              title={title}
              cinema={cinema}
              date={date}
              time={time}
              seats={seats}
              movie={movie}
              summary={{
                ...summary,
                discount,
                total: finalTotal || summary?.total,
              }}
            />
          )}

          <button
            type="button"
            disabled={!method || isPageLoading}
            onClick={handleGoToDetail}
            className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPageLoading ? "Memuat..." : "Bayar Sekarang"}
          </button>

          {!method && !isPageLoading && (
            <p className="text-xs text-gray-500 text-center">
              Pilih metode pembayaran terlebih dahulu.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}