import User, { IUser } from "../../models/User.Model.js";
import Otp, { IOtp } from "../../models/OTP.Model.js";
import Customer, { ICustomer } from "../../models/Customer.Model.js";
import bcrypt from "bcryptjs";

interface CreateUserPayload {
  email: string;
  password: string;
  fullName: string;
}

interface VerifyUserPayload {
  email: string;
  otp: string;
}

interface CompleteProfilePayload {
  fullName: string;
  contactNumber: number;
  street: string;
  brgy: string;
  municipality: string;
  province: string;
}

class AccountService {
  async createUser(payload: CreateUserPayload): Promise<{ email: string }> {
    const hashedPassword = await bcrypt.hash(payload.password, 12);

    const newUser = new User({
      email: payload.email,
      password: hashedPassword,
      role: 'Customer',
      registrationMethod: 'local'
    });

    const customerInformation = new Customer({
      fullName: payload.fullName
    });

    // Save both user and customer information in parallel
    await Promise.all([newUser.save(), customerInformation.save()]);

    // Update the user profile with the customer information
    newUser.profile = customerInformation._id;
    await newUser.save();
    return { email: newUser.email };
  }

  async verifyUser(payload: VerifyUserPayload): Promise<string> {
    const foundUser = await Otp.findOne({ userEmail: payload.email });
    if (!foundUser) return 'You entered an expired OTP';
    if (foundUser.otp === payload.otp) {
      const result = await User.updateOne({
        email: payload.email
      }, { $set: { status: 1 } });
      if (result.matchedCount > 0 && result.modifiedCount) return 'Account verified!';
    }
    return 'Invalid OTP';
  }

  async completeProfile(id: string, payload: CompleteProfilePayload): Promise<void> {
    const newProfile = new Customer({
      fullName: payload.fullName,
      contactNumber: payload.contactNumber,
      street: payload.street,
      brgy: payload.brgy,
      municipality: payload.municipality,
      province: payload.province,
    });
    await newProfile.save();

    const userInfo = await User.findById(id).exec();
    if (userInfo) {
      userInfo.profile = newProfile._id;
      userInfo.isProfileComplete = true;
      await userInfo.save();
    }
  }
}

export default new AccountService();