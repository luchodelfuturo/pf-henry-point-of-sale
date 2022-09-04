const { Router } = require("express");
const router = Router();
const { Order, Product } = require("../db.js");

router.get("/", async (req, res) => {
  let results = [];
  results = await Order.findAll({ include: Product });

  if (results.length === 0) {
    res.status(404).json("No se encontraron resultados");
  } else {
    res.status(200).json(results);
  }
});

router.put("/put/:orderNumber", async (req, res) => {
  const { orderNumber } = req.params;
  const { status } = req.body;

  await Order.update({ status }, { where: { orderNumber } });
  return res.send("status updated");
});

router.post("/", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    await order.addProducts(req.body.product);
    res.json(order);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
