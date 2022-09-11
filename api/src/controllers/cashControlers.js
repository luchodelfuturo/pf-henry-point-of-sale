const { Cash, Order, Op } = require("../db.js");

const paymentCash = async () => {
  let cash = await Order.findAll({
    where: { methodPayment: "cash" },
    attributes: ["totalOrder", "status"],
  });
  // cash = cash.filter((o) => o.status === "finished");

  if (cash.length > 0) {
    let totalCash = 0;
    let result = cash.map((e) => e.totalOrder);
    for (let value of result) {
      totalCash += value;
    }
    await Cash.create({ cashPayment: totalCash });

    return totalCash;
    // res.json(totalCash)
  } else {
    return "No hat Resultados";
  }
};

const paymentPayPal = async () => {
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
    await Cash.create({ paypalPayment: totalPayment });

    return totalPayment;
  } else {
    return "No hay Resultados";
  }
};
module.exports = {
  paymentCash,
  paymentPayPal,
};

// let cash = await Order.findAll({
//     where: { methodPayment: "cash" },
//     attributes: ["totalOrder", "status"],
//   });
//   // cash = cash.filter((o) => o.status === "finished");

//   if (cash.length > 0) {
//     let totalCash = 0;
//     let result = cash.map((e) => e.totalOrder);
//     for (let value of result) {
//       totalCash += value;
//     }
//     const condition =
//       //  income
//       // ? totalCash + income
//       // : expenses
//       // ? totalCash - expenses
//       // :
//       totalCash;
//     // await Cash.update({cashPayment:totalCash})
//     res.json([{ totalCash: condition }]);
//     // res.json(totalCash)
//   } else {
//     res.send("No hay Resultados");
//   }
