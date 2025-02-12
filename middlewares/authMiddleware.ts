import { Request, Response, NextFunction } from 'express';
import { verifyToken } from "../utils/jwtUtils.js";
import generateOtp from "../utils/email/generateOtp.js";
import sendEmail from "../utils/email/sendEmail.js";
import emailQueue from '../utils/email/emailQueue.js';
import Otp, { IOtp } from "../models/OTP.Model.js";

interface CustomRequest extends Request {
  user?: any;
  email?: string;
}

class AuthMiddleware {
  async verifySession(req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> {
    let token = req.cookies.jwt;
    if (req.isAuthenticated()) {
      next();
    } else if (token) {
      try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
      } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
    } else {
      res.status(401).json({ message: 'Not authenticated' });
    }
  }

  async sendAndSaveOtp(req: CustomRequest, res: Response): Promise<Response | void> {
    try {
      const generatedOTP = generateOtp(6);
      const newOTP = new Otp({
        userEmail: req.email!,
        otp: generatedOTP,
        createdAt: Date.now(),
      });

      await Promise.all([
        newOTP.save(),
        emailQueue.add('sendEmail', {
          email: req.email!,
          subject: "Account Verification",
          templateData: {
            email: req.email!,
            oneTimePin: generatedOTP,
          },
          templatePath: "OTP",
        })
      ]);

      res.status(201).json('The 6 digit OTP has been sent');
    } catch (error) {
      console.error('Error in sendAndSaveOtp:', error);
      res.status(500).json({
        message: (error as Error).message,
      });
    }
  }
}

export default new AuthMiddleware();