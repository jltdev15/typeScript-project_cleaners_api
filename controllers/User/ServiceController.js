const FetchServices = require('../../services/User/ServiceManagementService');

class ServiceController {

    async getAllServices(req, res) {
        try {
            const response = await FetchServices.getAllServices();

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

            const response = await FetchServices.getService(serviceId);
            res.status(201).json(response);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
}

module.exports = new ServiceController();