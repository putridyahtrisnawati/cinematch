"use client";

export default function CinemaList({
  data,
  selectedCinema,
  selectedTime,
  onSelectSchedule,
}: any) {
  if (!data || !data.cinemas || data.cinemas.length === 0) {
    return (
      <div className="bg-[#0d1c32] p-6 rounded-2xl border border-white/5 text-center">
        <div className="w-14 h-14 rounded-full bg-yellow-400/10 text-yellow-400 flex items-center justify-center mx-auto mb-4">
          <span className="material-symbols-outlined text-3xl">
            event_busy
          </span>
        </div>

        <p className="text-gray-300 font-semibold">
          Jadwal belum tersedia
        </p>

        <p className="text-gray-500 text-sm mt-1">
          Silakan pilih tanggal lain.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-3 font-semibold">
        Pilih Bioskop & Jam
      </h3>

      <div className="space-y-4">
        {data.cinemas.map((cinema: any) => (
          <div
            key={cinema.name}
            className="bg-[#0d1c32] p-5 rounded-2xl border border-white/5 shadow-xl transition-all duration-200 hover:border-yellow-400/20"
          >
            <div className="flex justify-between items-center gap-4 mb-4">
              <h4 className="font-semibold line-clamp-1">
                {cinema.name}
              </h4>

              <p className="text-yellow-400 text-sm font-semibold shrink-0">
                Rp {data.price?.toLocaleString("id-ID") || "30.000"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {(cinema.times || []).map((time: string) => {
                const isActive =
                  selectedCinema?.name === cinema.name &&
                  selectedTime === time;

                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => onSelectSchedule(cinema, time)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-200 active:scale-95 ${
                      isActive
                        ? "bg-yellow-400 text-black font-semibold shadow-lg shadow-yellow-400/10"
                        : "bg-[#152844] hover:bg-yellow-400 hover:text-black"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}