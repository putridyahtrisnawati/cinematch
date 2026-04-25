import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  rating: Number,
  image: String,
  desc: String,  // teks pendek untuk home bagian coming soon
  status: String,
  description: String,   // sinopsis untuk detail film
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);

