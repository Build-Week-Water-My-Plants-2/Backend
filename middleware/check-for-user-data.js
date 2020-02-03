function checkForUserData(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ errorMessage: 'body is empty / missing registration data. remember to type all the things' });
  } else if (!req.body.username || !req.body.password || !req.body.email || !req.body.phone_number) {
    res.status(400).json({ errorMessage: 'username, password, email, and phone fields are required' });
  } else {
    next();
  }
}

module.exports = checkForUserData;