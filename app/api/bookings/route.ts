import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";
import Booking from "../../../lib/models/booking";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const booking = await Booking.create(body);

    return NextResponse.json(
      {
        message: "Booking berhasil",
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Booking gagal",
      },
      { status: 500 }
    );
  }
}