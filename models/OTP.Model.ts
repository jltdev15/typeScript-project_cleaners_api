import mongoose, { Document, Schema, Model } from 'mongoose';

interface IOtp extends Document {
  userEmail: string;
  otp: string;
  createdAt: Date;
}

const otpSchema: Schema<IOtp> = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
    ref: "User",
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900 // 900 seconds = 15 minutes
  }
});

const Otp: Model<IOtp> = mongoose.model<IOtp>('Otp', otpSchema);

export default Otp;
export { IOtp };