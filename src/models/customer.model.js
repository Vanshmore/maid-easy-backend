import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true, // Unique Google ID for each user
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique for identification
    trim: true,
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

// Token generation for authenticated user
customerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
      googleId: this.googleId, // Include Google ID in token for identification
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
