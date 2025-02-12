const BookingManagement = require('../../services/Admin/BookingManagement');

class BookingManagementController {
  async getAllBooking(req, res) {
    try {
      const response = await BookingManagement.getAllBookings();
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
  async getBooking(req, res) {
    try {
      const { id } = req.params;
      const response = await BookingManagement.getBooking(id);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async assignCleaner(req, res) {
    try {
      const { bookingId } = req.params;

      const response = await BookingManagement.assignCleaner(
        bookingId,
        req.body
      );

      res.status(200).json({
        message: "Booking updated successfully",
        content: response,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteUserBooking(req, res) {
    try {
      const { clientId, bookingId } = req.params;
      const response = await BookingManagement.deleteUserBooking(
        clientId,
        bookingId
      );
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async filterBookings(req, res) {
    try {
      const filters = req.body;
      const response = await BookingManagement.filterBookings(filters);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async rescheduleBooking(req, res) {
    try {
      const { bookingId } = req.params;
      const { newDate } = req.body;

      const response = await BookingManagement.rescheduleBooking(bookingId, newDate);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async controlBookingStatus(req, res) {
    try {
      const { bookingId } = req.params;

      const response = await BookingManagement.controlBookingStatus(bookingId, req.body);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new BookingManagementController();