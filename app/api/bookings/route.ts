import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Booking from "@/lib/models/booking";
import ShowTime from "@/lib/models/showtime";
import Promo from "@/lib/models/promo";

const SERVICE_FEE = 2000;

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const { movieId, movieTitle, cinema, date, time, seats, promoCode, method } = body;

    if (!movieId || !movieTitle || !cinema || !date || !time || !seats?.length) {
      return NextResponse.json(
        { message: "Data booking tidak lengkap" },
        { status: 400 }
      );
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
    const subtotal = ticketPrice * seats.length;

    let discountAmount = 0;
    let finalPromoCode: string | null = null;

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

      if (promo.maxDiscount > 0 && discountAmount > promo.maxDiscount) {
        discountAmount = promo.maxDiscount;
      }

      finalPromoCode = promo.code;
    }

    const total = subtotal - discountAmount + SERVICE_FEE;

    const isVA =
      method?.includes("BCA") ||
      method?.includes("BNI") ||
      method?.includes("MANDIRI");

    const expiredAt = isVA
      ? new Date(Date.now() + 5 * 60 * 1000)
      : null;

    const booking = await Booking.create({
      movieId,
      movieTitle,
      cinema,
      date,
      time,
      seats,
      ticketPrice,
      serviceFee: SERVICE_FEE,
      subtotal,
      promoCode: finalPromoCode,
      discountAmount,
      total,
      paymentMethod: method || null,
      status: "aktif",
      expiredAt,
    });

    return NextResponse.json(
      {
        message: "Booking berhasil",
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);

    return NextResponse.json(
      { message: "Booking gagal" },
      { status: 500 }
    );
  }
}