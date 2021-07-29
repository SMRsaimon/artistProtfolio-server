const jwt = require("jsonwebtoken");
const authCheck = async (req, res, next) => {
  const { authorization } = req.headers;

  try {
    token = authorization.split(" ")[1];

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    const { email } = decoded;

    req.email = email;

    next();
  } catch (error) {
    next("Authentication Failure!!!!");
  }
};

module.exports = authCheck;
