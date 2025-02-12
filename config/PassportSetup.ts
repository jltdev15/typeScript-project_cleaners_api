import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy as GoogleStrategy, VerifyCallback as GoogleVerifyCallback } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy, Profile as FacebookProfile, VerifyFunction as FacebookVerifyFunction } from 'passport-facebook';
import AuthService from '../services/Auth/AuthService.js';
import User, { IUser } from '../models/User.Model.js';
import { Express } from 'express';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    callbackURL: 'http://localhost:4000/api/v1/auth/google/callback',
  },
  async (accessToken: string, refreshToken: string, profile: any, done: GoogleVerifyCallback) => {
    try {
      const user = await AuthService.findOrCreateGoogleUser(profile);      
      done(null, user);
    } catch (error) {
      done(error as Error, undefined);
    }
  }
));

// passport.use(new FacebookStrategy(
//   {
//     clientID: process.env.FACEBOOK_APP_ID as string, // Type assertion to ensure it's a string
//     clientSecret: process.env.FACEBOOK_APP_SECRET as string, // Type assertion to ensure it's a string
//     callbackURL: "http://localhost:4000/api/v1/auth/facebook/callback",
//     profileFields: ['displayName', 'email', 'photos'],
//   },
//   async (
//     accessToken: string,
//     refreshToken: string,
//     profile: FacebookProfile,
//     cb: FacebookVerifyFunction
//   ): Promise<void> => {
//     try {
//       // Assuming findOrCreateFacebookUser returns an IUser object
//       const user = await AuthService.findOrCreateFacebookUser(profile);
//       cb(null, user); // User is passed to the callback
//     } catch (err) {
//       cb(err as Error, null); // Handle errors and pass null for user
//     }
//   }
// ));

// @ts-ignore
passport.serializeUser((user: IUser, done: (err: any, id?: string) => void): void => {
  done(null, user._id.toString() as string); // Type assertion to ensure _id is treated as a string
});

passport.deserializeUser(async (id: string, done: (err: any, user?: IUser | null) => void) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error as Error, null);
  }
});

export default passport;