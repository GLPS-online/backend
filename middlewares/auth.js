const jwt = require("jsonwebtoken");
const { Ptla } = require("../models");

const authenticate = async (req, res, next) => {
  const token = req.cookies.auth;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await Ptla.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" + err });
  }
};

module.exports = { authenticate };
