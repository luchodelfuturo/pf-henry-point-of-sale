const { Router } = require("express");
const sequelize = require("sequelize");
const { Product, Category, User, Order } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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

const productsRoute = require ('./productsRoute.js');
const categoryRoute = require ('./categoryRoute.js');

router.use('/products', productsRoute);
router.use('/category', categoryRoute);

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