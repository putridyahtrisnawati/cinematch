import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Booking from "@/lib/models/booking";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        status: "dibatalkan",
      },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Tiket berhasil dibatalkan",
        booking,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cancel ticket error:", error);

    return NextResponse.json(
      { message: "Gagal membatalkan tiket" },
      { status: 500 }
    );
  }
}