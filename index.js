const server = require('./api/server.js');

var https = require("https");
setInterval(function() {
    https.get("https://water-my-plants-2.herokuapp.com");
}, 1000 * 60 * 5); // every 5 minutes (300000). Keeps the database from going to sleep in herroku and deleting.

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});