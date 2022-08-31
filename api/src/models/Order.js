const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    orderNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    timeInit: {
        type: DataTypes.STRING(25)
    },
    timeEnd: {
        type: DataTypes.STRING(25)
    },
    amount: {
        type: DataTypes.INTEGER
    },
    date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
         // This way, the current date/time will be used to populate this column (at the moment of insertion)
    },
    status: {
        type: DataTypes.ENUM('p','d','r','f')
    },
    comments: {
        type: DataTypes.STRING(250)
    },
  },
  {
    timestamps: false,
  });
};
