const { Router } = require("express");
const router = Router();
const { Cash } = require("../db.js");
const {
  paymentCash,
  paymentPayPal,
  cashUpdated,
  addIncome,
  addExpense,
  totalCash,
  totalPaypal,
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

// total sells
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // res.json(await cashUpdated(id))
    let totalP = await totalPaypal(id);
    let totalC = await totalCash(id);
    // console.log(totalC)
    // console.log(totalP)
    let condition = isNaN(totalP)
      ? totalC + 0
      : isNaN(totalC)
      ? totalP + 0
      : totalC + totalP;
    console.log(condition);
    await Cash.update({ totalSales: condition }, { where: { id: id } });
    // res.json(totals);
    res.json(condition);
  } catch (error) {
    console.log(error);
  }
});

router.get("/payment-paypal/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await paymentPayPal(id));
  } catch (error) {
    res.send(error);
  }
});

router.get("/payment-cash/:id", async (req, res) => {
  //llamar a esta ruta cada que se efectua una venta
  const { id } = req.params;
  // let totalSales = await totalSells(id)
  try {
    res.json(await paymentCash(id));
  } catch (error) {
    console.log(error);
  }
});

router.post("/addIncome/:id", async (req, res) => {
  const { income } = req.body;
  const { id } = req.params;
  if (income) {
    try {
      console.log(income);
      res.status(200).json(await addIncome(id, income));
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/addExpense/:id", async (req, res) => {
  const { expenses } = req.body;
  const { id } = req.params;
  if (expenses) {
    try {
      return res.status(200).json(await addExpense(id, expenses));
    } catch (error) {
      console.log(error);
    }
  }
});

module.exports = router;
