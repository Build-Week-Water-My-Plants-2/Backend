const Users = require('../helpers/users-model.js');

function validateUserId(req, res, next) {
  const id = req.params.id;

  Users.findById(id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(400).json({ errorMessage: 'The user with the specified ID does not exist' });
      }
    })
    .catch(erorr => {
      res.status(500).json({ errorMessage: 'Could not validate user information for the specified ID' });
    })
}

module.exports = validateUserId;