'use client'

import { useState } from "react";

const getNextDays = () => {
  const days = [];
  const today = new Date();

  const dayNames = ["MIN", "SEN", "SEL", "RAB", "KAM", "JUM", "SAB"];

  for (let i = 0; i < 7; i++) {
    const nextDate = new Date(today); // 🔥 copy dari today
    nextDate.setDate(today.getDate() + i);

    days.push({
      day: dayNames[nextDate.getDay()],
      date: nextDate.getDate(),
      fullDate: nextDate.toISOString(), // 🔥 penting buat backend nanti
    });
  }

  return days;
};

export default function DateSelector() {
  const dates = getNextDays();
  const [active, setActive] = useState(0);

  return (
    <div>
      <h3 className="mb-3">Pilih Tanggal</h3>

      <div className="flex gap-2">
        {dates.map((d, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-4 py-2 rounded-xl text-sm ${
              active === i
                ? "bg-yellow-400 text-black"
                : "bg-[#0d1c32]"
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