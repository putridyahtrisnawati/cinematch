'use client'

import { useState } from "react";

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
  const dates = getNextDays();
  const [active, setActive] = useState(0);

  const handleClick = (index: number) => {
    setActive(index);
    onSelect(dates[index].fullDate);
  };

  return (
    <div>
      <h3 className="mb-3">Pilih Tanggal</h3>

      <div className="flex gap-2 overflow-x-auto">
        {dates.map((d, i) => (
          <button
            key={d.fullDate}
            onClick={() => handleClick(i)}
            className={`px-4 py-2 rounded-xl text-sm min-w-[60px] ${
              active === i
                ? "bg-yellow-400 text-black"
                : "bg-[#0d1c32] text-white"
            }`}
          >
            <div>{d.day}</div>
            <div className="font-bold">{d.date}</div>
          </button>
        ))}
      </div>
    </div>
  );
}