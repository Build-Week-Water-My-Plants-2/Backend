const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // the token is not valid
        res.status(401).json({ errorMessage: "The provided token is not valid" });
      } else {
        next();
      }
    })
  } else {
    res.status(401).json({ errorMessage: 'There was an error verifying the token / token not found' })
  }
}