const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    serviceID: {
        type: Number,
        required: true,
    },
    serviceName: {
        type: String,
        required: true,
        enum: ["Standard Cleaning", "Deep Cleaning", "Move In/Move Out ", ]
    },
    serviceDescription: {
        type: String,
        required: true,
    },
    servicePrice: {
        type: Number,
        required: true,
    },
    serviceDuration: {
        type: String,
        required: true,
    },
    serviceCategory: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: getDateValue(),
    },
})

function getDateValue() {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    let finaldate;
  
    return (finaldate = `${month} ${day}, ${year}`);
  }
  

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;