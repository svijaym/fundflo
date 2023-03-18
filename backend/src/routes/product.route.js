const express = require("express");
const Product = require("../models/product.model");
const { auth } = require("../controllers/auth");
const app = express.Router();
app.get("/", async (req, res) => {
  try {
    const Products = await Product.find();
    res.json({ message: "Products retrieved", Products });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
app.post("/addproduct", async (req, res) => {
  try {
    const { name, quantity, price, createdBy, imageurl } = req.body;
    const product = await Product.create({
      name,
      quantity,
      price,
      createdBy,
      imageurl,
    });
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
