import request from 'supertest';
import { app } from '../../app';

it('has a post route handler to /api/tickets', async () => {
  const response = await request(app).post('/api/tickets').send({});
  
  expect(response.status).not.toEqual(404);
});

it('can only be accessed if user is signed in', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).not.toEqual(200);
});

it('returns status other than 401 if user is signed in', async () => {
  const response = await request(app)
  .post('/api/tickets')
  .set('Cookie', global.signin())
  .send({});
  
  expect(response.status).not.toEqual(401);
});

it('returns an error if title is invalid', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: '',
      price: 10
    })
    .expect(401);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      price: 10
    })
    .expect(401);
});

it('returns an error if price is invalid', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'sfsf',
      price: -10
    })
    .expect(401);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'sfsf',
    })
    .expect(401);
});

it('creates a ticket with valid inputs', async () => {
  
});

