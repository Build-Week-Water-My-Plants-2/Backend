function checkForPlantData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ errorMessage: 'body is empty / missing plant data. remember to type all the things' });
  } else if (!req.body.nickname || !req.body.species || !req.body.water_schedule) {
    res.status(400).json({ errorMessage: 'nickname, species, and water_schedule are required' });
  } else {
    next();
  }
}

module.exports = checkForPlantData;