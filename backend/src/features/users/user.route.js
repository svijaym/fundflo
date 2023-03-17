const express = require("express");
const User = require("./user.model");
const jwt = require("jsonwebtoken");
const app = express.Router();

// app.post("login", async (req, res) => {
//   let { email, password } = req.body;
//   try {
//     let user = await User.findOne({ email, password });
//     if (!user) {
//       return res.status(401).send("Athentication unsuccesful");
//     }
//     res.send({ token: `${user.id}:${user.email}:${user.password}` });
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });
// Header will have key: token, value is id:email:password
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });
  if (user) {
    const token = jwt.sign(
      { id: user._id, name: user.name, role: user.role },
      "VPCODES64686",
      {
        expiresIn: "5 mins",
      }
    );
    const refresherToken = jwt.sign({ id: user._id }, "PRASADCODES", {
      expiresIn: "28 days",
    });
    return res.send({ message: "Logged in", token, refresherToken });
  }
  return res.status(401).send("Invalid credentials");
});

// app.post("/signup", async (req, res) => {
//   let { email } = req.body;
//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(404).send("user with email already exist");
//     }
//     let userCreated = await User.create(req.body);
//     res.send({
//       token: `${userCreated.id}:${userCreated.email}:${userCreated.password}`,
//     });
//   } catch (e) {
//     res.status(500).send(e.message);
//   }
// });

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const token = req.headers["authorization"];
  //   only HR can create employee
  try {
    const tokenDecode = jwt.decode(token);
    if (tokenDecode) {
      if (tokenDecode.role !== "HR") {
        const user = new UserModel({ name, email, password, role: "Employee" });
        await user.save();
        return res.status(201).send("Employee creation succesfull");
      } else {
        return res
          .status(403)
          .send("Not allowed add employ only hr can add data");
      }
    }
  } catch (e) {
    return res.send(e.message);
  }
});

const AuthMiddleware = async (req, res, next) => {
  let token = req.headers.token;
  if (token) {
    let [id, email, password] = token.split(":");
    let user = await User.findById(id);
    if (user.email === email && user.pasword === password) {
      req.userId = id;
      next();
    } else {
      res.status(401).send("Operation not allowed");
    }
  } else {
    res.status(401).send("Operation not allowed");
  }
};

app.get("/", async (req, res) => {
  try {
    let users = await User.find({}, { password: 0 });

    res.send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.get("/:id", AuthMiddleware, async (req, res) => {
  let id = req.params.id;
  try {
    let user = await User.findById({ id: id });

    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post("/", async (req, res) => {
  try {
    let user = await User.create({ ...req.body });
    res.send(user);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

app.delete("/:id", AuthMiddleware, async (req, res) => {
  let id = req.params.id;
  try {
    let user = await User.findByIdAndDelete({ id: id });

    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
module.exports = app;
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.post("/api/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "user",
    });

    res.json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new Error("Invalid login credentials");
    }
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
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

    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, {
      expiresIn: "1h",
    });

    res.json({ message: "Logged in successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
