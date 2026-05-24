import Link from "next/link";

export default function ProfileForm() {
  return (
    <section>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Profil</h1>
      </div>

      <div className="bg-[#0d1c32] rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-xs text-gray-400 mb-2 block">
              Nama Lengkap
            </label>
            <input
              type="text"
              defaultValue="Aris Setiawan"
              className="w-full bg-[#14243a] border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-2 block">
              Alamat Email
            </label>
            <input
              type="email"
              defaultValue="aris@email.com"
              className="w-full bg-[#14243a] border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-2 block">
              Nomor Telepon
            </label>
            <input
              type="text"
              defaultValue="08123456789"
              className="w-full bg-[#14243a] border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-xs text-gray-400 mb-2 block">
              Tanggal Lahir
            </label>
            <input
              type="date"
              className="w-full bg-[#14243a] border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-gray-400 mb-2 block">
              Alamat
            </label>
            <textarea
              defaultValue="Kediri, Jawa Timur"
              rows={4}
              className="w-full bg-[#14243a] border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-yellow-400 resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <Link
            href="/profile"
            className="px-5 py-3 rounded-xl bg-[#14243a] text-sm text-gray-300 hover:bg-[#1b2d46]"
          >
            Batal
          </Link>

          <button className="px-5 py-3 rounded-xl bg-yellow-400 text-black text-sm font-semibold hover:bg-yellow-300">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </section>
  );
}