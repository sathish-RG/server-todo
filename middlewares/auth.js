const { JWT_SECRET } = require("../utils/config")
const jwt = require ('jsonwebtoken')
const User= require ('../models/User')

const auth = {
  checkAuth: (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.userId = decoded.id; // <- important
      next();
    });
  }
};

module.exports = auth;