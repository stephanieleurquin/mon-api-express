const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
// 🔒 Clé API pour sécuriser l'accès
const API_KEY = "ma-super-cle-secrete";

// Middleware pour vérifier la clé API
app.use((req, res, next) => {
  const userKey = req.headers['x-api-key'];
  if (userKey !== API_KEY) {
    return res.status(403).json({ error: "Clé API invalide" });
  }
  next();
});


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
