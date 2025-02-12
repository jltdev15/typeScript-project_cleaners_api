const Admin = require("../../models/Admin.Model");
const User = require("../../models/User.Model");
const Cleaner = require("../../models/Cleaner.Model");
const Booking = require("../../models/Booking.Model");
const bcrypt = require("bcryptjs");

class BookingManagement {
  async getAllBookings() {
    const bookings = await Booking.find({}).exec();
    console.log("Bookings:", bookings);
    return {
      message: "Authenticated",
      content: bookings,
    };
  }

  async getBooking(id) {
    const booking = await Booking.findOne({ bookingID: id });
    console.log("Booking:", booking);
    return {
      message: "Authenticated",
      content: booking,
    };
  }

  async assignCleaner(bookingId, payload) {
    const updatedBooking = await Booking.findOneAndUpdate(
      { bookingID: bookingId },
      {
        cleanersAssigned: payload.cleanersAssigned,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    updatedBooking.save();

    return updatedBooking;
  }

  async deleteUserBooking(clientId, bookingId) {
    const client = await User.findById(clientId);

    if (!client) {
      throw new Error("Client not found");
    }

    const bookingToDelete = await Booking.findOne({
      bookingID: bookingId,
    }).exec();

    if (!bookingToDelete) {
      throw new Error("Booking not found");
    }

    // Remove the booking reference from user's bookings array
    client.bookings = await client.bookings.filter(
      (booking) => booking.toString() !== bookingToDelete._id.toString()
    );

    await client.save();

    // Delete booking
    await Booking.findOneAndDelete({ bookingID: bookingId });

    return {
      message: "Booking Deleted",
    };
  }

  async filterBookings(filters) {
    // Construct the query dynamically
    const query = {};

    if (filters.service) {
      query.service = filters.service;
    }
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.schedule) {
      query.schedule = filters.schedule;
    }
    if (filters.cleanersAssigned) {
      query.cleanersAssigned = filters.cleanersAssigned;
    }
    if (filters.cost) {
      query.cost = filters.cost;
    }

    // Execute the query
    const filteredBookings = await Booking.find(query).exec();

    return filteredBookings;
  }

  async controlBookingStatus(bookingId, payload) {
    const booking = await Booking.findOneAndUpdate(
      { bookingID: bookingId },
      { status: payload.status }
    ).exec();
    booking.save();
    if (payload.status == "Cancelled") {
      return {
        message: "Booking Canceled",
        content: booking,
        reason: payload.reason,
      };
    }

    return {
      message: "Booking Approved",
      content: booking,
    };
  }

  async rescheduleBooking(bookingId, newDate) {
    const booking = await Booking.findOneAndUpdate(
      { bookingID: bookingId },
      { schedule: newDate },
      { new: true, runValidators: true }
    ).exec();

    return {
      message: "Booking Rescheduled",
      content: booking,
    };
  }
}
module.exports = new BookingManagement();
