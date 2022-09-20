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
  initialCash
} = require("../controllers/cashControlers.js");

router.post("/close", async (req, res) => {
  try {
    let cashClose = await Cash.create(req.body);
    res.json({ msg: "Cierre de Caja Exitoso" });
  } catch (error) {
    res.json(error);
  }
});

router.post('/newCashFlow', async (req, res) => {
  const { initCash } = req.body
  console.log(initCash)

  try {
    const newCashFlow = await Cash.findOrCreate({
      where: {
        initialCash: initCash,
        closeCashFlow: false,
        totalCashRegister: initCash
      },
    });
    res.status(200).send('Category created successfully')
  } catch (error) {
    console.log(error);
  }
});
// try {
//   results = await Cash.findAndCountAll(
//     {
//       order: [["id", "DESC"]],
//       limit: 1

//     })
//   const id = results.rows[0].id

//   const ekis = await Cash.create(req.body)
//   res.send(ekis)
// } catch (error) {
//   res.json(error)
// }



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

router.get("/getLastCashFlow", async (req, res) => {
  var lastCash = []
  let results = []
  try {
    results = await Cash.findAndCountAll(
      {
        order: [["id", "DESC"]],
        limit: 1

      }

    );
    // lastCash = results.dataValues.pop()
    console.log(results)
    console.log(results.rows.id)
    // lastCash = results.pop()
    // console.log(lastCash)

    if (results.length === 0) {
      res.status(404).json("no se encontraron resultados")
    } else {
      console.log(results.rows)
      res.status(200, "200").json(results.rows)
    }
  } catch (error) {
    res.json(error)
  }
});

router.put("/updateCashFlow", async (req, res) => {
  const order = req.body;
  try {
    results = await Cash.findAndCountAll(
      {
        order: [["id", "DESC"]],
        limit: 1

      }
    )
    const cash = order.methodPayment === "cash" ? order.totalOrder : 0
    const paypal = order.methodPayment === "paypal" ? order.totalOrder : 0

    const id = results.rows[0].id
    const cashPaymentOut = parseInt(results.rows[0].cashPayment) + parseInt(cash)

    const paypalPaymentOut = parseInt(results.rows[0].paypalPayment) + parseInt(paypal)

    const totalSalesOut = cashPaymentOut + paypalPaymentOut
    const totalCashRegisterOut = parseInt(results.rows[0].totalCashRegister) + parseInt(cash)
    //  ({ active: false }, { where: { orderNumber: orderNumber } })
    if (order.methodPayment === "cash") {
      await Cash.update({ cashPayment: cashPaymentOut, totalSales: totalSalesOut, totalCashRegister: totalCashRegisterOut }, { where: { id: id } })


    }
    else {

      await Cash.update({ paypalPayment: paypalPaymentOut, totalSales: totalSalesOut }, { where: { id: id } })


    }
  }
  catch (error) {
    res.json(error);
  }
})




router.put("/addIncome", async (req, res) => {
  const income = req.body;
  console.log("income:", income)
  try {
    results = await Cash.findAndCountAll(
      {
        order: [["id", "DESC"]],
        limit: 1

      }
    )


    const id = results.rows[0].id
    const totalCashRegisterOut = parseInt(results.rows[0].totalCashRegister) + parseInt(income.amount)
    const incomeOut = parseInt(results.rows[0].income) + parseInt(income.amount)
    await Cash.update({ income: incomeOut, totalCashRegister: totalCashRegisterOut }, { where: { id: id } })

  }
  catch (error) {
    res.json(error);
  }
});

router.put("/addExpense", async (req, res) => {
  const expenses = req.body;
  try {
    results = await Cash.findAndCountAll(
      {
        order: [["id", "DESC"]],
        limit: 1

      }
    )


    const id = results.rows[0].id
    const totalCashRegisterOut = parseInt(results.rows[0].totalCashRegister) - parseInt(expenses.amount)
    const expensesOut = parseInt(results.rows[0].expenses) + parseInt(expenses.amount)
    await Cash.update({ expenses: expensesOut, totalCashRegister: totalCashRegisterOut }, { where: { id: id } })

  }
  catch (error) {
    res.json(error);
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


router.get('/test/:id', async (req, res) => {
  const { id } = req.params;
  let incomes = await Cash.findOne({
    where: { id: id },
    attributes: ["qtyIncome"]
  });
  console.log(JSON.stringify(incomes.qtyIncome[0].income)) //{"qtyIncome":[{"income":1000,"comments":"xxxxxxx"}]}

  res.json(incomes)
})
module.exports = router;
