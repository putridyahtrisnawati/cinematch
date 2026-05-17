import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Booking from "@/lib/models/booking";

export async function GET() {
  try {
    await connectDB();

    // AUTO EXPIRED
    await Booking.updateMany(
      {
        status: "aktif",
        expiredAt: { $lt: new Date() },
      },
      {
        status: "expired",
      }
    );

    // AUTO SELESAI
    const now = new Date();

    const activeBookings = await Booking.find({
      status: "aktif",
    });

    for (const booking of activeBookings) {
      const showDateTime = new Date(
        `${booking.date} ${booking.time}`
      );

      if (showDateTime < now) {
        await Booking.findByIdAndUpdate(
          booking._id,
          {
            status: "selesai",
          }
        );
      }
    }

    const tickets = await Booking.find()
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { tickets },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get tickets error:", error);

    return NextResponse.json(
      {
        message: "Gagal mengambil tiket",
        tickets: [],
      },
      { status: 500 }
    );
  }
}