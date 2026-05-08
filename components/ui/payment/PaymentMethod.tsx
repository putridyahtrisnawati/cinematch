'use client'

import { useRouter } from "next/navigation";

type Props = {
    onSelect: (method: string) => void;
    selected: string | null;
};

export default function PaymentMethod({ onSelect, selected }: Props) {
    const router = useRouter();

    const handleSelect = (method: string) => {
        if (selected === method) {
            onSelect(""); // batal
        } else {
            onSelect(method);
        }
    };

    const ewallet = [
        { id: "gopay", name: "GoPay" },
        { id: "ovo", name: "OVO" },
    ];

    const banks = ["BCA", "BNI", "MANDIRI"];

    return (
        <div className="space-y-6">

            {/* E-WALLET */}
            <div>
                <h3 className="text-sm mb-3">E-Wallet</h3>

                <div className="grid grid-cols-2 gap-4">
                    {ewallet.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleSelect(item.id)}
                            className={`p-4 rounded-xl border flex justify-between items-center
                ${selected === item.id
                                    ? "border-yellow-400 bg-[#0d1c32]"
                                    : "border-transparent bg-[#0d1c32]"
                                }
              `}
                        >
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-xs text-gray-400">
                                    Proses instan
                                </p>
                            </div>

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
                        </button>
                    ))}
                </div>
            </div>

            {/* BANK */}
            <div>
                <h3 className="text-sm mb-3">
                    Transfer Bank (Virtual Account)
                </h3>

                {banks.map((bank) => (
                    <button
                        key={bank}
                        onClick={() => handleSelect(bank)}
                        className={`w-full p-4 mb-2 rounded-xl flex justify-between items-center
      ${selected === bank
                                ? "border border-yellow-400 bg-[#0d1c32]"
                                : "bg-[#0d1c32]"
                            }
    `}
                    >
                        <span>{bank} Virtual Account</span>

                        <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
        ${selected === bank
                                    ? "border-yellow-400"
                                    : "border-gray-500"
                                }
      `}
                        >
                            {selected === bank && (
                                <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                            )}
                        </div>
                    </button>
                ))}
            </div>

            {/* PROMO */}
            <div
                onClick={() => router.push(`/payment/promo?method=${selected || ""}`)}
                className="bg-[#0d1c32] p-4 rounded-xl flex justify-between cursor-pointer"
            >
                <div>
                    <p className="text-sm">Gunakan Kode Promo</p>
                    <p className="text-xs text-gray-400">
                        Hemat hingga Rp 25.000
                    </p>
                </div>

                <span className="text-yellow-400 text-xl leading-none">›</span>
            </div>

        </div>
    );
}