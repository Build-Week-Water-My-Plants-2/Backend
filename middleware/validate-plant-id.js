const Plants = require('../helpers/plants-model.js');

function validatePlantId(req, res, next) {
  const id = req.params.id;

  Plants.findById(id)
    .then(plant => {
      if (plant) {
        next();
      } else {
        res.status(400).json({ errorMessage: 'The plant with the specified ID does not exist' });
      }
    })
    .catch(erorr => {
      res.status(500).json({ errorMessage: 'Could not validate plant information for the specified ID' });
    })
}

module.exports = validatePlantId;