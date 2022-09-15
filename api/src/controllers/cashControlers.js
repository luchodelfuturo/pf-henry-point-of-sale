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
    return { total: totalCash };
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
    // console.log(update);
    // console.log(newBuy);
    // console.log(newUpdateBuy);

    await Cash.update(
      { cashPayment: totalCash, totalCashRegister: newUpdateBuy },
      { where: { id: id } }
    );

    // return totalCash;
    return { total: totalCash };
  } else {
    return 0;
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

    return { total: totalPayment };
  } else if (paypal.length > 1) {
    if (paypal.length > 0) { ///checar despues
      let totalPayment = 0;
      let result = paypal.map((e) => e.totalOrder);
      for (let value of result) {
        totalPayment += value;
      }
      await Cash.update({ paypalPayment: totalPayment }, { where: { id: id } });

      return { total: totalPayment };
    }
  } else {
    return 0;
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
    return 0;
  }
};

const totalCash = async (id) => {
  let totalCashSells = await Cash.findAll({
    where: { id: id },
    attributes: ["cashPayment"],
  });

  if (totalCashSells.length) {
    let cashSells = totalCashSells.map((e) => parseInt(e.cashPayment));
    // console.log(cashSells)
    return cashSells[0];
  } else {
    return 0;
  }
};

const totalPaypal = async (id) => {
  let totalPaypalSells = await Cash.findAll({
    where: { id: id },
    attributes: ["paypalPayment"],
  });
  // console.log(totalPaypalSells)
  if (totalPaypalSells.length) {
    let paypalSells = totalPaypalSells.map((e) => parseInt(e.paypalPayment));
    return paypalSells[0];
  } else {
    return 0;
  }
};

const addIncome = async (id, income) => {
  let result = await cashUpdated(id);
  let updateIncome = await updatedIncome(id)
  if(!updateIncome && result > 0){
    let ingresos = income + result;
    await Cash.update(
    { totalCashRegister: ingresos, income: income },
    { where: { id: id } }
  );
    return { income: ingresos };
    }
  else if(updateIncome && result > 0){
    let ingresos = income + result;
    updateIncome+=income
    await Cash.update(
    { totalCashRegister: ingresos, income: updateIncome },
    { where: { id: id } }
  );
  return { income: ingresos };
  }
  else{
    // await Cash.create(
    //   { totalCashRegister: income, income:income},
    //   { where: {id: id}}
    // )
    return { income: income };
  }
};

const addExpense = async (id, expenses) => {
  let result = await cashUpdated(id); //lo ultimo que tiene la columna totalCashRegister de la tabla cash
  let updateExpenses = await updatedExpenses(id)
  if(!updateExpenses && result > 0){
    let retiros = result - expenses;
    await Cash.update(
    { totalCashRegister: retiros, expenses: expenses },
    { where: { id: id } }
  );
  return { expenses: retiros };
  }else if(updateExpenses && result > 0){
    let retiros = result - expenses;
    updateExpenses+=expenses
    await Cash.update(
    { totalCashRegister: retiros, expenses: updateExpenses },
    { where: { id: id } }
  );
  return { expenses: retiros }; 
  }
  else{
    return {expenses: retiros}
  }
};

const updatedIncome = async (id) => {
  let income = await Cash.findAll({
    where: { id: id },
    attributes: ["income"],
  });
  if (income.length) {
    let totalIncome = income.map((e) => parseInt(e.income));
    // console.log(totalIncome)
    return totalIncome[0];
  } else {
    return 0;
  }
};

const updatedExpenses = async (id) => {
  let expenses = await Cash.findAll({
    where: { id: id },
    attributes: ["expenses"],
  });

  if (expenses.length) {
    let totalExpenses = expenses.map((e) => parseInt(e.expenses));
    return totalExpenses[0];
  } else {
    return 0;
  }
};

module.exports = {
  paymentCash,
  paymentPayPal,
  cashUpdated,
  addIncome,
  addExpense,
  totalCash,
  totalPaypal,
  updatedIncome,
  updatedExpenses
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
