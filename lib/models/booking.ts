import mongoose, { Schema, models } from "mongoose";

const BookingSchema = new Schema(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    movieTitle: {
      type: String,
      required: true,
    },

    cinema: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    seats: [
      {
        type: String,
        required: true,
      },
    ],

    total: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Booking ||
  mongoose.model("Booking", BookingSchema);