const { Cash, Order } = require("../db.js");

const paymentCash = async (id) => {
  //funcion para sumar todas las ventas en efectivo
  let cash = await Order.findAll({
    where: { methodPayment: "cash" },
    attributes: ["totalOrder"],
  });
  // cash = cash.filter((o) => o.status === "finished");
  // console.log(cash)
  if (cash.length === 1) {
    let totalCash = 0;
    let result = cash.map((e) => e.totalOrder);
    for (let value of result) {
      totalCash += value;
    }
    console.log(result);
    let update = await cashUpdated(id);
    update = totalCash;
    await Cash.create(
      { cashPayment: totalCash, totalCashRegister: update },
      { where: { id: id } }
    );
    // const cash = Cash.build({ cashPayment: result });
    // await cash.save();
    console.log(update);
    console.log(totalCash);
    return { totalCash: totalCash };
  } else if (cash.length > 1) {
    // let update = await cashUpdated(id)
    let totalCash = 0;
    let result = cash.map((e) => e.totalOrder); //result es un array de los totales de cada orden que se realizó
    for (let value of result) {
      totalCash += value;
    }
    let update = await cashUpdated(id);
    let newBuy = result[result.length - 1];
    let newUpdateBuy = update + newBuy;
    console.log(update);
    console.log(newBuy);
    console.log(newUpdateBuy);

    await Cash.update(
      { cashPayment: totalCash, totalCashRegister: newUpdateBuy },
      { where: { id: id } }
    );

    // return totalCash;
    return { totalCash: totalCash };
  } else {
    return { totalCash: 0 };
  }
};

const paymentPayPal = async (id) => {
  let paypal = await Order.findAll({
    where: { methodPayment: "paypal" },
    attributes: ["totalOrder"],
  });
  if (paypal.length === 1) {
    let totalPayment = 0;
    let result = paypal.map((e) => e.totalOrder);
    for (let value of result) {
      totalPayment += value;
    }
    await Cash.update({ paypalPayment: totalPayment }, { where: { id: id } });

    return { totalPaypal: totalPayment };
  } else if (paypal.length > 1) {
    if (paypal.length > 0) {
      let totalPayment = 0;
      let result = paypal.map((e) => e.totalOrder);
      for (let value of result) {
        totalPayment += value;
      }
      await Cash.update({ paypalPayment: totalPayment }, { where: { id: id } });

      return { totalPaypal: totalPayment };
    }
  } else {
    return { totalPaypal: 0 };
  }
};

const cashUpdated = async (id) => {
  //funcion para traer el ultimo valor actualizado en la columna totalCashRegister del modelo cash
  let result = await Cash.findAll({
    where: { id: id },
    attributes: ["totalCashRegister"],
  });
  // console.log(result)
  if (result.length) {
    let resultCash = result.map((e) => parseInt(e.totalCashRegister));
    // console.log(resultCash)
    return resultCash[0];
  } else {
    return "No hay resultados";
  }
};

const totalSells = async (id) => {
  let totalCashSells = await Cash.findAll({
    where: { id: id },
    attributes: ["cashPayment"],
  });
  let cashSells = totalCashSells.map((e) => parseInt(e.cashPayment));

  let totalPaypalSells = await Cash.findAll({
    where: { id: id },
    attributes: ["paypalPayment"],
  });
  let paypalSells = totalPaypalSells.map((e) => parseInt(e.paypalPayment));

  return cashSells[0] + paypalSells[0];
};

const addIncome = async (id, income) => {
  let result = await cashUpdated(id);
  let ingresos = income + result;
  // console.log(incomes)
  await Cash.update(
    { totalCashRegister: ingresos, income: income },
    { where: { id: id } }
  );
  // await Cash.create({cashPayment:income},{where:{id:id}})
  return ingresos;
};

const addExpense = async (id, expenses) => {
  // await Cash.create({ expenses: expenses });
  let result = await cashUpdated(id); //lo ultimo que tiene la columna cashPayment de la tabla cash
  console.log(result);
  let retiros = result - expenses;
  console.log(retiros);
  await Cash.update(
    { totalCashRegister: retiros, expenses: expenses },
    { where: { id: id } }
  );
  return retiros;
};
module.exports = {
  paymentCash,
  paymentPayPal,
  cashUpdated,
  addIncome,
  addExpense,
  totalSells,
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
