import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Booking from "@/lib/models/booking";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking ID wajib diisi",
        },
        { status: 400 }
      );
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Tiket tidak ditemukan",
        },
        { status: 404 }
      );
    }

    if (booking.status === "selesai") {
      return NextResponse.json(
        {
          success: false,
          message: "Tiket sudah digunakan",
        },
        { status: 400 }
      );
    }

    if (booking.status !== "aktif") {
      return NextResponse.json(
        {
          success: false,
          message: "Tiket tidak valid",
        },
        { status: 400 }
      );
    }

    booking.status = "selesai";
    booking.scannedAt = new Date();

    await booking.save();

    return NextResponse.json(
      {
        success: true,
        message: "Tiket valid",
        booking,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Scan ticket error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Gagal memverifikasi tiket",
      },
      { status: 500 }
    );
  }
}