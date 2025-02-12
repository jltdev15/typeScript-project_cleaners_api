import crypto from 'crypto';

const generateRandomOTP = (length: number): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let otp = '';
  const bytes = crypto.randomBytes(length);
  for (let i = 0; i < length; i++) {
    otp += chars[bytes[i] % chars.length];
  }
  return otp;
};

export default generateRandomOTP;