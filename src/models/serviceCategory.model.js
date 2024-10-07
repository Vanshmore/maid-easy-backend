import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true, // Ensures each service has a unique ID
  },
  name: {
    type: String,
    required: true, // Name of the parent service
  },
  description: {
    type: String,
    required: true, // Single string containing subservices
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Service = mongoose.model("Service", serviceSchema);
