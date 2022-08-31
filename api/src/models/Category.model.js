const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        section: {
            type: DataTypes.ENUM('counter','kitchen')
        }
    });
}