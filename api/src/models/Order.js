const { DataTypes } = require("sequelize");
const moment = require("moment");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "order",
    {
      orderNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      timeInit: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.getDataValue("timeInit")).format("HH:mm");
        },
      },
      timeEnd: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.dataValues.timeEnd).format("HH:mm");
        },
      },
      date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        // This way, the current date/time will be used to populate this column (at the moment of insertion)
      },
      status: {
        type: DataTypes.ENUM("pending", "doing", "ready", "finished"),
        defaultValue: "pending",
      },
      comments: {
        type: DataTypes.STRING(250),
      },
    },
    {
      timestamps: false,
    }
  );
};
