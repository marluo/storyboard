const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const decode = require("../middleware/decode");

const router = express.Router();

router.post("/api/register", async (req, res) => {
  try {
    const { username, password, colour } = req.body;
    //destructar användare så att vi kan accessa dem enkelt

    const user = await User.findOne({ username });
    //hittar användare via username som skickas in till funktionen

    if (user) {
      //om error skickas det tillbaka som en error
      res.status(404).send("User already registered");
    }

    const newUser = new User({
      username,
      password,
      colour
    });
    //skapar upp en ny instans av en användare

    newUser.password = await bcrypt.hash(newUser.password, 10);
    //hashar lösenordet av användaren
    await newUser.save();
    //sparar ner användaren i databasen
    jwt.sign(
      {
        username: newUser.username,
        colour: newUser.colour,
        userid: newUser.id
      },
      //signar en token med denna info till klienten
      process.env.JWTSECRET,
      (err, token) => {
        if (err) throw error;
        return res.json({
          username,
          colour,
          userid: newUser.id,
          token
        });
      }
    );
  } catch (err) {
    console.error(err);
  }
});

router.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);

    const user = await User.findOne({ username });
    console.log(user);

    if (!user) {
      res.status(404).send("No User found by that");
    }

    const matchingPasswords = await bcrypt.compare(password, user.password);
    console.log(matchingPasswords);

    if (!matchingPasswords) {
      res.status(404).send("Incorrect password");
    }

    jwt.sign(
      { username: user.username, colour: user.colour, userid: user.id },
      process.env.JWTSECRET,
      (err, token) => {
        if (err) throw error;
        return res.status(200).json({
          username: user.username,
          colour: user.colour,
          userid: user.id,
          token
        });
      }
    );
  } catch (err) {
    console.error("Jemil");
  }
});

router.put("/api/:user/color", decode, async (req, res) => {
  const { colour } = req.body;

  const user = await User.findOneAndUpdate(
    { username: { $eq: req.username } },
    {
      $set: {
        colour: colour
      }
    },
    { new: true }
  );

  if (!user) {
    return res.status(404).send("You cant update someone elses colour");
  }

  return res.status(202).send(user);
});

router.get("/api/user/auth", decode, async (req, res) => {
  const user = await User.findById(req.userid).select("-password");
  if (!user) {
    return res.status(404).send("no user");
  }
  console.log("wwwww", user);

  return res.status(202).json(user);
});

module.exports = router;
