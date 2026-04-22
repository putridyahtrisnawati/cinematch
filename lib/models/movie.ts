import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  rating: Number,
  image: String,
  desc: String,
  status: String,
});

export default mongoose.models.Movie || mongoose.model("Movie", MovieSchema);