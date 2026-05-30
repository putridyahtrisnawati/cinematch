"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

type PopupType = "success" | "failed" | "confirm-cancel";

type Popup = {
  open: boolean;
  type: PopupType;
  title: string;
  message: string;
};

export default function PaymentDetail() {
  const params = useSearchParams();
  const router = useRouter();

  const movieId = params.get("movieId");
  const title = params.get("title");
  const cinema = params.get("cinema");
  const date = params.get("date");
  const time = params.get("time");
  const promoCode = params.get("promoCode");
  const method = params.get("method");

  const seats = useMemo(() => {
    return (params.get("seats") || "")
      .split(",")
      .map((seat) => seat.trim())
      .filter(Boolean);
  }, [params]);

  const isEwallet = method === "gopay" || method === "ovo";

  const [summary, setSummary] = useState<any>(null);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [vaNumber, setVaNumber] = useState("");

  const [loadingSummary, setLoadingSummary] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [popup, setPopup] = useState<Popup>({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  const showPopup = (type: PopupType, title: string, message: string) => {
    setPopup({
      open: true,
      type,
      title,
      message,
    });
  };

  const closePopup = () => {
    setPopup({
      open: false,
      type: "success",
      title: "",
      message: "",
    });
  };

  useEffect(() => {
    const randomVA = "8808" + Math.floor(100000000 + Math.random() * 900000000);
    setVaNumber(randomVA);
  }, []);

  useEffect(() => {
    if (isFinished) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isFinished]);

  useEffect(() => {
    if (timeLeft !== 0 || isFinished) return;

    const createExpired = async () => {
      try {
        setIsFinished(true);

        await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId,
            movieTitle: title,
            cinema,
            date,
            time,
            seats,
            promoCode,
            method,
            status: "expired",
          }),
        });

        showPopup(
          "failed",
          "Pembayaran Kedaluwarsa",
          isEwallet
            ? "Waktu pembayaran QRIS sudah habis. Anda akan diarahkan ke riwayat tiket."
            : "Waktu pembayaran Virtual Account sudah habis. Anda akan diarahkan ke riwayat tiket."
        );

        setTimeout(() => {
          router.replace("/tickets");
        }, 2200);
      } catch (err) {
        console.error("Expired error:", err);
      }
    };

    createExpired();
  }, [
    timeLeft,
    isFinished,
    isEwallet,
    movieId,
    title,
    cinema,
    date,
    time,
    seats,
    promoCode,
    method,
    router,
  ]);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!movieId || !date || seats.length === 0) {
        setLoadingSummary(false);
        return;
      }

      try {
        setLoadingSummary(true);

        const res = await fetch("/api/bookings/summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            movieId,
            date,
            seats,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Gagal mengambil summary");
        }

        setSummary(data);
        setFinalTotal(data.total || 0);
      } catch (err) {
        console.error("Gagal ambil summary:", err);
        setSummary(null);
      } finally {
        setLoadingSummary(false);
      }
    };

    fetchSummary();
  }, [movieId, date, seats.join(",")]);

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
          setFinalTotal(summary?.total || 0);
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

  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

  const handlePay = async () => {
    if (isProcessing || isFinished) return;

    try {
      setIsProcessing(true);

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId,
          movieTitle: title,
          cinema,
          date,
          time,
          seats,
          promoCode,
          method,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Booking gagal:", data.message);

        showPopup(
          "failed",
          "Pembayaran Gagal",
          data.message || "Transaksi gagal diproses. Silakan coba lagi."
        );
        return;
      }

      setIsFinished(true);

      showPopup(
        "success",
        "Pembayaran Berhasil",
        "Tiket kamu sudah berhasil dipesan. Mengarahkan ke riwayat tiket..."
      );

      setTimeout(() => {
        router.replace("/tickets");
      }, 2200);
    } catch (err) {
      console.error("Error:", err);

      showPopup(
        "failed",
        "Server Error",
        "Terjadi kesalahan saat memproses pembayaran."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const requestCancel = () => {
    if (isProcessing || isFinished) return;

    showPopup(
      "confirm-cancel",
      "Batalkan Pembayaran?",
      "Transaksi akan dibatalkan dan tiket tidak akan aktif."
    );
  };

  const handleCancel = async () => {
    if (isProcessing || isFinished) return;

    try {
      setIsProcessing(true);
      closePopup();

      await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId,
          movieTitle: title,
          cinema,
          date,
          time,
          seats,
          promoCode,
          method,
          status: "dibatalkan",
        }),
      });

      setIsFinished(true);

      showPopup(
        "failed",
        "Pembayaran Dibatalkan",
        "Transaksi dibatalkan oleh pengguna. Mengarahkan ke riwayat tiket..."
      );

      setTimeout(() => {
        router.replace("/tickets");
      }, 2200);
    } catch (err) {
      console.error("Cancel error:", err);

      showPopup(
        "failed",
        "Gagal Membatalkan",
        "Terjadi kesalahan saat membatalkan pembayaran."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const isDataValid = movieId && title && cinema && date && time && seats.length > 0 && method;

  if (!isDataValid) {
    return (
      <main className="min-h-screen bg-[#041329] text-white px-8 pt-24 pb-12">
        <div className="max-w-xl mx-auto bg-[#0d1c32] border border-white/5 rounded-2xl p-10 text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-5">
            <span className="material-symbols-outlined text-3xl">
              receipt_long
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-2">
            Data Pembayaran Tidak Lengkap
          </h2>

          <p className="text-gray-400 mb-6">
            Silakan pilih film, jadwal, kursi, dan metode pembayaran terlebih dahulu.
          </p>

          <button
            type="button"
            onClick={() => router.replace("/")}
            className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 active:scale-95 transition-all duration-200"
          >
            Kembali ke Beranda
          </button>
        </div>
      </main>
    );
  }

  const totalPayment = finalTotal || summary?.total || 0;

  const qrisValue = JSON.stringify({
    paymentType: "QRIS",
    method,
    movieId,
    title,
    cinema,
    date,
    time,
    seats,
    promoCode,
    total: totalPayment,
  });

  return (
    <main className="min-h-screen bg-[#041329] text-white px-8 pt-24 pb-12">
      <div className="mb-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Kembali"
          disabled={isProcessing || isFinished}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0d1c32] border border-white/10 text-yellow-400 hover:bg-yellow-400 hover:text-black active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="material-symbols-outlined text-[20px]">
            arrow_back_ios_new
          </span>
        </button>

        <div>
          <p className="text-xs text-gray-400">
            SELESAIKAN
          </p>

          <h2 className="text-xl font-semibold">
            Pembayaran
          </h2>
        </div>
      </div>

      <div className="max-w-md mx-auto mb-6 bg-yellow-400/10 border border-yellow-400/20 rounded-2xl py-4 text-center">
        <p className="text-xs text-gray-400 mb-1">
          {isEwallet
            ? "Sisa waktu pembayaran QRIS"
            : "Sisa waktu pembayaran VA"}
        </p>

        <p
          className={`text-3xl font-bold ${timeLeft <= 60 ? "text-red-400" : "text-yellow-400"
            }`}
        >
          {formatTime()}
        </p>
      </div>

      <div className="bg-[#0d1c32] p-6 rounded-2xl max-w-md mx-auto border border-white/5 shadow-xl">
        <p className="text-sm text-gray-400 mb-1">
          Metode Pembayaran
        </p>

        <p className="mb-5 font-semibold capitalize">
          {method || "-"}
        </p>

        {isEwallet ? (
          <>
            <p className="text-sm text-gray-400 mb-2">
              Scan QRIS Pembayaran
            </p>

            <div className="bg-white rounded-2xl p-4 mb-4 flex justify-center">
              <QRCodeCanvas
                value={qrisValue}
                size={190}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
              />
            </div>

            <div className="text-center mb-5">
              <p className="text-sm font-semibold uppercase">
                {method}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                Scan QRIS menggunakan aplikasi {method?.toUpperCase()}
              </p>
            </div>

            <ul className="text-sm text-gray-300 space-y-2 mb-6 bg-[#14243a] rounded-xl p-4">
              <li>1. Buka aplikasi {method?.toUpperCase()}</li>
              <li>2. Pilih menu scan QRIS</li>
              <li>3. Scan kode QR di atas</li>
              <li>4. Konfirmasi pembayaran sesuai nominal</li>
            </ul>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-400">
              Nomor Virtual Account
            </p>

            <div className="bg-[#14243a] rounded-xl px-4 py-3 mb-5 mt-2 border border-white/5">
              <p className="text-xl font-bold tracking-widest">
                {vaNumber}
              </p>
            </div>
          </>
        )}

        <div className="bg-[#14243a] rounded-xl p-4 mb-6 border border-white/5">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Total Bayar</span>
            {promoCode && discount > 0 && (
              <span className="text-green-400">
                Promo {promoCode}
              </span>
            )}
          </div>

          {loadingSummary ? (
            <div className="h-7 w-40 bg-white/10 rounded-md animate-pulse" />
          ) : (
            <p className="text-yellow-400 text-2xl font-bold">
              Rp {totalPayment.toLocaleString("id-ID")}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={requestCancel}
            disabled={isProcessing || isFinished}
            className="w-1/2 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Batal
          </button>

          <button
            type="button"
            onClick={handlePay}
            disabled={isProcessing || isFinished || loadingSummary}
            className="w-1/2 bg-yellow-400 text-black py-3 rounded-xl font-bold hover:bg-yellow-300 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Proses
              </span>
            ) : (
              "Saya Sudah Bayar"
            )}
          </button>
        </div>
      </div>

      {popup.open && (
        <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-md bg-[#0d1c32] border border-white/10 rounded-3xl p-7 shadow-2xl animate-[popup_.25s_ease]">
            <div
              className={`w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center text-3xl font-bold ${popup.type === "success"
                ? "bg-green-500/20 text-green-400"
                : popup.type === "confirm-cancel"
                  ? "bg-yellow-400/20 text-yellow-400"
                  : "bg-red-500/20 text-red-400"
                }`}
            >
              {popup.type === "success"
                ? "✓"
                : popup.type === "confirm-cancel"
                  ? "?"
                  : "!"}
            </div>

            <h2 className="text-xl font-bold text-center mb-2">
              {popup.title}
            </h2>

            <p className="text-gray-400 text-sm text-center leading-relaxed mb-6">
              {popup.message}
            </p>

            {popup.type === "confirm-cancel" ? (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={closePopup}
                  className="py-3 rounded-xl bg-[#14243a] text-gray-300 font-semibold hover:bg-[#1b2d46] transition"
                >
                  Lanjut Bayar
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  className="py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 active:scale-95 transition"
                >
                  Ya, Batalkan
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => router.replace("/tickets")}
                className="w-full py-3 bg-yellow-400 text-black font-bold rounded-xl hover:bg-yellow-300 active:scale-95 transition"
              >
                Lihat Tiket
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}