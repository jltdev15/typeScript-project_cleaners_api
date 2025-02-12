const BookingService = require('../../services/User/BookingService')

class BookingController {
    async createBooking(req, res) {
        try {
            const newBook = await BookingService.bookService(req.user.id, req.body);
            res.status(200).json({
                message: "Booking Successfully",
                content: newBook,
            })
        }
        catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    }
    async getAllBookings(req, res) {
        try {
            console.log(req.user)
            const bookingList = await BookingService.getAllBookings(req.user.id)
            res.status(200).json({
                message: "Autenticated",
                content: bookingList,
            })

        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    }

    async getSpecificBooking(req, res) {
        try {
            const { bookingId } = req.params;
            console.log(req.user);

            const book = await BookingService.getSpecificBooking(req.user.userId, bookingId);

            res.status(200).json({
                message: "Autenticated",
                content: book,
            })
        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    }

    async updateBooking(req, res) {
        try {
            const { bookingId } = req.params;
            const updates = req.body;
            const updatedBooking = await BookingService.updateBooking(req.user.userId, bookingId, updates);

            res.status(200).json({
                message: 'Booking updated successfully',
                content: updatedBooking,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async deleteBooking(req, res) {
        try {
            const { bookingId } = req.params;
            const clientBookings = await BookingService.deleteBooking(req.user.userId, bookingId)
            res.status(200).json({
                message: 'Booking deleted successfully',
                content: clientBookings,
            });

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

module.exports = new BookingController();