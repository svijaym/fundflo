const express = require("express");
const User = require("../users/user.model");
const Blog = require("./blog.route");

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

const app = express.Router();
app.use(AuthMiddleware);

app.get("/", async (req, res) => {
  const { limit = 5, page = 1 } = req.query;
  try {
    let blogs = await Blog.findById({ user: req.userId })
      .limit(limit)
      .populate("user");
    res.send(blogs);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.get("/:id", async (req, res) => {
  const { id } = req.query;
  try {
    let blogs = await Blog.findById({ id: id });

    res.send(blogs);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post("/", async (req, res) => {
  try {
    let blog = await Blog.create({ ...req.body, user: req.userId });
    res.send(blog);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

app.patch("/:id", async (req, res) => {
  const { id } = req.params.query;
  try {
    let blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });

    res.send(blog);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.delete("/:id", async (req, res) => {
  const { id } = req.query;
  try {
    let blogs = await Blog.findByIdAndDelete({ id: id });

    res.send(blogs);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = app;
