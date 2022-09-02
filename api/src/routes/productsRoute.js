const { Router } = require('express');
const router = Router();
const { Product, Category} = require("../db.js");

router.get('/', async (req, res) => {
    let allProducts = [];
    try {
      allProducts = await Product.findAll({ include: Category });
      res.json(allProducts.length > 0 ? allProducts : "No hay productos");
    } catch (error) {
      res.status(404).json(error);
    }
});


router.post('/add', async (req, res) => {
  const { name, price, idcategory, image, description, active} = req.body;
  try {
    const newProduct = await Product.create({
      name, 
      price, 
      image, 
      description, 
      active,
      idcategory
    });
    // const selectCategory = await Category.findOne({
    // where: {id: idcategory}
    // })
    // await newProduct.addCategories(selectCategory);
    // then (()=>{
    //   console.log(selectCategory)
    // });
    // await newProduct.addCategory(category);
    // const newProduct = new Product(req.body);
    // await newProduct.save();
    res.status(200).json({ message: "Product succefully created" });
  } catch (error) {
    res.status(404).json({ message: "Cant create product" });
  }
});

// let gByGame = await Genero.findAll({
//       where: { name: genre },
//     });
//     CreatteGame.addGenero(gByGame);

module.exports = router;

