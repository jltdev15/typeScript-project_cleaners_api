import { Request, Response, NextFunction } from 'express';
import AccountService from '../../services/User/AccountService';

interface CustomRequest extends Request {
  user?: any;
  email?: string;
}

class AccountController {
  async getCurrentUser(req: CustomRequest, res: Response): Promise<Response> {
    try {
      if (req.user) {
        return res.status(200).json(req.user);
      }
      return res.status(404).json({ message: 'User not found' });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async createUser(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await AccountService.createUser(req.body);
      req.email = response.email;
      next();
    } catch (error) {
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async verifyUserAccount(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const response = await AccountService.verifyUser(req.body);
      if (response === 'Account verified!') return res.status(200).json(response);
      if (response === 'Invalid OTP') return res.status(409).json(response);
      if (response === 'You entered an expired OTP') return res.status(409).json(response);
      return res.status(400).json({ message: 'Unknown error' });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async completeProfile(req: CustomRequest, res: Response): Promise<Response> {
    try {
      await AccountService.completeProfile(req.user.userId, req.body);
      return res.status(201).json({
        message: "Profile completed",
      });
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}

export default new AccountController();