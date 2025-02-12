const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingID: {
    type: String,
    required: true,
    unique: true
  },
  service: {
    // ex. standard, deep cleaning, move in / out
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  landMark: {
    type: String,
    required: true,
    default: null,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    default: null,
  },
  serviceLocation: {
    type: {
      lat: { type: Number },
      lng: { type: Number },
    },
    default: null,
  },
  schedule: {
    type: String,
    required: true,
  },
  cleaningDuration: {
    // time 
    type: String,
    required: true,
  },
  cost: {
    type: String,
    required: true,
  },
  timeStarted: {
    type: String,
    required: true,
  },
  timeEnded: {
    type: String,
    required: true,
  },
  status: {
    // ex. Not finished, on going, finished or canceled
    type: String,
    required: true,
    enum: ["Pending","Accepted", "On going", "Finished", "Canceled", "Rejected"],
  },
  modeOfPayment: {
    // ex. cash, gcash, bank transfer
    type: String,
    required: true,
  },
  cleanersAssigned: {
    // name of cleaners
    type: String,
    required: true,
  },
  request: {
    type: String,
    default: null,
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

function getDateValue() {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  let finaldate;

  return (finaldate = `${month} ${day}, ${year}`);
}

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;