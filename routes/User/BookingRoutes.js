const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/User/BookingController');
const authMiddleware = require('../../middlewares/authMiddleware');
const rateLimiter = require('../../middlewares/rateLimiterMiddleware');

router.post(
    '/bookService',
    authMiddleware.verifySession,
    rateLimiter.BookingLimiter(),
    bookingController.createBooking
)

router.get(
    '/getAllBookings',
    authMiddleware.verifySession,
    bookingController.getAllBookings
)

router.get(
    '/getSpecificBooking/:bookingId',
    authMiddleware.verifySession,
    bookingController.getSpecificBooking
)

router.patch(
    '/updateBooking/:bookingId',
    authMiddleware.verifySession,
    bookingController.updateBooking
);

router.delete(
    '/deleteBooking/:bookingId',
    authMiddleware.verifySession,
    bookingController.deleteBooking
);


module.exports = router