const { Router } = require("express");
const sequelize = require("sequelize");
const { Product, Category, User, Order } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const ordersRoute = require("./ordersRoute.js");
const productsRoute = require("./productsRoute.js");
const categoryRoute = require("./categoryRoute.js");
const readyRoute = require("./readyRoute.js"); //nuevo
const cashClose = require("./cashRegisterRoute.js")
router.use("/orders", ordersRoute);
router.use("/orders/ready", readyRoute); //nuevo
router.use("/products", productsRoute);
router.use("/category", categoryRoute);
router.use("/cash", cashClose);

module.exports = router;