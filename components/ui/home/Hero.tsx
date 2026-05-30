type Props = {
  search: string;
  setSearch: (val: string) => void;
};

export default function Hero({ search, setSearch }: Props) {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center text-center px-6 overflow-hidden">
      <div className="absolute inset-0 hero-gradient" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#041329]/30 to-[#041329]" />

      <div className="relative z-10 max-w-3xl space-y-7">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
          Selamat Datang - Nonton film jadi asik bersama{" "}
          <span className="text-yellow-400">
            CineMatch
          </span>
        </h1>

        <div className="max-w-2xl mx-auto flex items-center bg-[#0d1c32]/90 border border-white/10 rounded-full p-2 pl-5 shadow-2xl shadow-black/30 backdrop-blur-md focus-within:border-yellow-400/50 transition">
          <span className="material-symbols-outlined mr-2 text-gray-400">
            search
          </span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari film yang ingin Anda tonton"
            className="bg-transparent flex-1 outline-none text-sm placeholder:text-gray-500"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="mr-2 text-gray-400 hover:text-white transition"
            >
              <span className="material-symbols-outlined text-lg">
                close
              </span>
            </button>
          )}

          <button
            type="button"
            className="bg-red-600 text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 active:scale-95 transition"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  );
}