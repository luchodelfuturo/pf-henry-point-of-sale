const { Router } = require("express");
const { Product, Category, User, Order } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

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

router.get("/products", (req, res) => {
  const products = {
    products: [
      {
        id: 1,
        name: "Philadelphia",
        description: "Roll Philadelphia",
        id_cat: ["Rolls", "Salsas", "Bebidas"],
        image: "",
        price: "900",
        status: "active",
      },
      {
        id: 2,
        name: "Philadelphia",
        description: "Roll Philadelphia",
        id_cat: ["Rolls", "Salsas", "Bebidas"],
        image: "",
        price: "900",
        status: "active",
      },
      {
        id: 3,
        name: "Philadelphia",
        description: "Roll Philadelphia",
        id_cat: ["Rolls", "Salsas", "Bebidas"],
        image: "",
        price: "900",
        status: "active",
      },
      {
        id: 4,
        name: "Philadelphia",
        description: "Roll Philadelphia",
        id_cat: ["Rolls", "Salsas", "Bebidas"],
        image: "",
        price: "900",
        status: "active",
      },
      {
        id: 5,
        name: "Philadelphia",
        description: "Roll Philadelphia",
        id_cat: ["Rolls", "Salsas", "Bebidas"],
        image: "",
        price: "900",
        status: "active",
      },
      {
        id: 6,
        name: "Philadelphia",
        description: "Roll Philadelphia",
        id_cat: ["Rolls", "Salsas", "Bebidas"],
        image: "",
        price: "900",
        status: "active",
      },
      {
        id: 7,
        name: "Philadelphia",
        description: "Roll Philadelphia",
        id_cat: ["Rolls", "Salsas", "Bebidas"],
        image: "",
        price: "900",
        status: "active",
      },
      {
        id: 8,
        name: "Philadelphia",
        description: "Roll Philadelphia",
        id_cat: ["Rolls", "Salsas", "Bebidas"],
        image: "",
        price: "900",
        status: "active",
      },
      {
        id: 9,
        name: "Philadelphia",
        description: "Roll Philadelphia",
        id_cat: ["Rolls", "Salsas", "Bebidas"],
        image: "",
        price: "900",
        status: "active",
      },
    ],
  };

  res.status(200).json(products);
});

module.exports = router;
