'use client'

import Image from "next/image";

type Props = {
  title: string;
  date: string;
  desc: string;
  image: string;
};

export default function ComingCard({ title, date, desc, image }: Props) {
  return (
    <div className="flex gap-4 min-w-[380px] bg-[#0d1c32] rounded-xl p-4 hover:bg-[#13233f] transition">

      {/* Thumbnail */}
      <div className="w-24 h-32 relative rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-xs text-yellow-400">{date}</p>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-gray-400">{desc}</p>
        </div>

        <button className="text-xs text-gray-400 hover:text-yellow-400 flex items-center gap-1 mt-2">
          🔔 Ingatkan Saya
        </button>
      </div>

    </div>
  );
}

