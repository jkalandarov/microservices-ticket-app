import request from 'supertest';
import { app } from '../../app';

it('returns 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('returns 400 on invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.',
      password: 'password'
    })
    .expect(400);
});

it('returns 400 on invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'pa'
    })
    .expect(400);
});

it('returns 400 on missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: ''
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      password: ''
    })
    .expect(400);
});

it('duplicate emails not allowed', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.',
      password: 'password'
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
});