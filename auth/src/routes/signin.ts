import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

const bodyValidation = [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('You must provide a password')
];

router.post('/api/users/signin', bodyValidation, validateRequest, async (req: Request, res: Response) => {
  
});

export { router as signinRouter }