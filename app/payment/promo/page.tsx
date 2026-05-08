'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PromoPage() {
    const router = useRouter();
    const params = useSearchParams();
    const method = params.get("method");
    const [selected, setSelected] = useState<string | null>(null);
    const [code, setCode] = useState("");
    const [isUsed, setIsUsed] = useState(false);
    const [popup, setPopup] = useState<{
        type: "success" | "error";
        message: string;
    } | null>(null);

    const vouchers = [
        {
            id: "promo1",
            label: "Pilihan Terbaik",
            title: "Diskon 20%, s/d Rp1.5RB",
        },
        {
            id: "promo2",
            label: "Terbatas",
            title: "Diskon 15%, s/d Rp1.5RB",
        },
        {
            id: "promo3",
            label: "Terbatas",
            title: "Diskon 10%, s/d Rp1.5RB",
        },
    ];

    const handleApply = () => {
        const finalVoucher = selected || (isUsed ? code : "");

        if (!finalVoucher) {
            router.push(`/payment?method=${method || ""}`);
        } else {
            router.push(`/payment?method=${method || ""}&voucher=${finalVoucher}`);
        }
    };
    const handleUseVoucher = () => {
        if (code.trim().toUpperCase() === "NEWCINEMA") {
            setPopup({
                type: "success",
                message: "Voucher berhasil digunakan 🎉",
            });
            setIsUsed(true);
        } else {
            setPopup({
                type: "error",
                message:
                    "Kode voucher tidak ditemukan atau sudah tidak berlaku",
            });
            setIsUsed(false);
        }

        setTimeout(() => {
            setPopup(null);
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-[#041329] text-white pb-24">
            {
                popup && (
                    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
                        <div
                            className={`px-6 py-3 rounded-xl text-sm font-medium shadow-lg
        ${popup.type === "success"
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                                }
      `}
                        >
                            {popup.message}
                        </div>
                    </div>
                )
            }

            {/* HEADER */}
            <div className="flex items-center gap-3 p-4 border-b border-white/10">
                <button
                    onClick={() => router.back()}
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0d1c32]"
                >
                    ←
                </button>

                <h2 className="font-semibold">
                    Voucher Promo
                </h2>
            </div>

            {/* INPUT */}
            <div className="p-4 flex gap-2">
                <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Masukkan kode voucher"
                    className="flex-1 bg-[#0d1c32] p-3 rounded-xl outline-none text-white placeholder-gray-400"
                />

                <button
                    onClick={handleUseVoucher}
                    className={`px-4 rounded-xl font-medium transition
    ${code
                            ? "bg-yellow-400 text-black"
                            : "bg-[#0d1c32] text-gray-400"
                        }
  `}
                >
                    Pakai
                </button>
            </div>

            {/* LIST VOUCHER */}
            <div className="space-y-3 px-4">
                {vouchers.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setSelected(item.id)}
                        className={`relative p-4 rounded-xl flex justify-between items-center cursor-pointer transition
              ${selected === item.id
                                ? "border border-yellow-400 bg-[#0d1c32]"
                                : "bg-[#0d1c32]"
                            }
            `}
                    >

                        {/* LABEL */}
                        <span className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] px-2 py-0.5 rounded">
                            {item.label}
                        </span>

                        {/* TEXT */}
                        <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-[10px] text-gray-500 mt-1">
                                Berlaku hingga 03 Juni 2026
                            </p>
                        </div>

                        {/* RADIO */}
                        <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                ${selected === item.id
                                    ? "border-yellow-400"
                                    : "border-gray-500"
                                }
              `}
                        >
                            {selected === item.id && (
                                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                            )}
                        </div>

                    </div>
                ))}
            </div>

            {/* BUTTON */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#041329] border-t border-white/10">
                <button
                    onClick={handleApply}
                    className="w-full bg-yellow-400 text-black py-4 rounded-xl font-bold disabled:opacity-50"
                >
                    OK
                </button>
            </div>

        </main>
    );
}