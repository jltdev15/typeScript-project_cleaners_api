const express = require("express");
const router = express.Router();
const adminUserController = require("../../controllers/Admin/UserManagementController");
const adminBookingController = require("../../controllers/Admin/BookingManagementController");
const adminServiceController = require("../../controllers/Admin/ServiceManagementController")
//User management
// router.post("/createAdmin", adminController.createAdmin);

router.get("/getAllUsers/", adminUserController.getAllUsers);

router.get("/getUser/:clientId", adminUserController.getUser);

router.patch("/updateClient/:clientId", adminUserController.updateClient);

router.delete("/deleteClient/:clientId", adminUserController.deleteClient);

//Booking management
router.get("/getAllBookings/", adminBookingController.getAllBooking);

router.get("/getBooking/:id", adminBookingController.getBooking);

router.patch(
  "/assignCleaner/:bookingId",
  adminBookingController.assignCleaner
);

router.delete(
  "/deleteUserBooking/:clientId/:bookingId",
  adminBookingController.deleteUserBooking
);

router.post(
  "/filterBookings",
  adminBookingController.filterBookings
)

router.patch(
  "/rescheduleBooking/:bookingId",
  adminBookingController.rescheduleBooking
);

router.patch(
  "/controlBookingStatus/:bookingId",
  adminBookingController.controlBookingStatus
)

// Service Management

router.post("/createService", adminServiceController.createService);

router.get("/getAllServices", adminServiceController.getAllServices);

router.get("/getService/:serviceId", adminServiceController.getService);

router.patch("/updateService/:serviceId", adminServiceController.updateService);

module.exports = router;
