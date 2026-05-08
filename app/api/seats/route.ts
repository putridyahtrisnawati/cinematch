import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Booking from "@/lib/models/booking";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const movieId = searchParams.get("movieId");
    const cinema = searchParams.get("cinema");
    const date = searchParams.get("date");
    const time = searchParams.get("time");

    if (!movieId || !cinema || !date || !time) {
      return NextResponse.json(
        { message: "Query tidak lengkap", occupiedSeats: [] },
        { status: 400 }
      );
    }

    const bookings = await Booking.find({
      movieId,
      cinema,
      date,
      time,
    });

    const occupiedSeats = bookings.flatMap((booking) => booking.seats);

    return NextResponse.json({
      occupiedSeats,
    });
  } catch (error) {
    console.error("Get seats error:", error);

    return NextResponse.json(
      { message: "Gagal mengambil data kursi", occupiedSeats: [] },
      { status: 500 }
    );
  }
}