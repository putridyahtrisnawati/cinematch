"use client";

import { useState } from "react";
import Hero from "@/components/ui/home/Hero";
import NowPlaying from "@/components/ui/home/NowPlaying";
import ComingSoon from "@/components/ui/home/ComingSoon";

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <main className="min-h-screen bg-[#041329] text-white pt-20">
      <Hero
        search={search}
        setSearch={setSearch}
      />

      <NowPlaying search={search} />

      <ComingSoon />
    </main>
  );
}