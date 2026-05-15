import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Promo from "@/lib/models/promo";

export async function GET() {
  try {
    await connectDB();

    const promos = await Promo.find({
      isActive: true,
      expiredAt: { $gte: new Date() },
    }).sort({ discountPercent: -1 });

    return NextResponse.json({ promos }, { status: 200 });
  } catch (error) {
    console.error("Get promos error:", error);

    return NextResponse.json(
      { message: "Gagal mengambil promo", promos: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const promo = await Promo.create({
      code: body.code.toUpperCase(),
      title: body.title,
      discountPercent: body.discountPercent,
      maxDiscount: body.maxDiscount,
      expiredAt: body.expiredAt,
      isActive: true,
    });

    return NextResponse.json(
      {
        message: "Promo berhasil dibuat",
        promo,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create promo error:", error);

    return NextResponse.json(
      { message: "Gagal membuat promo" },
      { status: 500 }
    );
  }
}