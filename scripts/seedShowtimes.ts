import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({ path: ".env.local" });

const cinemas = ["XXI KEDIRI", "GOLDEN THEATRE", "CGV KEDIRI MALL"];

const timeOptions = [
  ["12:30", "14:55", "17:20", "19:45"],
  ["13:00", "15:30", "18:00", "20:30"],
  ["12:15", "14:40", "17:05", "19:30"],
  ["11:45", "14:10", "16:45", "21:00"],
];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

async function seedShowtimes() {
  try {
    const { connectDB } = await import("@/lib/mongodb");
    const Movie = (await import("@/lib/models/movie")).default;
    const ShowTime = (await import("@/lib/models/showtime")).default;

    await connectDB();

    const movies = await Movie.find({
      status: "now_playing",
    });

    await ShowTime.deleteMany({});

    const showtimes = [];
    const today = new Date();
    const totalDays = 7;

    for (let movieIndex = 0; movieIndex < movies.length; movieIndex++) {
      const movie = movies[movieIndex];

      for (let dayIndex = 0; dayIndex < totalDays; dayIndex++) {
        const date = new Date(today);
        date.setDate(today.getDate() + dayIndex);

        const dateString = formatDate(date);

        showtimes.push({
          movieId: movie._id,
          date: dateString,
          cinemas: cinemas.map((cinema, cinemaIndex) => ({
            name: cinema,
            times:
              timeOptions[
                (dayIndex + cinemaIndex + movieIndex) % timeOptions.length
              ],
          })),
        });
      }
    }

    await ShowTime.insertMany(showtimes);

    console.log(`Seeded ${showtimes.length} showtimes`);
    console.log(`Movies seeded: ${movies.length} now playing movies`);
    console.log(`Total days seeded: ${totalDays}`);

    process.exit(0);
  } catch (error) {
    console.error("Seed showtimes error:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedShowtimes();