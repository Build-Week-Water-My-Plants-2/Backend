const router = require('express').Router();
const bc = require('bcryptjs');
const Users = require('../helpers/users-model.js');
const Plants = require('../helpers/plants-model.js');
const restricted = require('../middleware/restricted.js');
const validateUserId = require('../middleware/validate-user-id.js');
const checkForPlantData = require('../middleware/check-for-plant-data.js');

// *****************************************
// GET a list of all users
// *****************************************
router.get('/', restricted, (req, res) => {
  Users.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Could not receive the list of users' })
    })
})
// *****************************************
// GET a specific user by id
// *****************************************
router.get('/:id', restricted, validateUserId, (req, res) => {
  const id = req.params.id;

  Users.findById(id)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Could not receive the specified user' })
    })
})
// *****************************************
// UPDATE a user's information
// *****************************************
router.put('/:id', restricted, validateUserId, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const hash = bc.hashSync(changes.password, 8); //hashes the password
  changes.password = hash;
  const updatedUser = { ...changes, id };

  Users.update(id, changes)
    .then(editUser => {
      console.log(updatedUser);
      res.status(200).json(updatedUser);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'The user information could not be modified' });
    })
})
// *****************************************
// DELETE a user from the database
// *****************************************
router.delete('/:id', restricted, validateUserId, (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then(deleted => {
      console.log(deleted);
      res.status(200).json({ success: `the user was successfully deleted from the database` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'The user could not be deleted' });
    })
})
// *****************************************
// GET a list of plants for a specific user
// *****************************************
router.get('/:id/plants', restricted, validateUserId, (req, res) => {
  console.log(req.params.id);
  Plants.findPlantsByUser(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Could not receive the list of plants for the specified user' })
    })
})
// *****************************************
// ADD a plant for the specified user
// *****************************************
router.post('/:id/plants', restricted, validateUserId, checkForPlantData, (req, res) => {
  const id = req.params.id;
  let plants = req.body;
  plants = { ...plants, user_id: id };

  Plants.add(plants)
    .then(newPlant => {
      res.status(201).json(newPlant);
    })
    .catch(error => {
      res.status(500).json({ errorMessage: 'There was an error saving the plant to the database' });
    })
})

module.exports = router;