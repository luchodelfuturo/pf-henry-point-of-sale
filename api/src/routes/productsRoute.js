const { Router } = require("express");
const router = Router();
const { Product, Category } = require("../db.js");

router.get("/", async (req, res) => {
  let allProducts = [];
  try {
    allProducts = await Product.findAll({ include: Category });
    res.json(allProducts.length > 0 ? allProducts : "No hay productos");
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/add", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    await newProduct.setCategory(req.body.category);
    res.status(200).json({ message: "Product succefully created" });
  } catch (error) {
    res.status(404).json({ message: "Cant create product" });
  }
});

module.exports = router;
