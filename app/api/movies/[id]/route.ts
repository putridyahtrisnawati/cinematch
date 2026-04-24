import { NextResponse } from "next/server";
import Movie from "@/lib/models/movie";
import { connectDB } from "@/lib/mongodb";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  await connectDB();

  const movie = await Movie.findById(id);

  if (!movie) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(movie);
}