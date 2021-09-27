const request = require('supertest');
const app = require('../app');

// describe('GET /users', () => {
//   const token = process.env.TOKEN;
//   describe('GET /users', () => {
//     it('Shoud fetch all users', async () => {
//       const res = await request(app)
//       .get('/users')
//       .set('Authorization', `Bearer ${token}`)
//       expect(res.statusCode).toEqual(200);
//     })
//   })
// });

test('/users/addUser', async () => {
    await request(app)
    .post('/users/addUser')
    .send(
        {
            login:'user3',
            password:'test1',
            birthdate: '1990-02-02'
        }
    )
    expect(200)
})

test('/users/login', async () => {
    await request(app)
    .post('/users/login')
    .send(
        {
            login:'user1',
            password:'test1'
        }
    )
    expect(200)
})

const request = require('supertest');
const app = require('../app');
require('dotenv').config();
describe('GET /users', () => {
  const token = process.env.TOKEN;
  describe('GET /users', () => {
    it('Shoud fetch all users', async () => {
      const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      expect(res.statusCode).toEqual(200);
    })
  })
});

