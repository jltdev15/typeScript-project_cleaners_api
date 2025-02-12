const ServiceManagement = require("../../services/Admin/ServiceManagement");

class ServiceManagementController {
    async createService(req, res) {
        try {
            const response = await ServiceManagement.createService(req.body);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    async getAllServices(req, res) {
        try {
            const response = await ServiceManagement.getAllServices();

            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    async getService(req, res) {
        try {
            const { serviceId } = req.params;
            console.log(serviceId);

            const response = await ServiceManagement.getService(serviceId);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }

    async updateService(req, res) {
        try {
            const { serviceId } = req.params;
            console.log(req.body);
            const response = await ServiceManagement.updateService(serviceId, req.body);

            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
}

module.exports = new ServiceManagementController();