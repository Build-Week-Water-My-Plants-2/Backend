const router = require('express').Router();
const Plants = require('../helpers/plants-model.js');
const restricted = require('../middleware/restricted.js');
const validatePlantId = require('../middleware/validate-plant-id.js');
const checkForPlantData = require('../middleware/check-for-plant-data.js');

// *****************************************
// GET a list of plants
// *****************************************
router.get('/', restricted, (req, res) => {
  Plants.find()
    .then(plants => {
      res.status(200).json(plants);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Could not receive the list of plants' })
    })
})
// *****************************************
// GET a specific plant by id
// *****************************************
router.get('/:id', restricted, validatePlantId, (req, res) => {
  const id = req.params.id;

  Plants.findById(id)
    .then(plants => {
      res.status(200).json(plants);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Could not receive the specified plant' })
    })
})
// *****************************************
// UPDATE a plant's information
// *****************************************
router.put('/:id', restricted, validatePlantId, checkForPlantData, (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  const updatedPlant = { ...changes, id };

  Plants.update(id, changes)
    .then(editPlant => {
      console.log(updatedPlant);
      res.status(200).json(updatedPlant);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'The plant information could not be modified' });
    })
})
// *****************************************
// DELETE a plant from the database
// *****************************************
router.delete('/:id', restricted, validatePlantId, (req, res) => {
  const id = req.params.id;

  Plants.remove(id)
    .then(deleted => {
      console.log(deleted);
      res.status(200).json({ success: `the plant was successfully deleted from the database` });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: 'The plant could not be deleted' });
    })
})

module.exports = router;