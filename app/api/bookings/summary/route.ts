import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ShowTime from "@/lib/models/showtime";
import Promo from "@/lib/models/promo";

const SERVICE_FEE = 2000;

export async function POST(req: Request) {
  try {
    await connectDB();

    const { movieId, date, seats, promoCode } = await req.json();

    if (!movieId || !date || !seats?.length) {
      return NextResponse.json({
        ticketPrice: 0,
        serviceFee: SERVICE_FEE,
        ticketCount: 0,
        subtotal: 0,
        promoCode: null,
        discountAmount: 0,
        total: 0,
      });
    }

    const showtime = await ShowTime.findOne({
      movieId,
      date,
    });

    if (!showtime) {
      return NextResponse.json(
        { message: "Jadwal tidak ditemukan" },
        { status: 404 }
      );
    }

    const ticketPrice = showtime.price;
    const ticketCount = seats.length;
    const subtotal = ticketPrice * ticketCount;

    let discountAmount = 0;
    let finalPromoCode = null;

    if (promoCode) {
      const promo = await Promo.findOne({
        code: promoCode.toUpperCase(),
        isActive: true,
        expiredAt: { $gte: new Date() },
      });

      if (!promo) {
        return NextResponse.json(
          { message: "Promo tidak valid atau sudah expired" },
          { status: 400 }
        );
      }

      discountAmount = subtotal * (promo.discountPercent / 100);

      if (discountAmount > promo.maxDiscount) {
        discountAmount = promo.maxDiscount;
      }

      finalPromoCode = promo.code;
    }

    const total = subtotal - discountAmount + SERVICE_FEE;

    return NextResponse.json({
      ticketPrice,
      serviceFee: SERVICE_FEE,
      ticketCount,
      subtotal,
      promoCode: finalPromoCode,
      discountAmount,
      total,
    });
  } catch (error) {
    console.error("Booking summary error:", error);

    return NextResponse.json(
      { message: "Gagal menghitung total" },
      { status: 500 }
    );
  }
}