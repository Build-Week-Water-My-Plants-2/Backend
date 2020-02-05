const request = require('supertest');
const server = require('./server');
const Users = require('../helpers/users-model');
const Plants = require('../helpers/plants-model');
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
    it('should add a user to the database', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds a user to the database
      await Users.add({
        username: 'cloudStrife',
        password: 'midgar',
        email: 'cloud@gaea.com',
        phone_number: '4321468943'
      })
      //open the db and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers).toHaveLength(1);
    })
    it('check the name of the added user is correct', async () => {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds a user to the database
      await Users.add({
        username: 'solid snake',
        password: 'FOXDIE',
        email: 'snake@shadowmoses.com',
        phone_number: '8428502451'
      })
      //open the db and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers[0].username).toBe('solid snake');
    })
    it('should return 201 OK status', () => {
      return request(server).post('/api/auth/register')
        .send({
          username: 'Joker',
          password: 'phantomthieves',
          email: 'joker@shibuya.com',
          phone_number: '0593756174'
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
          password: 'jiggy',
          email: 'banjo64@spiralmountain.com',
          phone_number: '9482757223'
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
  //GET USERS
  //********************
  describe('GET /users', () => {
    it('should return 401 error status for user route if no token', () => {
      return request(server).get('/api/users')
        .then(res => {
          //check that status code is 401
          expect(res.status).toBe(401);
        })
    })
    it('should return JSON', async () => {
      return request(server).get('/api/users')
        .then(res => {
          //check that request returns JSON
          expect(res.type).toMatch(/json/i)
        })
    })
    it('should get a list of users on successful login with token', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy',
          email: 'banjo64@spiralmountain.com',
          phone_number: '9482757223'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy',
          email: 'banjo64@spiralmountain.com',
          phone_number: '9482757223'
        });
      expect(res.status).toEqual(200);
      // handle the token
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // grant access to users with token
      res = await request(server)
        .get('/api/users')
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.body).toBeInstanceOf(Array);
      expect(res.status).toBe(200);
    })
  })
  //********************
  //GET USER BY ID
  //********************
  describe('GET /users/:id', () => {
    it('should return 401 error status for user route if no token', () => {
      return request(server).get('/api/users/1')
        .then(res => {
          //check that status code is 401
          expect(res.status).toBe(401);
        })
    })
    it('should get a specific user on successful login with token', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy',
          email: 'banjo64@spiralmountain.com',
          phone_number: '9482757223'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy',
          email: 'banjo64@spiralmountain.com',
          phone_number: '9482757223'
        });
      expect(res.status).toEqual(200);
      // handle the token
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // grant access to specified user with token
      res = await request(server)
        .get('/api/users/1')
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.body).toBeInstanceOf(Object);
      expect(res.status).toBe(200);
    })
  })
  //********************
  //UPDATE USER
  //********************
  // localhost: 4000 / api / users /: id
  //********************
  //DELETE USER
  //********************
  describe('DELETE /api/users/:id', () => {
    it('should return 200 OK status code when successfully deleted', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy',
          email: 'banjo64@spiralmountain.com',
          phone_number: '9482757223'
        });
      expect(res.status).toEqual(201);
      // handle the token
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // delete the user by id
      res = await request(server)
        .delete('/api/users/1')
      expect(res.status).toEqual(200);
    })
  })
  //********************
  //GET USER'S PLANTS
  //********************
  // GET localhost:4000/api/users/:id/plants
  //********************
  //ADD PLANT TO USER
  //********************
  // localhost:4000/api/users/:id/plants
  //********************
  //GET PLANTS
  //********************
  describe('GET /plants', () => {
    it('should return 401 error status for user route if no token', () => {
      return request(server).get('/api/plants')
        .then(res => {
          //check that status code is 401
          expect(res.status).toBe(401);
        })
    })
    it('should return JSON', async () => {
      return request(server).get('/api/plants')
        .then(res => {
          //check that request returns JSON
          expect(res.type).toMatch(/json/i)
        })
    })
    it('should get a list of plants on successful login with token', async () => {
      // register a new user
      res = await request(server)
        .post('/api/auth/register')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy',
          email: 'banjo64@spiralmountain.com',
          phone_number: '9482757223'
        });
      expect(res.status).toEqual(201);
      // login with the newly created user
      res = await request(server)
        .post('/api/auth/login')
        .send({
          username: 'banjo-kazooie',
          password: 'jiggy',
          email: 'banjo64@spiralmountain.com',
          phone_number: '9482757223'
        });
      expect(res.status).toEqual(200);
      // handle the token
      const token = res.body.token;
      expect(token.length).toBeGreaterThan(20);
      // grant access to plants with token
      res = await request(server)
        .get('/api/plants')
        .set({ authorization: token, Accept: 'application/json' });
      expect(res.body).toBeInstanceOf(Array);
      expect(res.status).toBe(200);
    })
  })
  //********************
  //GET PLANT BY ID
  //********************
  // localhost: 4000 / api / plants /: id
  //********************
  //UPDATE PLANT
  //********************
  // localhost: 4000 / api / plants /: id
  //********************
  //DELETE PLANT
  //********************
  // localhost: 4000 / api / plants /: id
})

