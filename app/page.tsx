'use client'

import { useState } from "react";
import Navbar from "@/components/ui/layouts/Navbar";
import Hero from "@/components/ui/home/Hero";
import NowPlaying from "@/components/ui/home/NowPlaying";
import ComingSoon from "@/components/ui/home/ComingSoon";
import Footer from "@/components/ui/layouts/Footer";

export default function HomePage() {
  const [search, setSearch] = useState("");

  return (
    <main className="pt-20 bg-[#041329] text-white">

      <Navbar />

      <Hero
        search={search}
        setSearch={setSearch}
      />

      {/* 🔥 sekarang component ambil data sendiri */}
      <NowPlaying search={search} />

      <ComingSoon />

    </main>
  );
}