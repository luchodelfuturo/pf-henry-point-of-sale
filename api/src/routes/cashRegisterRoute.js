const { Router } = require("express");
const router = Router();
const { Cash, Order, Op } = require("../db.js");
const {
  paymentCash,
  paymentPayPal,
} = require("../controllers/cashControlers.js");
router.post("/close", async (req, res) => {
  try {
    let cashClose = await Cash.create(req.body);
    res.json({ msg: "Cierre de Caja Exitoso" });
  } catch (error) {
    res.json(error);
  }
});

router.get("/history", async (req, res) => {
  let results = [];
  try {
    results = await Cash.findAll();

    if (results.length === 0) {
      res.status(404).json("No se encontraron resultados");
    } else {
      res.status(200).json(results);
    }
  } catch (error) {
    res.json(error);
  }
});
router.get("/", async (req, res) => {
  try {
    res.send(await Cash.findAll());
  } catch (error) {
    console.log(error);
  }
});

router.get("/payment-paypal", async (req, res) => {
  try {
    let result = await paymentPayPal();
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/payment-cash", async (req, res) => {
  try {
    let result = await Cash.findAll({ where: { id: 33 } });
    // const cash = Cash.build({ cashPayment: result });
    // await cash.save();
    res.json(result);
  } catch (error) {
    res.send(error);
  }
});

router.post("/addIncome", async (req, res) => {
  const { income } = req.body;
  console.log(req.body);
  if (income) {
    try {
      await Cash.create({ income: income });
      let result = await paymentCash();
      let incomes = income + result;
      await Cash.create({ cashPayment: incomes });
      res.status(200).json(incomes);
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/addExpense", async (req, res) => {
  const { expenses } = req.body;
  if (expenses) {
    try {
      await Cash.create({ expenses: expenses });
      let result = await paymentCash();
      // let result = Cash.findOne({ where: cashPayment });
      let expense = result - expenses;
      // await Cash.update({ cashPayment: expense });
      await Cash.create({ cashPayment: expense });
      return res.status(200).json(expense);
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
