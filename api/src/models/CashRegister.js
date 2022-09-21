const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "cash",
    {
      initialCash: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
      },
      cashPayment: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
      },
      paypalPayment: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
        // allowNull: false
      },
      income: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
      },
      expenses: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
      },
      cashFlowMoves: {
        type: DataTypes.ARRAY(DataTypes.JSONB)
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        // This way, the current date/time will be used to populate this column (at the moment of insertion)
      },
      totalSales: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
      },
      totalCashRegister: {
        type: DataTypes.DECIMAL,
        defaultValue: 0
      },
      closeCashFlow: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      reviews: {
        type: DataTypes.ARRAY(DataTypes.JSONB),
        defaultValue: []
      }
    },
    {
      timestamps: false,
    }
  );
};
