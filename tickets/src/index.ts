import mongoose from 'mongoose';
import { app } from './app';
import { nastWrapper } from './nats-wrapper';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await nastWrapper.connect('ticketing', 'asddf', 'http://nats-srv:4222');

    nastWrapper.client.on('close', () => {
      console.log('NATS connection closed...');
      process.exit();
    });

    process.on('SIGINT', () => nastWrapper.client.close());
    process.on('SIGTERM', () => nastWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
