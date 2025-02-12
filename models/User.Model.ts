import mongoose, { Document, Schema, Model } from 'mongoose';

interface IUser extends Document {
 _id: mongoose.Types.ObjectId;
  googleId?: string;
  facebookId?: string;
  email: string;
  password: string;
  avatar?: string;
  registrationMethod: 'google' | 'facebook' | 'local';
  role: 'Customer' | 'Cleaner' | 'Admin';
  status: number;
  isProfileComplete: boolean;
  profile?: mongoose.Types.ObjectId;
  bookings: mongoose.Types.ObjectId[];
  createdAt: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true,  // Allow null values but still enforce uniqueness for non-null values
  },
  facebookId: {
    type: String,
    unique: true,
    sparse: true,  // Allow null values but still enforce uniqueness for non-null values
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    index: true,
    required: true,
  },
  password: {
    type: String, // Only required for email/password registration
  },
  avatar: {
    type: String,
  },
  registrationMethod: {
    type: String,
    enum: ['google', 'facebook', 'local'],
    required: true,
  },
  role: {
    type: String,
    enum: ["Customer", "Cleaner", "Admin"],
  },
  status: {
    type: Number,
    default: 0, // 0 meaning unverified email
  },
  isProfileComplete: {
    type: Boolean,
    default: false, // 0 meaning incomplete information 
  },
  profile: {
    // Different profiles based on the role
    type: mongoose.Schema.Types.ObjectId,
    refPath: "role",
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    }
  ],
  createdAt: {
    type: String,
    default: getDateValue(),
  },
});

function getDateValue(): string {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
export { IUser };