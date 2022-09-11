const { Router } = require("express");
const router = Router();
const { Cash, Order, Op } = require("../db.js");

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

router.get("/payment-cash", async (req, res) => {
  try {
    let cash = await Order.findAll({
      where: { methodPayment: "cash" },
      attributes: ["totalOrder", "status"],
    });
    cash = cash.filter((o) => o.status === "finished");

    if (cash.length > 0) {
      let totalCash = 0;
      let result = cash.map((e) => e.totalOrder);
      for (let value of result) {
        totalCash += value;
      }
      const condition =
        //  income
        // ? totalCash + income
        // : expenses
        // ? totalCash - expenses
        // :
        totalCash;
      // await Cash.update({cashPayment:totalCash})
      res.json([{ totalCash: condition }]);
      // res.json(totalCash)
    } else {
      res.send("No hay Resultados");
    }
  } catch (error) {
    res.send(error);
  }
});

router.get("/payment-paypal", async (req, res) => {
  try {
    let paypal = await Order.findAll({
      where: { methodPayment: "paypal" },
      attributes: ["totalOrder"],
    });
    if (paypal.length > 0) {
      let totalPayment = 0;
      let result = paypal.map((e) => e.totalOrder);
      for (let value of result) {
        totalPayment += value;
      }
      // await Cash.create(
      //  {paypalPayment: totalPayment},
      //  {where:{
      //   paypalPayment: null
      //  }}
      // )
      res.json([{ totalPayPal: totalPayment }]);
    } else {
      res.send("No hay Resultados");
    }
  } catch (error) {
    res.send(error);
  }
});

router.post("/addIncome", async (req, res) => {
  const { income } = req.body;
  console.log(req.body);
  try {
    const addIncome = await Cash.create({ where: { income: income } });

    res.status(200).send(addIncome + "New Income added");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
