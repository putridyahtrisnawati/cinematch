import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ShowTime from "@/lib/models/showtime";

const SERVICE_FEE = 2000;

export async function POST(req: Request) {
  try {
    await connectDB();

    const { movieId, date, seats } = await req.json();

    if (!movieId || !date || !seats?.length) {
      return NextResponse.json({
        ticketPrice: 0,
        serviceFee: SERVICE_FEE,
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
    const total = (ticketPrice + SERVICE_FEE) * seats.length;

    return NextResponse.json({
      ticketPrice,
      serviceFee: SERVICE_FEE,
      ticketCount: seats.length,
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