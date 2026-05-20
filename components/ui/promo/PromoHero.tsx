'use client';

export default function PromoHero({ onUse }: any) {
    return (
        <div className="mb-10">

            {/* TITLE */}
            <h1 className="text-3xl font-bold mb-2">
                Penawaran <span className="text-yellow-400">Eksklusif</span>
            </h1>

            <p className="text-gray-400 mb-6 max-w-xl">
                Nikmati pengalaman menonton terbaik dengan promo khusus pengguna baru
                dan penawaran spesial di tanggal tertentu.
            </p>

            {/* CARD BESAR */}
            <div className="grid md:grid-cols-2 gap-6">

                {/* LEFT BIG */}
                <div className="bg-gradient-to-r from-[#0d1c32] to-[#1a2f52] p-6 rounded-xl">

                    <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded">
                        MEMBER BARU
                    </span>

                    <h2 className="text-xl font-bold mt-3 mb-2">
                        Potongan 50% Tiket Pertama Kamu
                    </h2>

                    <p className="text-sm text-gray-400 mb-4 italic">
                        *Syarat dan ketentuan berlaku
                    </p>

                    <button
                        onClick={() => onUse()}
                        className="bg-yellow-400 text-black px-4 py-2 rounded-lg"
                    >
                        Gunakan Promo
                    </button>

                </div>

                {/* RIGHT SMALL */}
                <div className="bg-[#0d1c32] p-6 rounded-xl opacity-70">

                    <span className="text-xs text-yellow-400">
                        PROMO TERBATAS
                    </span>

                    <h2 className="text-lg font-semibold mt-2">
                        Double Date Deals
                    </h2>

                    <p className="text-sm text-gray-400 mb-4">
                        Berlaku di tanggal tertentu
                    </p>

                    <button className="bg-gray-600 text-white px-4 py-2 rounded-lg">
                        Gunakan Promo
                    </button>

                </div>

            </div>

        </div>
    );
}