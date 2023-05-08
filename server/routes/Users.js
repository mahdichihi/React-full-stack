const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      userName: userName,
      password: hash,
    });
  });
  res.json("SUCCESS");
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  const user = await Users.findOne({ where: { userName: userName } });

  if (!user) {
    res.json("user doesn't exist!");
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json("Wrong username and password combination!");
      } else {
        res.json("You logged in!!!");
      }
    });
  }
});

module.exports = router;
