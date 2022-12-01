const { Router } = require('express');
const router = Router();
const { Category} = require("../db.js");

router.get('/', async (req, res) => {
    let allCategorys = [];
    try {
      allCategorys = await Category.findAll();
      res.json(allCategorys.length > 0 ? allCategorys : "No hay categorias");
    } catch (error) {
      res.status(404).json(error);
    }
});

router.post('/add', async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(200).send('Category created successfully')
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;