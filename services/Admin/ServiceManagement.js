const Service = require("../../models/Service.Model");
const generateServiceId = require("../../utils/generateServiceId");

class ServiceManagement {
    async createService(payload) {
        const newService = new Service({
            serviceID: await generateServiceId(),
            serviceName: payload.serviceName,
            serviceDescription: payload.serviceDescription,
            servicePrice: payload.servicePrice,
            serviceDuration: payload.serviceDuration,
            serviceCategory: payload.serviceCategory,
        });
        await newService.save();
        return { serviceID: newService.serviceID };
    }
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
    
      async updateService(id, payload) {
        const service = await Service.findOneAndUpdate(
          { serviceID: id },
          {
            serviceDescription: payload.serviceDescription,
            servicePrice: payload.servicePrice,
            serviceDuration: payload.serviceDuration,
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return service;
      }
    
}

module.exports = new ServiceManagement;