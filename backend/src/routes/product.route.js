const express = require("express");
const Product = require("../models/product.model");
const cors = require("cors");
const { auth } = require("../controllers/auth");
const app = express.Router();
app.get("/", (req, res) => {
  res.json("Product page");
});
app.post("/addproduct", auth, async (req, res) => {
  try {
    const { name, quantity, price, createdBy } = req.body;
    const product = await Product.create({ name, quantity, price, createdBy });
    res.json({ message: "Product added", product });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/getproducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ message: "Products retrieved", products });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
module.exports = app;
