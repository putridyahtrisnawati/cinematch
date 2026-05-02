type Props = {
  search: string;
  setSearch: (val: string) => void;
};

export default function Hero({ search, setSearch }: Props) {
  return (
    <section className="relative h-[500px] flex items-center justify-center text-center px-6">

      <div className="absolute inset-0 hero-gradient"></div>

      <div className="relative z-10 max-w-3xl space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Selamat Datang – Nonton film jadi asik bersama{" "}
          <span className="text-yellow-400">Cinematch</span>
        </h1>

        <div className="flex items-center bg-[#0d1c32] rounded-full p-2 pl-5">
          <span className="material-symbols-outlined mr-2 text-gray-400">
            search
          </span>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari film yang ingin anda tonton"
            className="bg-transparent flex-1 outline-none"
          />

          <button className="bg-red-600 px-6 py-2 rounded-full font-bold">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

