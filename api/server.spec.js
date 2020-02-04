const request = require('supertest');
const server = require('./server');
const Users = require('../helpers/users-model');
const db = require('../data/dbConfig');

describe('server.js', () => {
  beforeEach(async () => {
    await db('users').truncate(); //clears table for testing purposes for each test
  })
  //********************
  //GENERAL
  //********************
  it('runs the tests', () => {
    expect(true).toBe(true);
  })
  //********************
  //REGISTER
  //********************
  describe('POST /auth/register', () => {
    // it('should return JSON', async () => {
    //   return request(server).post('/api/auth/register')
    //     .then(res => {
    //       //check that request returns JSON
    //       expect(res.type).toMatch(/json/i)
    //     })
    // })
    it('should add a user to the database', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds a user to the database
      await Users.add({
        username: 'samus aran',
        password: 'zebes'
      })
      //open the db and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers).toHaveLength(1);
    })
    it('check the name of the added user', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds a user to the database
      await Users.add({
        username: 'solid snake',
        password: 'FOXDIE'
      })
      //open the db and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers[0].username).toBe('solid snake');
    })
    it('should return 201 OK status', () => {
      return request(server).post('/api/auth/register')
        .send({
          username: 'Joker',
          password: 'phantomthieves'
        })
        .expect(201);
    })
  })
  //********************
  //LOGIN
  //********************
  describe('POST /api/auth/login', () => {
    it('should return JSON', async () => {
      return request(server).post('/api/auth/login')
      .then(res => {
        //check that request returns JSON
        expect(res.type).toMatch(/json/i)
      })
    })
    it('should return 200 OK status when logged in', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy'
        });
      expect(res.status).toEqual(200);
    })
  })
  //********************
  //JOKES
  //********************
  describe('GET /jokes', () => {
    it('should return 401 error status for user route if no token', () => {
      return request(server).get('/api/jokes')
        .then(res => {
          //check that status code is 200
          expect(res.status).toBe(401);
        })
    })
    it('should return JSON', async () => {
      return request(server).get('/api/jokes')
        .then(res => {
          //check that request returns JSON
          expect(res.type).toMatch(/json/i)
        })
    })
    it('should get a list of jokes on successful login', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy'
        });
      expect(res.status).toEqual(200);
      // handle the token
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // grant access to jokes with token
      res = await request(server)
        .get('/api/jokes')
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.body).toBeInstanceOf(Array);
      expect(res.status).toBe(200);
    })
  })
})