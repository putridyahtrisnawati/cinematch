"use client";

import { useEffect, useRef, useState } from "react";

type Booking = {
  _id: string;
  movieTitle: string;
  cinema: string;
  date: string;
  time: string;
  seats: string[];
  status: string;
  scannedAt?: string | null;
  total?: number;
};

type ScanResponse = {
  success: boolean;
  message: string;
  booking?: Booking;
};

type ScannerInstance = {
  clear: () => Promise<void>;
};

export default function ScanTicketPage() {
  const [loading, setLoading] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [result, setResult] = useState<ScanResponse | null>(null);

  const scannerRef = useRef<ScannerInstance | null>(null);

  const clearErrorAfterDelay = () => {
    setTimeout(() => {
      setResult(null);
    }, 3000);
  };

  const getBookingIdFromQR = (text: string) => {
    try {
      const parsed = JSON.parse(text);

      if (parsed.bookingId) {
        return parsed.bookingId;
      }

      if (parsed.id) {
        return parsed.id;
      }

      return text;
    } catch {
      return text;
    }
  };

  const handleVerify = async (bookingId: string) => {
    const finalBookingId = bookingId.trim();

    if (!finalBookingId) {
      setResult({
        success: false,
        message: "QR Code tidak berisi Booking ID",
      });

      clearErrorAfterDelay();
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const res = await fetch("/api/bookings/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: finalBookingId,
        }),
      });

      const data = await res.json();

      setResult(data);

      if (!data.success) {
        clearErrorAfterDelay();
      }
    } catch (error) {
      setResult({
        success: false,
        message: "Gagal menghubungkan ke server",
      });

      clearErrorAfterDelay();
    } finally {
      setLoading(false);
    }
  };

  const startScanner = async () => {
    try {
      setScannerActive(true);
      setResult(null);

      const { Html5QrcodeScanner } = await import("html5-qrcode");

      setTimeout(() => {
        if (scannerRef.current) return;

        const scanner = new Html5QrcodeScanner(
          "qr-reader",
          {
            fps: 10,
            qrbox: {
              width: 260,
              height: 260,
            },
          },
          false
        );

        scanner.render(
          async (decodedText: string) => {
            const scannedBookingId = getBookingIdFromQR(decodedText);

            await scanner.clear();
            scannerRef.current = null;
            setScannerActive(false);

            handleVerify(scannedBookingId);
          },
          () => {}
        );

        scannerRef.current = scanner;
      }, 100);
    } catch (error) {
      setResult({
        success: false,
        message: "Scanner gagal dibuka",
      });

      clearErrorAfterDelay();
    }
  };

  const stopScanner = async () => {
    if (scannerRef.current) {
      await scannerRef.current.clear();
      scannerRef.current = null;
    }

    setScannerActive(false);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(() => {});
      }
    };
  }, []);

  return (
  <main className="min-h-screen bg-[#06111f] text-white px-4 pt-28 pb-12">
    <div className="max-w-5xl mx-auto">
      <section className="text-center mb-10 mt-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-400/10 border border-yellow-400/30 mb-5">
          <span className="text-3xl">🎟️</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">
          Verifikasi Tiket Bioskop
        </h1>

          <p className="text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
            Arahkan kamera ke QR Code pada tiket untuk memvalidasi tiket
            penonton. Tiket yang sudah berhasil diverifikasi akan otomatis
            berubah status menjadi selesai.
          </p>
        </section>

        <section className="max-w-3xl mx-auto bg-[#0d1c32] rounded-3xl p-6 md:p-8 border border-white/10 shadow-xl">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#14243a] border border-white/10 flex items-center justify-center mb-5">
              <span className="text-4xl">📷</span>
            </div>

            <h2 className="text-2xl font-bold mb-2">
              Scan QR Code Tiket
            </h2>

            <p className="text-gray-400 text-sm max-w-xl mb-6">
              Tekan tombol di bawah untuk membuka kamera scanner. Setelah QR
              Code terbaca, sistem akan langsung mengecek tiket ke database.
            </p>

            {!scannerActive ? (
              <button
                onClick={startScanner}
                disabled={loading}
                className="bg-yellow-400 text-black font-bold rounded-xl px-8 py-3 hover:bg-yellow-300 disabled:opacity-60 transition"
              >
                {loading ? "Memverifikasi..." : "Buka Kamera Scanner"}
              </button>
            ) : (
              <button
                onClick={stopScanner}
                className="bg-red-600 text-white font-bold rounded-xl px-8 py-3 hover:bg-red-500 transition"
              >
                Tutup Scanner
              </button>
            )}
          </div>

          {scannerActive && (
            <div className="mt-8 bg-[#06111f] rounded-2xl border border-white/10 p-4 md:p-6">
              <h3 className="text-center text-lg font-semibold mb-4">
                Arahkan Kamera ke QR Code
              </h3>

              <div
                id="qr-reader"
                className="bg-white rounded-xl overflow-hidden text-black mx-auto p-4"
              />
            </div>
          )}
        </section>

        {result && (
          <section
            className={`max-w-3xl mx-auto mt-8 rounded-3xl p-6 md:p-8 border shadow-xl ${
              result.success
                ? "bg-green-900/30 border-green-500/40"
                : "bg-red-900/30 border-red-500/40"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  result.success ? "bg-green-500/20" : "bg-red-500/20"
                }`}
              >
                {result.success ? "✅" : "❌"}
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  {result.success ? "Tiket Valid" : "Tiket Tidak Valid"}
                </h2>

                <p className="text-sm text-gray-200 mt-1">
                  {result.message}
                </p>
              </div>
            </div>

            {result.booking && (
              <div className="mt-6 bg-black/20 rounded-2xl p-5 space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 mb-1">Booking ID</p>
                    <p className="break-all font-medium">
                      {result.booking._id}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 mb-1">Status</p>
                    <p className="font-medium capitalize">
                      {result.booking.status}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 mb-1">Film</p>
                    <p className="font-medium">
                      {result.booking.movieTitle}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 mb-1">Bioskop</p>
                    <p className="font-medium">
                      {result.booking.cinema}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 mb-1">Tanggal</p>
                    <p className="font-medium">
                      {result.booking.date}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 mb-1">Jam</p>
                    <p className="font-medium">
                      {result.booking.time}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-400 mb-1">Kursi</p>
                    <p className="font-medium">
                      {result.booking.seats.join(", ")}
                    </p>
                  </div>

                  {typeof result.booking.total === "number" && (
                    <div>
                      <p className="text-gray-400 mb-1">Total</p>
                      <p className="font-medium">
                        Rp{result.booking.total.toLocaleString("id-ID")}
                      </p>
                    </div>
                  )}

                  {result.booking.scannedAt && (
                    <div className="sm:col-span-2">
                      <p className="text-gray-400 mb-1">Waktu Scan</p>
                      <p className="font-medium">
                        {new Date(result.booking.scannedAt).toLocaleString(
                          "id-ID"
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}

        <section className="max-w-3xl mx-auto mt-8 bg-[#0d1c32]/60 rounded-2xl border border-white/10 p-5">
          <p className="text-sm text-gray-400 text-center leading-relaxed">
            Catatan: halaman ini digunakan untuk proses scan QR tiket. Setelah
            tiket berhasil diverifikasi, tiket tidak dapat digunakan kembali.
          </p>
        </section>
      </div>
    </main>
  );
}