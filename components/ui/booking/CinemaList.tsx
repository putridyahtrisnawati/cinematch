'use client'

export default function CinemaList({
  data,
  selectedCinema,
  selectedTime,
  onSelectSchedule,
}: any) {
  if (!data) {
    return (
      <div className="bg-[#0d1c32] p-5 rounded-2xl">
        <p className="text-gray-400">Jadwal belum tersedia</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="mb-3">Pilih Bioskop & Jam</h3>

      <div className="space-y-4">
        {data.cinemas.map((cinema: any) => (
          <div
            key={cinema.name}
            className="bg-[#0d1c32] p-5 rounded-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold">{cinema.name}</h4>
              <p className="text-yellow-400 text-sm">
                Rp {data.price?.toLocaleString("id-ID") || "30.000"}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {cinema.times.map((time: string) => {
                const isActive =
                  selectedCinema?.name === cinema.name &&
                  selectedTime === time;

                return (
                  <button
                    key={time}
                    onClick={() => onSelectSchedule(cinema, time)}
                    className={`px-4 py-2 rounded-lg text-sm transition
                      ${
                        isActive
                          ? "bg-yellow-400 text-black"
                          : "bg-[#152844] hover:bg-yellow-400 hover:text-black"
                      }
                    `}
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