const { Router } = require("express");
const router = Router();
const { Order, Product } = require("../db.js");

router.get("/", async (req, res) => {
  let results = [];
  results = await Order.findAll();

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

router.put("/put/disable/:orderNumber", async (req, res) => {
  const { orderNumber } = req.params;
  await Order.update({ active: false }, { where: { orderNumber: orderNumber } })
  return res.send("active updated");
})

//deleted route ready here

router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const order = await Order.create(req.body);
    for (let i = 0; i < req.body.productsOrder.length; i++) {
      let product = await Product.findOne({ where: { name: req.body.productsOrder[i].nameProduct } })
      let selled = product.dataValues.sellCount
      selled = selled + req.body.productsOrder[i].qty
      await Product.update({ sellCount: selled }, { where: { name: req.body.productsOrder[i].nameProduct } })
      let newStock = product.dataValues.stock - req.body.productsOrder[i].qty
      await Product.update({ stock: newStock }, { where: { name: req.body.productsOrder[i].nameProduct } })
    }
    res.json(order);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;