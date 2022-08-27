const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["authorization"];
  // console.log(req.headers)

  if (!token) {
    return res.status(403).json({
      message:
        "No Authorization header.\n An Authorization header is required for this route request",
      user_token: null,
    });
  }

  try {
    const decoded_token = jwt.verify(token, process.env.TOKEN_KEY);

    console.log(decoded_token);

    req.body.user_token = decoded_token;
  } catch {
    return res.status(401).json({
      message: "Invalid Token",
      user_token: null,
    });
  }

  return next();
};

module.exports = verifyToken;
