const Service = require("../../models/Service.Model");

class FetchServices {
  async getAllServices() {
    const services = await Service.find({}).exec();
    console.log("Services:", services);
    return {
      message: "Authenticated",
      content: services,
    };
  }

  async getService(id) {
    const service = await Service.findOne({ serviceID: id });
    console.log("Service:", service);
    return {
      message: "Authenticated",
      content: service,
    };
  }
}

module.exports = new FetchServices();
