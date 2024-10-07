import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  dates: {
    type: [Date], // Allows selecting one or more dates
    required: true,
  },
  time: {
    type: String, // The time selected by the user
    required: true,
  },
  note: {
    type: String, // Optional note
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
});

export const Job = mongoose.model('Job', jobSchema);
