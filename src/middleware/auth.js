const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = (req.user = {
      userId: decodedToken.userId,
    });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};