//*********************************************************************************************************************
//USER MODEL TESTS
//*********************************************************************************************************************

describe('users model', function () {
  beforeEach(async () => {
    await db('users').truncate();
  })

  describe('find()', function () {
    it('GET list of all users from the database', async function () {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      // call add passing three users
      await Users.add({
        username: 'cuphead',
        password: 'swellbattle',
        email: 'cuphead@inkewllisle.com',
        phone_number: '6666666666'
      });
      await Users.add({
        username: 'mugman',
        password: 'thingsareheatingup',
        email: 'mugman@inkewllisle.com',
        phone_number: '9999999999'
      });
      await Users.add({
        username: 'kingdice',
        password: 'dontyoumesswithhim',
        email: 'king@inkewllisle.com',
        phone_number: '7777777777'
      });
      // open the database and see that the new users are there
      const newusers = await db('users');
      expect(newusers).toHaveLength(3);
      expect(users).not.toBeNull();
    })
  })
  describe('findById(id)', function () {
    it('Check if the user has an id', async function () {
      // add a user to the database
      await Users.add({
        username: 'cuphead',
        password: 'swellbattle',
        email: 'cuphead@inkewllisle.com',
        phone_number: '6666666666'
      });
      // open the database and see that the new user is there
      const user = await db('users');
      expect(user[0]).toHaveProperty('id');
    })
    it('Check if the user has the correct id', async function () {
      // add a user to the databaase
      await Users.add({
        username: 'cuphead',
        password: 'swellbattle',
        email: 'cuphead@inkewllisle.com',
        phone_number: '6666666666'
      });
      // open the database and see that the new user is there
      const newUser = await db('users');
      await Users.findById(newUser[0].id);
      expect(newUser[0]).toHaveProperty('id', 1);
    })
  })
  describe('add(user)', function () {
    it('POST the new user to the database', async function () {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      // call add passing two users
      await Users.add({
        username: 'hollowknight',
        password: 'slurp',
        email: 'hollow@cityoftears.com',
        phone_number: '7454346876'
      });
      // open the database and see that the new user is there
      const newUser = await db('users');
      expect(newUser).toHaveLength(1);
    })
  })
  describe('update(id, changes)', function () {
    it('UPDATE the username from the database', async function () {
      //adds a user to the database
      await Users.add({
        username: 'shantae',
        password: 'poottoot',
        email: 'shantae@tasseltown.com',
        phone_number: '7575757575'
      })
      //open the db and see that the new user is there
      const newUsers = await db('users');
      //update the username
      const changes = { username: 'riskyboots' }
      await Users.update(newUsers[0].id, changes);
      //check that the username is updated
      const updatedUser = await db('users');
      expect(updatedUser[0]).toHaveProperty('username', 'riskyboots');
    })
  })

  describe('remove(id)', function () {
    it('DELETE a user from the database', async function () {
      //checks that the database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      //adds a user to the database
      await Users.add({
        username: 'shantae',
        password: 'poottoot',
        email: 'shantae@tasseltown.com',
        phone_number: '7575757575'
      })
      //open the db and see that the new user is there
      const newUsers = await db('users');
      expect(newUsers).toHaveLength(1);
      //delete the user by id
      await Users.remove(newUsers[0].id);
      //check that the user is gone
      const updatedDB = await db('users');
      expect(updatedDB).toHaveLength(0);
    })
  })
})

//*********************************************************************************************************************
//PLANT MODEL TESTS
//*********************************************************************************************************************

