import express, { Request, Response, NextFunction } from 'express';
import passport from '../config/PassportSetup';
import AuthController from '../controllers/Auth/AuthController';
import AuthMiddleware from '../middlewares/authMiddleware';
import ValidationChecker from '../middlewares/ValidationMiddleware';
import AccountController from '../controllers/User/AccountController';

const router = express.Router();

// Local account auth routes
router.post(
    "/login",
    ValidationChecker.validateLogin as (req: Request, res: Response, next: NextFunction) => void,
    AuthController.login as (req: Request, res: Response, next: NextFunction) => void
  );
// Resend OTP
router.post("/resend", AuthController.resendOTP as (req: Request, res: Response , next: NextFunction) => void);

// Google auth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/auth/failure',
}), (req: Request, res: Response) => {
    res.redirect('http://localhost:5173/dashboard')
});

// Facebook auth routes

router.get(
    '/auth/facebook',
    passport.authenticate('facebook', { profileFields: ['displayName', 'email', 'photos'] })
  );
  
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req: Request, res: Response) => {
    res.redirect('http://localhost:5173/dashboard')
});

// Get current user - test route
router.get('/auth/user', AuthMiddleware.verifySession as (req: Request, res: Response, next: NextFunction) => void,
    AccountController.getCurrentUser as (req: Request, res: Response, next: NextFunction) => void); 

// Logout
router.get('/auth/logout', (req: Request, res: Response, next: NextFunction) => AuthController.logout(req, res, next));

export default router;