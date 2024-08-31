
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const maidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
  },
  workExperience: {
    type: Number,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  serviceCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServiceCategory',
    },
  ],
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

maidSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


maidSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const Maid = mongoose.model('Maid', maidSchema);
module.exports = Maid;
