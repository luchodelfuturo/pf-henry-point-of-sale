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
  updatedIncome,
  updatedExpenses,
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
router.get("/totalSales/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // res.json(await cashUpdated(id))
    let totalP = await totalPaypal(id);
    let totalC = await totalCash(id);
    // console.log(totalC)
    // console.log(totalP)
    let condition = totalP === 0
      ? totalC + 0
      : totalC === 0 
      ? totalP + 0
      : totalC + totalP;
    // let condition = isNaN(totalP)
    //   ? totalC + 0
    //   : isNaN(totalC)
    //   ? totalP + 0
    //   : totalC + totalP;
    console.log(condition);
    await Cash.update({ totalSales: condition }, { where: { id: id } });
    // res.json(totals);
    res.json({ totalSales: condition });
  } catch (error) {
    console.log(error);
  }
});

router.get("/totalCash-register/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let totals = await cashUpdated(id);
    res.json({ totalCashRegister: totals });
  } catch (error) {
    res.josn(error);
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
  const { income, comments } = req.body;
  const { id } = req.params;
  // if (income) {
    try {
      // console.log(income);
      // await addIncome(id, income)
      // let result = await Cash.create(req.body)
      res.status(200).json(await addIncome(id, income));
      // res.json(result)
    } catch (error) {
      console.log(error);
    }
  // }
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

router.get("/showIncome/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let showIncome = await updatedIncome(id);
    res.json({ totalIncome: showIncome });
  } catch (error) {
    res.josn(error);
  }
});

router.get("/showExpense/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let showExpenses = await updatedExpenses(id);
    res.json({ totalExpenses: showExpenses });
  } catch (error) {
    res.josn(error);
  }
});


router.get('/test/:id', async(req,res)=>{
  const { id } = req.params;
  let incomes = await Cash.findOne({
    where: {id: id},
    attributes: ["qtyIncome"]
  });
  console.log(JSON.stringify(incomes.qtyIncome[0].income)) //{"qtyIncome":[{"income":1000,"comments":"xxxxxxx"}]}

  res.json(incomes)
})
module.exports = router;
