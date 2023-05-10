const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    res.json({ error: "User is not logged in!" });
  }
  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    if (validToken) {
      next();
    }
  } catch (err) {
    res.json({ error: err });
  }
};

module.exports = { validateToken };
