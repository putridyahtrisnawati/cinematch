'use client'

import { useState } from "react";

export default function CinemaList() {
  const [selectedTime, setSelectedTime] = useState(null);

  const cinemas = [
    {
      name: "XXI KEDIRI",
      price: "Rp 30.000",
      times: ["12:30", "14:55", "17:20", "19:45"],
    },
    {
      name: "GOLDEN THEATRE",
      price: "Rp 30.000",
      times: ["13:00", "15:30", "18:00", "20:30"],
    },
    {
      name: "CGV KEDIRI MALL",
      price: "Rp 30.000",
      times: ["12:15", "14:40", "17:05", "19:30"],
    },
  ];

  return (
    <div className="space-y-4">
      <h3>Bioskop di Sekitarmu</h3>

      {cinemas.map((c, i) => (
        <div key={i} className="bg-[#0d1c32] p-4 rounded-xl">

          <div className="flex justify-between items-center mb-3">

            {/* NAMA BIOSKOP */}
            <h4 className="font-semibold text-white">
              {c.name}
            </h4>

            {/* HARGA */}
            <span className="text-yellow-400 text-sm">
              {c.price}
            </span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {c.times.map((t, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTime(t)}
                className={`px-4 py-2 rounded-lg text-sm transition ${selectedTime === t
                    ? "bg-yellow-400 text-black"
                    : "bg-[#1c2a41] hover:bg-yellow-400 hover:text-black"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>

        </div>
      ))}

      <div className="flex justify-end mt-6">
        <button className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold">
          Cari Kursi
        </button>
      </div>
    </div>
  );
}