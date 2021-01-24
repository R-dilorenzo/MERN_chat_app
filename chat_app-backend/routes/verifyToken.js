const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Accesso negato");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    req.status(400).send("Token non valido");
  }
};
