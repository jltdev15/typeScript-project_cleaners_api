import { Request, Response, NextFunction } from 'express';
import AuthService from '../../services/Auth/AuthService';

interface CustomRequest extends Request {
  id?: string;
}

class AuthController {
  async login(req: CustomRequest, res: Response): Promise<Response> {
    try {
      const token = await AuthService.loginLocal(req.id!);

      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      // res.setHeader("Authorization", `Bearer ${token}`);
      return res.status(200).json('Login Successful!');
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }

  async handleGoogleAuthCallback(req: Request, res: Response): Promise<Response> {
    return res.json(req.user);
  }

  async handleFacebookAuthCallback(req: Request, res: Response): Promise<Response> {
    return res.json(req.user);
  }

  // Controller for testing the user if authenticated, this must be moved to middleware
  async getCurrentUser(req: Request, res: Response): Promise<Response> {
    if (req.isAuthenticated()) {
      return res.json(req.user);
    } else {
      return res.status(401).json({ message: 'Not authenticated' });
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    req.logout((err) => {
      if (err) return next(err);
      res.clearCookie('connect.sid'); // Clear the session cookie
      res.json({ message: 'Logout successful' });
    });
  }

  async resendOTP(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    if (email === undefined || email === "") return res.status(400).json({ message: "Email is required" });
    try {
      const response = await AuthService.resendOTP(email);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}

export default new AuthController();