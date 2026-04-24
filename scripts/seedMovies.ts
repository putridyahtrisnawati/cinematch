import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import mongoose from "mongoose";
import Movie from "../lib/models/movie";
import { movies } from "../data/movies";

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    await Movie.deleteMany();
    await Movie.insertMany(movies);

    console.log("Seed berhasil");
    process.exit(0);
  } catch (error) {
    console.error("Seed gagal:", error);
    process.exit(1);
  }
}

seed();