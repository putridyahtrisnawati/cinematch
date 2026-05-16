import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";

import { connectDB } from "@/lib/mongodb";
import Promo from "@/lib/models/promo";

async function seedPromos() {
  try {
    await connectDB();

    await Promo.deleteMany();

    await Promo.insertMany([
      {
        code: "PROMO20",
        title: "Diskon 20%, maks. Rp8RB",
        discountPercent: 20,
        maxDiscount: 8000,
        expiredAt: new Date("2026-06-03"),
        isActive: true,
      },
      {
        code: "PROMO15",
        title: "Diskon 15%, maks. Rp5RB",
        discountPercent: 15,
        maxDiscount: 5000,
        expiredAt: new Date("2026-06-03"),
        isActive: true,
      },
      {
        code: "PROMO10",
        title: "Diskon 10%, maks. Rp3RB",
        discountPercent: 10,
        maxDiscount: 3000,
        expiredAt: new Date("2026-06-03"),
        isActive: true,
      },
    ]);

    console.log("Seed promo berhasil");

    process.exit(0);
  } catch (error) {
    console.error("Seed promo gagal:", error);

    process.exit(1);
  }
}

seedPromos();