import express, { Request, Response, NextFunction } from 'express';
import AccountController from '../../controllers/User/AccountController';
import authMiddleware from '../../middlewares/authMiddleware';
import ValidationChecker from '../../middlewares/ValidationMiddleware';

const router = express.Router();

// Local Account
router.post("/createUser", ValidationChecker.validateRegistration as (req: Request, res: Response, next: NextFunction)=> void,
 AccountController.createUser as (req: Request, res: Response, next: NextFunction) => void , 
 authMiddleware.sendAndSaveOtp as (req: Request, res: Response) => void);


router.post(
  "/verifyUser", AccountController.verifyUserAccount as (req: Request, res: Response) => void );

router.post(
  "/completeProfile",
  authMiddleware.verifySession as (req: Request, res: Response, next: NextFunction) => void,
  AccountController.completeProfile as (req:Request, res: Response)=> void
);

export default router;