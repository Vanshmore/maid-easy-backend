


import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    default: null, // Store OTP for verification
  },
  isVerified: {
    type: Boolean,
    default: false, // Flag to indicate if OTP was verified
  },
  location: {
    type: String,
    default: null, // Automatically fetched after registration
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Token generation for authenticated user after OTP verification
customerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      phone: this.phone,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

customerSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const Customer = mongoose.model("Customer", customerSchema);
