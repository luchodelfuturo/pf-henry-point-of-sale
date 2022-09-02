const { Router } = require("express");
const sequelize = require("sequelize");
const { Product, Category, User, Order } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// prueba
// otro cambio
// cambio3

router.get("/orders", async (req, res) => {
  let results = [];
  results = await Order.findAll({ include: Product });

  if (results.length === 0) {
    res.status(404).json("No se encontraron resultados");
  } else {
    res.status(200).json(results);
  }
});

router.get("/orders/ready", async (req, res) => {
  let results = [];
  results = await Order.findAll({ where: { status: "r" }, include: Product });

  if (results.length === 0) {
    res.status(404).json("No se encontraron resultados");
  } else {
    res.status(200).json(results);
  }
});

// router.get("/products", async (req, res) => {
//   let allProducts = [];
//   try {
//     allProducts = await Product.findAll({ include: Category });
//     res.json(allProducts.length > 0 ? allProducts : "No hay productos");
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });

// router.get("/products", async (req, res) => {
//   console.log("entro a products")
//   const products = {
//     products: [
//       {
//         id: 1,
//         name: "Philadelphia",
//         description: "Roll Philadelphia",
//         cat: "Rolls",
//         image: "",
//         price: "900",
//         status: "active",
//       },
//       {
//         id: 2,
//         name: "Memphis",
//         description: "Roll Philadelphia",
//         cat: "Rolls",
//         image: "",
//         price: "900",
//         status: "active",
//       },
//       {
//         id: 3,
//         name: "New York",
//         description: "Roll Philadelphia",
//         cat: "Rolls",
//         image: "",
//         price: "900",
//         status: "active",
//       },
//       {
//         id: 4,
//         name: "Washington",
//         description: "Roll Philadelphia",
//         cat: "Salsas",
//         image: "",
//         price: "900",
//         status: "active",
//       },
//       {
//         id: 5,
//         name: "Denver",
//         description: "Roll Philadelphia",
//         cat: "Rolls",
//         image: "",
//         price: "900",
//         status: "active",
//       },
//       {
//         id: 6,
//         name: "Philadelphia 2",
//         description: "Roll Philadelphia",
//         cat: "Rolls",
//         image: "",
//         price: "900",
//         status: "active",
//       },
//       {
//         id: 7,
//         name: "Teriyaki",
//         description: "Roll Philadelphia",
//         cat: "Salsas",
//         image: "",
//         price: "900",
//         status: "active",
//       },
//       {
//         id: 8,
//         name: "Coca-Cola",
//         description: "Roll Philadelphia",
//         cat: "Bebidas",
//         image: "",
//         price: "900",
//         status: "active",
//       },
//       {
//         id: 9,
//         name: "Sprite",
//         description: "Roll Philadelphia",
//         cat: "Bebidas",
//         image: "",
//         price: "900",
//         status: "active",
//       },
//     ]
//   }

//   res.status(200).json(products);
// });

const productsRoute = require("./productsRoute.js");
const categoryRoute = require("./categoryRoute.js");

//router.use('/products', productsRoute);
router.use("/category", categoryRoute);

router.get("/products", async (req, res) => {
  console.log("entro a products");
  const products = [
    {
      id: 1,
      name: "Bacon Cheese Burger",
      price: 1500,
      image: "./images/Bacon-Cheese-Burger.png",
      description: "Bacon Cheese Burger",
      active: true,
      idcategory: "1",
    },
    {
      id: 2,
      name: "Bacon Cheese Burger",
      price: 1500,
      image: "./images/Bacon-Cheese-Burger.png",
      description: "Bacon Cheese Burger",
      active: true,
      idcategory: 2,
    },
    {
      id: 3,
      name: "Bacon Cheese Burger",
      price: 1500,
      image: "./images/Bacon-Cheese-Burger.png",
      description: "Bacon Cheese Burger",
      active: true,
      idcategory: 3,
    },
    {
      id: 4,
      name: "Bacon Cheese Burger",
      price: 1500,
      image: "./images/Bacon-Cheese-Burger.png",
      description: "Bacon Cheese Burger",
      active: true,
      idcategory: 4,
    },
    { 
      id: 5,
      name: "Bacon Cheese Burger",
      price: 1500,
      image: "./images/Bacon-Cheese-Burger.png",
      description: "Bacon Cheese Burger",
      active: true,
      idcategory: 1,
    },
    {
      id: 6,
      name: "Bacon Cheese Burger",
      price: 1500,
      image: "./images/Bacon-Cheese-Burger.png",
      description: "Bacon Cheese Burger",
      active: true,
      idcategory: 3,
    },
    {
      id: 7,
      name: "Bacon Cheese Burger",
      price: 1500,
      image: "./images/Bacon-Cheese-Burger.png",
      description: "Bacon Cheese Burger",
      active: true,
      idcategory: 2,
    },
    {
      id: 8,
      name: "Bacon Cheese Burger",
      price: 1500,
      image: "./images/Bacon-Cheese-Burger.png",
      description: "Bacon Cheese Burger",
      active: true,
      idcategory: 1,
    },
    {
      id: 9,
      name: "Bacon Cheese Burger",
      price: 1500,
      image: "./images/Bacon-Cheese-Burger.png",
      description: "Bacon Cheese Burger",
      active: true,
      idcategory: 4,
    },
  ];

  res.status(200).json(products);
});

router.post("/orders", async (req, res) => {
  try {
    const order = await Order.create(req.body);
    await order.addProducts(req.body.product);
    res.json(order);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
