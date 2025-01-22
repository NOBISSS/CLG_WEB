import mongoose, { Schema } from "mongoose";

const OTPs = new Schema(
  {
    Gotp: {
      type: Number,
      required: true,
    },
    enrollmentId: {
      type: String,
      ref: "Student",
      required: true,
      trim: true,
    },
    expiryAt: {
      type: Date,
      default: Date.now(),
    },
    isExpired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const TempOTP = mongoose.model("OTP", OTPs);
