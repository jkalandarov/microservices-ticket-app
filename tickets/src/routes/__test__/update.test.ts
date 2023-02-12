import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose'

it('returns 404 if id is not provided', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'some title', 
      price: 15
    })
    .expect(404);
});

it('returns 401 if user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'some title', 
      price: 15
    })
    .expect(401);
});

it('returns 401 if user does not own the ticket', async () => {
  const resp = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'asd',
      price: 10
    });

  await request(app)
    .put(`/api/tickets/${resp.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'qwe',
      price: 100
    })
    .expect(401);
});

it('returns 400 if title or price are invalid', async () => {
  const user = global.signin();
  const resp = await request(app)
    .post('/api/tickets')
    .set('Cookie', user)
    .send({
      title: 'asd',
      price: 10
    });
  
  await request(app)
    .put(`/api/tickets/${resp.body.id}`)
    .set('Cookie', user)
    .send({
      title: '',
      price: 20
    })
    .expect(400);
});

it('updates the ticket', async () => {
  const user = global.signin();
  const resp = await request(app)
    .post('/api/tickets')
    .set('Cookie', user)
    .send({
      title: 'asd',
      price: 10
    });
  
  await request(app)
    .put(`/api/tickets/${resp.body.id}`)
    .set('Cookie', user)
    .send({
      title: 'new title',
      price: 20
    })
    .expect(200);

  const updatedTicket = await request(app)
    .get(`/api/tickets/${resp.body.id}`)
    .send();

  expect(updatedTicket.body.title).toEqual('new title');
  expect(updatedTicket.body.price).toEqual(20);
});
