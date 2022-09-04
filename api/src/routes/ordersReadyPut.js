const { Router } = require("express");
const router = Router();
const { Order, Product } = require("../db.js");

router.put("/put/:orderNumber", async (req, res) => {
  const { orderNumber } = req.params;
  const { status } = req.body;

  await Order.update({ status }, { where: { orderNumber } });
  return res.send("status updated");
});

router.get("/finished", async (req, res) => {
  let results = [];
  results = await Order.findAll({ where: { status: "f" }, include: Product });

  if (results.length === 0) {
    res.status(404).json("No se encontraron resultados");
  } else {
    res.status(200).json(results);
  }
});

router.get("/", async (req, res) => {
  let results = [];
  results = await Order.findAll({ where: { status: "r" }, include: Product });

  if (results.length === 0) {
    res.status(404).json("No se encontraron resultados");
  } else {
    res.status(200).json(results);
  }
});

module.exports = router;
