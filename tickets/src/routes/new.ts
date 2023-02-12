import express, { Request, Response } from 'express';
import { validateRequest, requireAuth } from '@jkalandaroff/common';
import { body } from 'express-validator';
const router = express.Router();

const bodyValidation = [
  body('title')
  .not()
  .isEmpty()
  .withMessage('Title is required')
];

router.post('/api/tickets', requireAuth, bodyValidation, validateRequest, (req: Request, res: Response) => {
  res.send({});
});

export { router as createTicketRouter }