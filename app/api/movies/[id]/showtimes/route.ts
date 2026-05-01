import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import ShowTime from "@/lib/models/showtime";

function isWeekend(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDay();

  return day === 0 || day === 6;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const showtimes = await ShowTime.find({
      movieId: id,
    }).sort({ date: 1 });

    const result = showtimes.map((item) => ({
      _id: item._id,
      movieId: item.movieId,
      date: item.date,
      price: isWeekend(item.date) ? 40000 : 30000,
      cinemas: item.cinemas,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET showtimes error:", error);

    return NextResponse.json(
      { error: "Failed to fetch showtimes" },
      { status: 500 }
    );
  }
}