describe('plants model', function () {
  beforeEach(async () => {
    await db('plants').truncate();
    await db('users').truncate();
  })

  describe('find()', function () {
    it('GET list of all plants from the database', async function () {
      //checks that the user database is empty
      const users = await db('users');
      expect(users).toHaveLength(0);
      // add two users to the database
      await Users.add({
        username: 'cuphead',
        password: 'swellbattle',
        email: 'cuphead@inkewllisle.com',
        phone_number: '6666666666',
        id: 1
      })
      await Users.add({
        username: 'shantae',
        password: 'poottoot',
        email: 'shantae@tasseltown.com',
        phone_number: '7575757575',
        id: 2
      })
      //checks that the plant database is empty
      const plants = await db('plants');
      expect(plants).toHaveLength(0);
      // add three plants to the database
      await Plants.add({
        nickname: 'petey',
        species: 'piranha plant',
        water_schedule: '2020-04-03 11:13',
        user_id: 1
      });
      await Plants.add({
        nickname: 'patrick',
        species: 'piranha plant',
        water_schedule: '2020-04-04 15:23',
        user_id: 2
      });
      await Plants.add({
        nickname: 'petunia',
        species: 'piranha plant',
        water_schedule: '2020-04-05 18:43',
        user_id: 2
      });
      // open the database and see that the new plants are there
      const newplants = await db('plants');
      expect(newplants).toHaveLength(3);
      expect(plants).not.toBeNull();
    })
  })
  describe('findById(id)', function () {
    it('Check if the plant has an id', async function () {
      // add a user to the database
      await Users.add({
        username: 'tom',
        password: 'nook',
        email: 'tom@tasseltown.com',
        phone_number: '3591939671',
        id: 1
      })
      // add a plant to the user and database
      await Plants.add({
        nickname: 'podrick',
        species: 'piranha plant',
        water_schedule: '2020-04-03 11:13',
        user_id: 1
      });
      // check if the newly created plant has an id
      const plant = await db('plants');
      expect(plant[0]).toHaveProperty('id');
    })
  })
  // describe('findPlantByUser(user_id)', function () {
  //   it('', async function () {

  // })
  describe('add(plant)', function () {
    it('POST the new plant to the database', async function () {
      // add a user to the database
      await Users.add({
        username: 'shantae',
        password: 'poottoot',
        email: 'shantae@tasseltown.com',
        phone_number: '7575757575',
        id: 1
      })
      // add a plant to the user and database
      await Plants.add({
        nickname: 'petey',
        species: 'piranha plant',
        water_schedule: '2020-04-03 11:13',
        user_id: 1
      })
      // open the database and see that the new plant is there
      const newPlant = await db('plants');
      expect(newPlant).toHaveLength(1);
    })
  })
  describe('update(id, changes)', function () {
    it('UPDATE the nickname from the database', async function () {
      // add a user to the database
      await Users.add({
        username: 'shantae',
        password: 'poottoot',
        email: 'shantae@tasseltown.com',
        phone_number: '7575757575',
        id: 1
      })
      //adds a plant to the database
      await Plants.add({
        nickname: 'petey',
        species: 'piranha plant',
        water_schedule: '2020-04-03 11:13',
        user_id: 1
      })
      //open the db and see that the new plant is there
      const newPlants = await db('plants');
      //update the nickname
      const changes = { nickname: 'persephone' }
      await Plants.update(newPlants[0].id, changes);
      //check that the plant nickname is updated
      const updatedPlant = await db('plants');
      expect(updatedPlant[0]).toHaveProperty('nickname', 'persephone');
    })
  })
  describe('remove(id)', function () {
    it('DELETE a plant from the database', async function () {
      // add a user to the database
      await Users.add({
        username: 'shantae',
        password: 'poottoot',
        email: 'shantae@tasseltown.com',
        phone_number: '7575757575',
        id: 1
      })
      //adds a plant to the database
      await Plants.add({
        nickname: 'petey',
        species: 'piranha plant',
        water_schedule: '2020-04-03 11:13',
        user_id: 1
      })
      //delete the plant by id
      const newPlants = await db('plants');
      await Plants.remove(newPlants[0].id);
      //check that the plant is gone
      const updatedDB = await db('plants');
      expect(updatedDB).toHaveLength(0);
    })
  })
})