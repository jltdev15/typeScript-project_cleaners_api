import User, { IUser } from "../../models/User.Model.js";
import Customer, { ICustomer } from '../../models/Customer.Model';
import Otp, { IOtp } from "../../models/OTP.Model";
import { generateToken } from "../../utils/jwtUtils";
import generateOtp from '../../utils/email/generateOtp';
import emailQueue from '../../utils/email/emailQueue.js';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as FacebookProfile } from 'passport-facebook';

class AuthService {
    async findOrCreateGoogleUser(profile: GoogleProfile): Promise<IUser> {
        // @ts-ignore
        const email = profile.emails[0].value;

        // Step 1: Check if a user with the same email already exists
        let user = await User.findOne({ email });

        if (user) {
            // Step 2: If the user exists but doesn't have a googleId, link the Google account
            if (!user.googleId) {
                user.googleId = profile.id; // Link the Google ID to this existing user
                  // @ts-ignore
                user.avatar = user.avatar || profile.photos[0].value; // Update avatar if missing
                user.registrationMethod = "google";
                user.status = 1;
                await user.save();
            }
        } else {
            user = new User({
                googleId: profile.id,
                email,
                  // @ts-ignore
                avatar: profile.photos[0].value,
                registrationMethod: "google",
                status: 1,
            });

            await user.save();
            const customerInformation = new Customer({
                fullName: profile.displayName
            });

            await customerInformation.save();

            user.profile = customerInformation._id;

            await user.save();
        }

        return user;
    }

    // async findOrCreateFacebookUser(profile: FacebookProfile): Promise<IUser> {
    //     const facebookId = profile.id;
    //     let user = await User.findOne({ facebookId });

    //     if (user) {
    //         if (!user.facebookId) {
    //             user.facebookId = profile.id;
    //             user.avatar = user.avatar || profile.photos[0].value;
    //             user.registrationMethod = "facebook";
    //             user.status = 1;
    //             await user.save();
    //         }
    //     } else {
    //         user = new User({
    //             facebookId: profile.id,
    //             email: profile.emails ? profile.emails[0].value : null,
    //             avatar: profile.photos[0].value,
    //             registrationMethod: "facebook",
    //             status: 1,
    //         });
    //         await user.save();

    //         const customerInformation = new Customer({
    //             fullName: profile.displayName
    //         });

    //         await customerInformation.save();

    //         user.profile = customerInformation._id;

    //         await user.save();
    //     }

    //     return user;
    // }

    async loginLocal(userId: string): Promise<string> {
        return generateToken(userId);
    }

    async resendOTP(email: string): Promise<string> {
        try {
            let otpData = await Otp.findOne({ userEmail: email });
            if (otpData) await otpData.deleteOne();
            const generatedOTP = generateOtp(6);
            const newOTP = new Otp({
                userEmail: email,
                otp: generatedOTP,
                createdAt: Date.now(),
            });

            await Promise.all([
                newOTP.save(),
                emailQueue.add('sendEmail', {
                    email: email,
                    subject: "Account Verification",
                    templateData: {
                        email: email,
                        oneTimePin: generatedOTP,
                    },
                    templatePath: "OTP",
                })
            ]);

            return 'The new 6 digit OTP has been sent to your email address';
        } catch (error) {
            return (error as Error).message
        }
    }
}

export default new AuthService();