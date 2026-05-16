'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

import PaymentMethod from "@/components/ui/payment/PaymentMethod";
import PaymentSummary from "@/components/ui/payment/PaymentSummary";

export default function PaymentPage() {
  const router = useRouter();
  const params = useSearchParams();

  // 🔹 ambil params
  const methodFromURL = params.get("method");
  const title = params.get("title");
  const cinema = params.get("cinema");
  const date = params.get("date");
  const time = params.get("time");
  const seats = params.get("seats")?.split(",") || [];
  const promoCode = params.get("promoCode"); // 🔥

  // 🔹 state
  const [method, setMethod] = useState<string | null>(methodFromURL);
  const [movie, setMovie] = useState<any>(null);
  const [summary, setSummary] = useState<any>(null);

  // 🔥 promo state
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  // 🔹 sync method
  useEffect(() => {
    if (methodFromURL) setMethod(methodFromURL);
  }, [methodFromURL]);

  // 🔹 fetch movie
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch("/api/movies");
        const data = await res.json();

        const selectedMovie = data.find(
          (m: any) => m.title.toLowerCase() === title?.toLowerCase()
        );

        setMovie(selectedMovie);
      } catch (err) {
        console.error("Gagal ambil movie:", err);
      }
    };

    if (title) fetchMovie();
  }, [title]);

  // 🔹 fetch summary
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/bookings/summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId: movie?._id?.toString(),
            date,
            seats,
          }),
        });

        const data = await res.json();
        console.log("SUMMARY:", data);

        setSummary(data);
      } catch (err) {
        console.error("Gagal ambil summary:", err);
      }
    };

    if (movie?._id && date && seats.length > 0) {
      fetchSummary();
    }
  }, [movie?._id, date, seats.join(",")]);

  // 🔥 APPLY PROMO
  useEffect(() => {
    const applyPromo = async () => {
      if (!promoCode || !summary?.subtotal) return;

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
        console.log("PROMO:", data);

        setDiscount(data.discountAmount);

        // subtotal - diskon + fee
        setFinalTotal(data.totalAfterDiscount + summary.serviceFee);

      } catch (err) {
        console.error("Promo error:", err);
      }
    };

    applyPromo();
  }, [promoCode, summary]);

  return (
    <main className="min-h-screen bg-[#041329] text-white p-8">

      {/* HEADER */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-[#0d1c32] hover:bg-yellow-400 hover:text-black"
        >
          ←
        </button>

        <h2 className="text-xl font-semibold">Pembayaran</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT */}
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

        {/* RIGHT */}
        <div className="space-y-4">
          <PaymentSummary
            title={title}
            cinema={cinema}
            date={date}
            time={time}
            seats={seats}
            movie={movie}
            summary={{
              ...summary,
              discount: discount,
              total: finalTotal || summary?.total,
            }}
          />

          <button
            disabled={!method}
            onClick={() =>
              router.push(
                `/payment/detail?method=${method}` +
                `&movieId=${movie?._id}` +
                `&title=${title}` +
                `&cinema=${cinema}` +
                `&date=${date}` +
                `&time=${time}` +
                `&seats=${seats.join(",")}` +
                `&promoCode=${promoCode || ""}`
              )
            }
            className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold disabled:opacity-50"
          >
            Bayar Sekarang
          </button>
        </div>

      </div>

    </main>
  );
}