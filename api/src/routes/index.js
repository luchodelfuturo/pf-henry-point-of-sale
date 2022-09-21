const { Router } = require("express");
const sequelize = require("sequelize");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const ordersRoute = require("./ordersRoute.js");
const productsRoute = require("./productsRoute.js");
const categoryRoute = require("./categoryRoute.js");
const readyRoute = require("./readyRoute.js"); //nuevo
const userRoute = require("./userRoute.js");
// const uploadRoute = require("./uploadRoute");
const cashClose = require("./cashRegisterRoute.js")

router.use("/orders", ordersRoute);
router.use("/orders/ready", readyRoute); //nuevo
router.use("/products", productsRoute);
router.use("/category", categoryRoute);
router.use("/users", userRoute);
// router.use("/upload_avatar", uploadRoute);
router.use("/cash", cashClose);


module.exports = router;