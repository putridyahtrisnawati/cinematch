import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Promo from "@/lib/models/promo";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { promoCode, subtotal } = body;

    if (!promoCode || !subtotal) {
      return NextResponse.json(
        { message: "Promo code dan subtotal wajib diisi" },
        { status: 400 }
      );
    }

    const promo = await Promo.findOne({
      code: promoCode.toUpperCase(),
      isActive: true,
      expiredAt: { $gte: new Date() },
    });

    if (!promo) {
      return NextResponse.json(
        { message: "Promo tidak valid atau sudah expired" },
        { status: 404 }
      );
    }

    let discountAmount = subtotal * (promo.discountPercent / 100);

    if (promo.maxDiscount > 0 && discountAmount > promo.maxDiscount) {
      discountAmount = promo.maxDiscount;
    }

    const totalAfterDiscount = subtotal - discountAmount;

    return NextResponse.json(
      {
        message: "Promo valid",
        promo,
        subtotal,
        discountAmount,
        totalAfterDiscount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Validate promo error:", error);

    return NextResponse.json(
      { message: "Gagal validasi promo" },
      { status: 500 }
    );
  }
}