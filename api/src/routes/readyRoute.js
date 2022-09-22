const { Router } = require("express");
const router = Router();
const { Order, CashRegister } = require("../db.js");

router.put("/put/:orderNumber", async (req, res) => {
  const { orderNumber } = req.params;
  const { status } = req.body;

  await Order.update({ status }, { where: { orderNumber } });
  return res.send("status updated");
});

router.get("/finished", async (req, res) => {
  let totalSells = [];
  totalSells = await Order.findAll({
    where: { status: "finished" },
  });

//   let income = await CashRegister.findAll();
//   console.log(income);
//   let totalIncome = 0;
//   income.map((i) => (totalIncome += parseInt(i.income)));

//   let total = 0;
//   totalSells.map((o) => (total += parseInt(o.totals)));

//   if (totalSells.length === 0) {
//     res.status(404).json("No se encontraron resultados");
//   } else {
//     totalSells.push({ totalSells: total });
//     console.log(totalSells);
//     res.status(200).json(totalSells);
//   }
  res.json(totalSells);
});

router.get("/", async (req, res) => {
  let results = [];
  results = await Order.findAll({
    where: { status: "ready" },
  });

  if (results.length === 0) {
    res.status(404).json("No se encontraron resultados");
  } else {
    res.status(200).json(results);
  }
});

module.exports = router;
