import mongoose, { Schema, models } from "mongoose";

const PromoSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    title: {
      type: String,
      required: true,
    },
    discountPercent: {
      type: Number,
      required: true,
    },
    maxDiscount: {
      type: Number,
      default: 0,
    },
    expiredAt: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Promo = models.Promo || mongoose.model("Promo", PromoSchema);

export default Promo;