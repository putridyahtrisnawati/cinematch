import { NextResponse } from "next/server";
import Movie from "@/lib/models/movie";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
  await connectDB();

  const movies = await Movie.find();

  return NextResponse.json(movies);
}

