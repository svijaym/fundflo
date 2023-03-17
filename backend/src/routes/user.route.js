require("dotenv").config();
const express = require("express");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const app = express.Router();
app.use(cors());
const blacklisttoken = [];
app.get("/",async (req, res) => {
  try {
    const users = await User.find();
    res.json({ message: "Products retrieved", users });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role, organization, profilePic } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const new_user = new User({
      name: name,
      email: email,
      role: role,
      password: hashedPassword,
      profilePic: profilePic,
    });

    res.json({ message: "User created", new_user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.TOKEN_KEY,
      {
        expiresIn: "10 days",
      }
    );

    const refresherToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.RTOKEN_KEY,
      {
        expiresIn: "28 days",
      }
    );

    res.json({ message: "Logged in successfully", token, refresherToken });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/logout", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    blacklisttoken.push(token);
  }
  res.json({ message: "Logged out  successfully" });
});

module.exports = app;
