import mongoose, {Schema} from "mongoose";
// import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"

const maidSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  aadhaarNumber: {
    type: String,
    // required: true,
    unique: true,
  },
  workExperience: {
    type: Number,
    // required: true,
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

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});


maidSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

maidSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
          _id: this._id,
          fullName: this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}
maidSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
      {
          _id: this._id,    
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRY
      }
  )
}




export const Maid = mongoose.model("Maid", maidSchema)
