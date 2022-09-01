const { Router } = require("express");
const sequelize = require("sequelize");
const { Product, Category, User, Order } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// prueba
// otro cambio
// cambio3

router.get("/orders", async (req, res) => {
  let results = [];
  results = await Order.findAll({ include: Product });

  if (results.length === 0) {
    res.status(404).json("No se encontraron resultados");
  } else {
    res.status(200).json(results);
  }
});

router.get("/orders/ready", async (req, res) => {
  let results = [];
  results = await Order.findAll({ where: { status: "r" }, include: Product });

  if (results.length === 0) {
    res.status(404).json("No se encontraron resultados");
  } else {
    res.status(200).json(results);
  }
});

router.get("/products", async (req, res) => {
  let allProducts = [];
  try {
    allProducts = await Product.findAll({ include: Category });
    res.json(allProducts.length > 0 ? allProducts : "No hay productos");
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/orders", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    await order.addProducts(req.body.product);
    res.json(order);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;