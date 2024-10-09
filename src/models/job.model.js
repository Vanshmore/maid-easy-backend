import mongoose from 'mongoose';

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
  serviceType: {
    type: String,
    enum: ['One day', 'Monthly', 'Range'],
    required: true,
  },
  date: {
    type: Date,
    required: function () {
      return this.serviceType === 'One day';
    },
  },
  dates: {
    from: {
      type: Date,
      required: function () {
        return this.serviceType === 'Range';
      },
    },
    to: {
      type: Date,
      required: function () {
        return this.serviceType === 'Range';
      },
    },
  },
  time: {
    type: String,
    required: true,
  },
  note: {
    type: String,
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
