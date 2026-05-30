"use client";

import { useEffect, useMemo, useState } from "react";

const getNextDays = () => {
  const days = [];
  const today = new Date();

  const dayNames = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + i);

    const fullDate = `${nextDate.getFullYear()}-${String(
      nextDate.getMonth() + 1
    ).padStart(2, "0")}-${String(nextDate.getDate()).padStart(2, "0")}`;

    days.push({
      day: dayNames[nextDate.getDay()],
      date: nextDate.getDate(),
      fullDate,
    });
  }

  return days;
};

export default function DateSelector({ onSelect }: any) {
  const dates = useMemo(() => getNextDays(), []);
  const [active, setActive] = useState(0);

  // 🔥 INI PENTING
  // Biar tanggal aktif pertama langsung dikirim ke BookingPage
  useEffect(() => {
    if (dates.length > 0) {
      onSelect(dates[0].fullDate);
    }
  }, []);

  const handleClick = (index: number) => {
    setActive(index);
    onSelect(dates[index].fullDate);
  };

  return (
    <div>
      <h3 className="mb-3 font-semibold">
        Pilih Tanggal
      </h3>

      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {dates.map((d, i) => {
          const isActive = active === i;

          return (
            <button
              key={d.fullDate}
              type="button"
              onClick={() => handleClick(i)}
              className={`px-4 py-2 rounded-xl text-sm min-w-[64px] border transition-all duration-200 active:scale-95 ${
                isActive
                  ? "bg-yellow-400 text-black border-yellow-400 font-semibold shadow-lg shadow-yellow-400/10"
                  : "bg-[#0d1c32] text-white border-white/5 hover:border-yellow-400/40 hover:text-yellow-400"
              }`}
            >
              <div>{d.day}</div>
              <div className="font-bold">{d.date}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}