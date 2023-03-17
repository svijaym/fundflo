require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/db");

const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const PORT = process.env.PORT;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/users", userRoute);
app.use("/products", productRoute);
app.get("/", (req, res) => {
  res.send("Welcome to FundFlo Backend");
});
app.listen(PORT, async () => {
  await connect();
  console.log(`Listening to http://localhost:${PORT}`);
});
