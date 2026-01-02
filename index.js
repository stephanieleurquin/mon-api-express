const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let products = [];
let nextProductId = 1;

app.post("/products", (req, res) => {
  const { name, price, stock } = req.body;
  const product = { id: nextProductId++, name, price, stock };
  products.push(product);
  res.status(201).json(product);
});

app.get("/products", (req, res) => res.json(products));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API prête pour RapidAPI sur le port ${PORT}`));
