const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "cash",
    {
      initialCash: {
        type: DataTypes.DECIMAL,
        // allowNull: false,
      },
      cashPayment: {
        type: DataTypes.DECIMAL,
        // allowNull: false,
      },
      paypalPayment: {
        type: DataTypes.DECIMAL,
        // allowNull: false
      },
      income: {
        type: DataTypes.DECIMAL,
      },
      expenses: {
        type: DataTypes.DECIMAL,
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        // This way, the current date/time will be used to populate this column (at the moment of insertion)
      },
      totalSales: {
        type: DataTypes.DECIMAL,
      },
      totalCashRegister: {
        type: DataTypes.DECIMAL,
      },
    },
    {
      timestamps: false,
    }
  );
};
