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

router.post("/payment-cash", async (req, res) => {
  const {income, expanses} = req.body
  try {
    let cash = await Order.findAll({
      where: {methodPayment: "cash" },
      attributes:["totalOrder"]
    });
    if(cash.length > 0){
      let totalCash = 0;
      let result = cash.map((e) => e.totalOrder)
      for(let value of result){
        totalCash+=value
      }
      const condition = income ? totalCash + income : totalCash - expanses
      // await Cash.update({cashPayment:totalCash},{where:{cashPayment:null}})
      res.json([{totalCash: condition}]);
      // res.json(totalCash)
    }else{
      res.send("No hay Resultados");
    }
  } catch (error) {
    res.send(error)
  }
});

router.get("/payment-paypal", async (req, res) => {
  try {
    let paypal = await Order.findAll({
      where: {methodPayment: "paypal" },
      attributes:["totalOrder"]
    });
    if(paypal.length > 0){
    let totalPayment = 0;
    let result = paypal.map((e) => e.totalOrder)
    for(let value of result){
      totalPayment+=value
    }
  // await Cash.create(
  //  {paypalPayment: totalPayment},
  //  {where:{
  //   paypalPayment: null
  //  }}
  // )
    res.json([{totalPayPal:totalPayment}]);
    
  }else{
    res.send("No hay Resultados");
  }
  } catch (error) {
    res.send(error)
  }
});

module.exports = router;
