import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true, // Ensure each location has a unique ID
  },
  name: {
    type: String,
    required: true, // Name of the location
  },
});

export const Location = mongoose.model("Location", locationSchema);
