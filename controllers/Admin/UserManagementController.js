const UserManagement = require("../../services/Admin/UserManagement")

class UserManagementController {
  async getAllUsers(req, res) {
    try {
      const response = await UserManagement.getAllUsers();

      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async getUser(req, res) {
    try {
      const { clientId } = req.params;
      console.log(clientId);

      const response = await UserManagement.getUser(clientId);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async updateClient(req, res) {
    try {
      const { clientId } = req.params;
      console.log(req.body);
      const response = await UserManagement.updateClient(clientId, req.body);

      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  async deleteClient(req, res) {
    try {
      const { clientId } = req.params;
      const response = await UserManagement.deleteClient(clientId);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = new UserManagementController();