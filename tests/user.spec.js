const request = require('supertest');
const app = require('../app');

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

