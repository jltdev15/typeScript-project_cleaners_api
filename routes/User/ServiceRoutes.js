const express = require("express");
const router = express.Router();
const ServiceController = require('../../controllers/User/ServiceController');

router.get("/getAllServices", ServiceController.getAllServices);

router.get("/getService/:serviceId", ServiceController.getService);

module.exports = router;
