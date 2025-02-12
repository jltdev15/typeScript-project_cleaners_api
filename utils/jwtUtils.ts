import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';

dotenv.config();

const generateToken = (userId: string): string => {
  if (!process.env.ADMINSECRET) {
    throw new Error('ADMINSECRET is not defined in the environment variables');
  }
  return jwt.sign({ userId }, process.env.ADMINSECRET, { expiresIn: "5h" });
};

const verifyToken = (token: string): string | JwtPayload => {
  if (!process.env.ADMINSECRET) {
    throw new Error('ADMINSECRET is not defined in the environment variables');
  }
  return jwt.verify(token, process.env.ADMINSECRET);
};

export { generateToken, verifyToken };