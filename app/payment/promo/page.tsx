'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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

    const [popup, setPopup] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    // 🔥 FETCH PROMO DARI API
    useEffect(() => {
        const fetchPromos = async () => {
            try {
                const res = await fetch("/api/promos");
                const data = await res.json();
                setPromos(data.promos || []);
            } catch (error) {
                console.error("Fetch promo error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPromos();
    }, []);

    // 🔥 APPLY PROMO (KIRIM KE PAYMENT)
    const handleApply = () => {
        if (!selected) {
            // kalau user belum pilih promo
            router.push(
                `/payment?title=${title}` +
                `&cinema=${cinema}` +
                `&date=${date}` +
                `&time=${time}` +
                `&seats=${seats}` +
                `&method=${method || ""}`
            );
            return;
        }

        router.push(
            `/payment?title=${title}` +
            `&cinema=${cinema}` +
            `&date=${date}` +
            `&time=${time}` +
            `&seats=${seats}` +
            `&method=${method || ""}` +
            `&promoCode=${selected}`
        );
    };

    return (
        <main className="min-h-screen bg-[#041329] text-white pb-24">

            {/* POPUP */}
            {popup && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
                    <div
                        className={`px-6 py-3 rounded-xl text-sm font-medium shadow-lg
                        ${popup.type === "success"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                    >
                        {popup.message}
                    </div>
                </div>
            )}

            {/* HEADER */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
                <button
                    onClick={() => router.back()}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0d1c32]"
                >
                    ←
                </button>

                <h2 className="font-semibold">Voucher Promo</h2>
            </div>

            {/* LIST PROMO */}
            <div className="space-y-3 px-4">
                {loading ? (
                    <p className="text-center text-gray-400">Loading promo...</p>
                ) : promos.length === 0 ? (
                    <p className="text-center text-gray-400">Tidak ada promo tersedia</p>
                ) : (
                    promos.map((item) => (
                        <div
                            key={item._id}
                            onClick={() => setSelected(item.code)}
                            className={`relative p-4 rounded-xl flex justify-between items-center cursor-pointer transition
                            ${selected === item.code
                                    ? "border border-yellow-400 bg-[#0d1c32]"
                                    : "bg-[#0d1c32]"
                                }`}
                        >
                            {/* LABEL */}
                            <span className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] px-2 py-0.5 rounded">
                                {item.discountPercent}% OFF
                            </span>

                            {/* TEXT */}
                            <div>
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-[10px] text-gray-400 mt-1">
                                    Maks diskon Rp {item.maxDiscount}
                                </p>
                            </div>

                            {/* RADIO */}
                            <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                ${selected === item.code
                                        ? "border-yellow-400"
                                        : "border-gray-500"
                                    }`}
                            >
                                {selected === item.code && (
                                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* BUTTON */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#041329] border-t border-white/10">
                <button
                    onClick={handleApply}
                    className="w-full bg-yellow-400 text-black py-4 rounded-xl font-bold"
                >
                    OK
                </button>
            </div>

        </main>
    );
}