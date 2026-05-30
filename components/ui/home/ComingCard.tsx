"use client";

import Image from "next/image";

type Props = {
  title: string;
  date: string;
  desc: string;
  image: string;
};

export default function ComingCard({ title, date, desc, image }: Props) {
  const poster = image || "/placeholder-movie.jpg";

  return (
    <div className="flex gap-4 min-w-[380px] shrink-0 bg-[#0d1c32] rounded-xl p-4 hover:bg-[#13233f] transition">

      <div className="w-24 h-32 relative rounded-lg overflow-hidden bg-[#14243a] shrink-0">
        <Image
          src={poster}
          alt={title || "Coming soon movie"}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-between min-w-0">
        <div>
          <p className="text-xs text-yellow-400 line-clamp-1">
            {date}
          </p>

          <h3 className="font-semibold line-clamp-1">
            {title}
          </h3>

          <p className="text-xs text-gray-400 line-clamp-3">
            {desc}
          </p>
        </div>

        <button
          type="button"
          className="text-xs text-gray-400 hover:text-yellow-400 flex items-center gap-1 mt-2 transition w-fit"
        >
          🔔 Ingatkan Saya
        </button>
      </div>

    </div>
  );
}