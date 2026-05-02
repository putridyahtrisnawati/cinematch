import mongoose, { Schema, models } from "mongoose";

const CinemaSchema = new Schema(
  {
    name: { type: String, required: true },
    times: [{ type: String, required: true }],
  },
  { _id: false }
);

const ShowTimeSchema = new Schema(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    cinemas: [CinemaSchema],
  },
  { timestamps: true }
);

export default models.ShowTime || mongoose.model("ShowTime", ShowTimeSchema);