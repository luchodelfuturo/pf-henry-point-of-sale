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
  let { name, price, image, description, active, idcategory } = req.body;

  try {
    const newProduct = await Product.findOrCreate({
      where: {
        name: name,
        price: price,
        image: image,
        description: description,
        active: active,
        idcategory: idcategory,
      },
    });

    const categoryN = await Category.findOne({
      where: {
        id: idcategory,
      },
    });

    await newProduct[0].addCategory(categoryN);

    res.status(200).json({ message: "Product succefully created" });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Cant create product" });
  }
});
router.delete("/activities/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.destroy({
      where: {
        id: id,
      },
    });
    res.json(activity);
  } catch (error) {
    res.send(error);
  }
});

router.post("/add", async (req, res) => {
  let { name, price, image, description, active, idcategory } = req.body;

  try {
    const newProduct = await Product.findOrCreate({
      where: {
        name: name,
        price: price,
        image: image,
        description: description,
        active: active,
        idcategory: idcategory,
      },
    });

    const categoryN = await Category.findOne({
      where: {
        id: idcategory,
      },
    });

    await newProduct[0].addCategory(categoryN);

    res.status(200).json({ message: "Product succefully created" });
  } catch (error) {
    console.log(error);

    res.status(404).json({ message: "Cant create product" });
  }
});
router.delete("/activities/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const activity = await Activity.destroy({
      where: {
        id: id,
      },
    });
    res.json(activity);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
