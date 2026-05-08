'use client'

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentDetail() {
  const params = useSearchParams();
  const router = useRouter();

  const method = params.get("method");

  const isEwallet = method === "gopay" || method === "ovo";

  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [vaNumber, setVaNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [failedType, setFailedType] = useState<"user" | "system" | null>(null);

  // ⏳ countdown (VA only)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ⛔ AUTO FAILED SAAT TIMER HABIS (KHUSUS VA)
  useEffect(() => {
    if (timeLeft === 0 && !isEwallet && !showSuccess && !showFailed) {
      setShowFailed(true);
      setFailedType("system");
      setShowFailed(true);

      setTimeout(() => {
        router.push("/tickets");
      }, 2000);
    }
  }, [timeLeft, isEwallet, showSuccess, showFailed, router]);

  // 🔢 generate VA random
  useEffect(() => {
    const randomVA = "8808" + Math.floor(Math.random() * 1_000_000_000);
    setVaNumber(randomVA);
  }, []);

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  // ✅ BAYAR
  const handlePay = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);

      setTimeout(() => {
        router.push("/tickets");
      }, 2000);

    }, 1000);
  };

  const handleCancel = () => {
    setFailedType("user");
    setShowFailed(true);

    setTimeout(() => {
      router.push("/tickets");
    }, 2000);
  };
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
          Selesaikan Pembayaran
        </h2>
      </div>

      {/* TIMER */}
      {!isEwallet && (
        <p className="text-yellow-400 text-2xl mb-6 font-bold text-center">
          {formatTime()}
        </p>
      )}

      {/* CARD */}
      <div className="bg-[#0d1c32] p-6 rounded-xl max-w-md mx-auto">

        <p className="text-sm text-gray-400 mb-1">
          Metode Pembayaran
        </p>
        <p className="mb-4 font-semibold capitalize">
          {method || "-"}
        </p>

        {/* E-WALLET */}
        {isEwallet ? (
          <>
            <p className="text-sm text-gray-400 mb-2">
              Instruksi Pembayaran
            </p>

            <ul className="text-sm text-gray-300 space-y-2 mb-6">
              <li>1. Buka aplikasi {method?.toUpperCase()}</li>
              <li>2. Pilih menu bayar</li>
              <li>3. Konfirmasi pembayaran</li>
            </ul>

            <p className="text-sm text-gray-400">
              Total Bayar
            </p>
            <p className="text-yellow-400 text-lg font-bold mb-6">
              Rp 104.000
            </p>
          </>
        ) : (
          <>
            {/* BANK VA */}
            <p className="text-sm text-gray-400">
              Nomor Virtual Account
            </p>

            <p className="text-xl font-bold mb-4 tracking-widest">
              {vaNumber}
            </p>

            <p className="text-sm text-gray-400">
              Total Bayar
            </p>
            <p className="text-yellow-400 text-lg font-bold mb-6">
              Rp 104.000
            </p>
          </>
        )}

        {/* BUTTONS */}
        <div className="flex gap-3">

          {/* BATAL */}
          <button
            onClick={handleCancel}
            disabled={isProcessing}
            className="w-1/2 bg-red-500 text-white py-3 rounded-xl font-bold hover:opacity-90"
          >
            Batal
          </button>

          {/* BAYAR */}
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-1/2 bg-yellow-400 text-black py-3 rounded-xl font-bold disabled:opacity-50"
          >
            {isProcessing ? "Memproses..." : "Saya Sudah Bayar"}
          </button>

        </div>

      </div>

      {/* POPUP SUCCESS */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

          <div className="bg-[#0d1c32] px-6 py-5 rounded-xl text-center shadow-lg">

            <h1 className="text-lg font-bold text-yellow-400 mb-2">
              Pembayaran Berhasil 🎉
            </h1>

            <p className="text-sm text-gray-300">
              Tiket kamu sudah berhasil dipesan
            </p>

          </div>

        </div>
      )}

      {/* POPUP FAILED */}
      {showFailed && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

          <div className="bg-[#0d1c32] px-6 py-5 rounded-xl text-center shadow-lg">

            <h1 className="text-lg font-bold text-red-400 mb-2">
              Pembayaran Gagal ❌
            </h1>

            <p className="text-sm text-gray-300">
              {failedType === "user"
                ? "Transaksi dibatalkan oleh pengguna"
                : "Transaksi dibatalkan oleh sistem"}
            </p>

          </div>

        </div>
      )}

    </main>
  );
}