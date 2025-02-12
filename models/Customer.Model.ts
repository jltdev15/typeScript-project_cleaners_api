import mongoose, { Document, Schema, Model } from 'mongoose';

interface ICustomer extends Document {
  _id: mongoose.Types.ObjectId;
  fullName: string | null;
  contactNumber: number | null;
  street: string | null;
  brgy: string | null;
  municipality: string | null;
  province: string | null;
  createdAt: string;
  updatedAt: string;
}

const customerSchema: Schema<ICustomer> = new mongoose.Schema({
  fullName: {
    type: String,
    default: null
  },
  contactNumber: {
    type: Number,
    default: null
  },
  street: {
    type: String,
    default: null,
  },
  brgy: {
    type: String,
    default: null
  },
  municipality: {
    type: String,
    default: null
  },
  province: {
    type: String,
    default: null
  },
  createdAt: {
    type: String,
    default: getDateValue(),
  },
  updatedAt: {
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

const Customer: Model<ICustomer> = mongoose.model<ICustomer>("Customer", customerSchema);
export default Customer;
export { ICustomer };