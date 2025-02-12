import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User.Model.js';
import bcrypt from 'bcryptjs';

interface CustomRequest extends Request {
  id?: string;
}

class ValidationChecker {
  async validateRegistration(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email } = req.body;
      const userData = await User.findOne({ email: email });
      if (userData && userData.status === 1) {
        return res.status(409).json("This email has already been taken");
      }
      if (userData && userData.status === 0) {
        return res.status(409).json(`This email you've used is already registered but not verified.`);
      }
      next();
    } catch (error) {
      return res.status(500).json("Internal Server Error");
    }
  }

  async validateLogin(req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json("Email is required");
      }
      if (!password) {
        return res.status(400).json("Password is required");
      }
      const userData = await User.findOne({ email: email }) as IUser;

      if (!userData) {
        return res.status(409).json("This email is not registered");
      }
      const isMatch = await bcrypt.compare(password, userData.password);

      if (!isMatch) throw new Error('Invalid Credentials');

      if (userData && userData.status === 0) {
        return res.status(409).json(`The email you've used is already registered but not verified.`);
      }
      req.id = userData._id.toString();
      next();
    } catch (error) {
      return res.status(500).json((error as Error).message);
    }
  }
}

export default new ValidationChecker();