const generateBookId = require("../../utils/generateBookId");
const Booking = require("../../models/Booking.Model");
const User = require("../../models/User.Model");

class BookingService {
  async bookService(id, payload) {
    const bookingID = await generateBookId();
    const newBook = new Booking({
      bookingID,
      service: payload.service,
      contactPerson: payload.contactPerson,
      landMark: payload.landMark,
      contactNumber: payload.contactNumber,
      address: payload.address,
      serviceLocation: payload.serviceLocation,
      cleaningDuration: payload.cleaningDuration,
      schedule: payload.schedule,
      cost: payload.cost,
      timeStarted: payload.timeStarted,
      timeEnded: payload.timeEnded,
      status: "Pending",
      modeOfPayment: payload.modeOfPayment,
      cleanersAssigned: payload.cleanersAssigned,
      request: payload.request,
    });
    await newBook.save();

    const client = await User.findOne({ id: id }).exec();
    console.log(client);

    client.bookings.push(newBook._id);
    await client.save();

    return newBook;
  }

  async getAllBookings(id) {
    const client = await User.findOne({ id: id }).populate("bookings").exec();
    console.log(client);

    if (client.bookings.length == 0) {
      return "The User has 0 Booking(s)";
    }

    return client.bookings;
  }

  async getSpecificBooking(userId, bookingId) {
    const booking = await Booking.findOne({ bookingID: bookingId }).exec();
    const user = await User.findById(userId).exec();

    // if (!user.bookings.includes(booking._id)) {
    //     return {
    //         status: 403,
    //         message: 'Booking not found in user bookings',
    //         content: ""
    //     };
    // }

    return booking;
  }

  async updateBooking(userId, bookingId, updates) {
    const updatedBooking = await Booking.findOneAndUpdate(
      { bookingID: bookingId },
      {
        service: updates.service,
        contactPerson: updates.contactPerson,
        contactNumber: updates.contactNumber,
        serviceLocation: updates.serviceLocation,
        cleaningDuration: updates.cleaningDuration,
        schedule: updates.schedule,
        cost: updates.cost,
        timeStarted: updates.timeStarted,
        timeEnded: updates.timeEnded,
        status: updates.status, // Update status if customer want to cancel booking
        modeOfPayment: updates.modeOfPayment,
        request: updates.request,
        // Add if needed
      },
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedBooking;
  }

  async deleteBooking(userId, bookingId) {
    const user = await User.findById(userId);

    const deletedBooking = await Booking.findOneAndDelete({
      bookingID: bookingId,
    });

    // Remove the booking reference from user's bookings array
    user.bookings = await user.bookings.filter(
      (booking) => booking.toString() !== deletedBooking._id.toString()
    );

    await user.save();
    // return user;

    return user.bookings;
  }
}

module.exports = new BookingService();
