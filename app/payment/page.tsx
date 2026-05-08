'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";


import PaymentMethod from "@/components/ui/payment/PaymentMethod";
import PaymentSummary from "@/components/ui/payment/PaymentSummary";

export default function PaymentPage() {
  const router = useRouter();
  const params = useSearchParams();

  const methodFromURL = params.get("method");
  const [method, setMethod] = useState<string | null>(methodFromURL);

  useEffect(() => {
    if (methodFromURL) {
      setMethod(methodFromURL);
    }
  }, [methodFromURL]);

  const title = params.get("title");
  const cinema = params.get("cinema");
  const date = params.get("date");
  const time = params.get("time");
  const seats = params.get("seats")?.split(",") || [];

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

        <h2 className="text-xl font-semibold">
          Pembayaran
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT */}
        <div className="lg:col-span-2">
          <PaymentMethod selected={method} onSelect={setMethod} />
        </div>

        {/* RIGHT */}
        <div className="space-y-4">
          <PaymentSummary
            title={title}
            cinema={cinema}
            date={date}
            time={time}
            seats={seats}
          />

          <button
            disabled={!method}
            onClick={() =>
              router.push(`/payment/detail?method=${method}`)
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