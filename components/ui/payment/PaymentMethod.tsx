"use client";

import { useRouter } from "next/navigation";

type Props = {
  onSelect: (method: string | null) => void;
  selected: string | null;

  title?: string | null;
  cinema?: string | null;
  date?: string | null;
  time?: string | null;
  seats?: string[];
};

export default function PaymentMethod({
  onSelect,
  selected,
  title,
  cinema,
  date,
  time,
  seats = [],
}: Props) {
  const router = useRouter();

  const handleSelect = (method: string) => {
    if (selected === method) {
      onSelect(null);
      return;
    }

    onSelect(method);
  };

  const handleGoPromo = () => {
    const query = new URLSearchParams({
      title: title || "",
      cinema: cinema || "",
      date: date || "",
      time: time || "",
      seats: seats.join(","),
      method: selected || "",
    });

    router.push(`/payment/promo?${query.toString()}`);
  };

  const ewallet = [
    { id: "gopay", name: "GoPay", desc: "Proses instan" },
    { id: "ovo", name: "OVO", desc: "Proses instan" },
  ];

  const banks = ["BCA", "BNI", "MANDIRI"];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm mb-3 font-semibold">
          E-Wallet
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ewallet.map((item) => {
            const isActive = selected === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`p-4 rounded-xl border flex justify-between items-center text-left transition-all duration-200 active:scale-[0.98] ${
                  isActive
                    ? "border-yellow-400 bg-[#0d1c32] shadow-lg shadow-yellow-400/10"
                    : "border-white/5 bg-[#0d1c32] hover:border-yellow-400/40"
                }`}
              >
                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {item.desc}
                  </p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                    isActive
                      ? "border-yellow-400"
                      : "border-gray-500"
                  }`}
                >
                  {isActive && (
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm mb-3 font-semibold">
          Transfer Bank Virtual Account
        </h3>

        <div className="space-y-2">
          {banks.map((bank) => {
            const isActive = selected === bank;

            return (
              <button
                key={bank}
                type="button"
                onClick={() => handleSelect(bank)}
                className={`w-full p-4 rounded-xl border flex justify-between items-center text-left transition-all duration-200 active:scale-[0.98] ${
                  isActive
                    ? "border-yellow-400 bg-[#0d1c32] shadow-lg shadow-yellow-400/10"
                    : "border-white/5 bg-[#0d1c32] hover:border-yellow-400/40"
                }`}
              >
                <div>
                  <p className="font-semibold">
                    {bank} Virtual Account
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    Bayar melalui ATM / mobile banking
                  </p>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
                    isActive
                      ? "border-yellow-400"
                      : "border-gray-500"
                  }`}
                >
                  {isActive && (
                    <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoPromo}
        className="w-full bg-[#0d1c32] border border-white/5 p-4 rounded-xl flex justify-between items-center text-left cursor-pointer hover:border-yellow-400/40 hover:bg-[#14243a] active:scale-[0.98] transition-all duration-200"
      >
        <div>
          <p className="text-sm font-semibold">
            Gunakan Kode Promo
          </p>

          <p className="text-xs text-gray-400 mt-1">
            Hemat hingga Rp 25.000
          </p>
        </div>

        <span className="material-symbols-outlined text-yellow-400">
          chevron_right
        </span>
      </button>
    </div>
  );
}