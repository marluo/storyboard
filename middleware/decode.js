//man kan komma åt req, res och next i en middleware
require("dotenv").config();
const jwt = require("jsonwebtoken");

const decode = (req, res, next) => {
  //hämtar token från headern
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "You don't have access here" });
  }
  //decodear payloaden, som i detta fall innehåller user-ID
  const decoded = jwt.verify(token, process.env.JWTSECRET);
  //sätter mongoDB user id på request som skickas med.
  req.userid = decoded.userid;
  req.role = decoded.colour;
  req.username = decoded.username;
  console.log(decoded);
  next();
};

module.exports = decode;
