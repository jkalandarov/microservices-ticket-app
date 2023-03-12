import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';
import { TicketUpdatedPublisher } from '../events/publishers/tickets-updated-publisher';
import { nastWrapper } from '../nats-wrapper';
import { 
  validateRequest, 
  NotFoundError, 
  requireAuth, 
  NotAuthorizedError 
} from '@sgtickets/common';

const router = express.Router();

const bodyValidation = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Title is required')
]

router.put('/api/tickets/:id', requireAuth, bodyValidation, validateRequest, async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if(!ticket) throw new NotFoundError();

  if(ticket.userId !== req.currentUser?.id) throw new NotAuthorizedError();

  ticket.set({
    title: req.body.title,
    price: req.body.price
  });

  await ticket.save();
  new TicketUpdatedPublisher(nastWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    userId: ticket.userId,
    price: ticket.price,
    version: 123
  });

  res.send(ticket);
});

export { router as updateTicketRouter };