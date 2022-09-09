const { Router } = require("express");
const router = Router();
const { Cash, Order } = require("../db.js");

router.post("/close", async (req, res) => {
  try {
    let cashClose = await Cash.create(req.body);
    res.json({msg:"Cierre de Caja Exitoso"});
  } catch (error) {
    res.json(error)
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

router.get("/payment-cash", async(req,res)=>{
  let cash = await Order.findAll({
    where:{methodPayment: "cash"}
  })
  res.json(cash.length > 0 ? cash : "No hay Resultados")
})

router.get("/payment-paypal", async(req,res)=>{
  let paypal = await Order.findAll({
    where:{methodPayment: "paypal"}
  })
  res.json(paypal.length > 0 ? paypal : "No hay Resultados")
})


module.exports = router;
