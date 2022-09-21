const { Router } = require("express");
const router = Router();
const { Product, Category, Op } = require("../db.js");

router.get("/", async (req, res) => {
  const name = req.query.name
  let allProducts = [];
  try {
    allProducts = await Product.findAll({ include: Category })
    if (name) {
      const product = await Product.findAndCountAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },

      });
      if (product.count === 0) {
        res.send({
          count: 0,
          rows: ["No existe"],
        });
      } else {

        res.json(product);
      }
    } else {
      res.json(allProducts.length > 0 ? allProducts : "No hay productos");
    }





  } catch (error) {
    res.status(404).json(error);
  }
});

router.post("/add", async (req, res) => {
  let { name, price, image, description, active, stock, idcategory, id } = req.body;

  const searchProduct = await Product.findOne({where: {id: id}})
  
  if(searchProduct === null) { //en caso de que no exista
    try {
      const newProduct = await Product.findOrCreate({
        where: {
          name: name,
          price: price,
          image: image,
          description: description,
          active: active,
          stock: stock,
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
  } else {

    try{
    await Product.update({
      name: name, 
      price: price,
      image: image, 
      description: description,
      active: active,
      stock: stock,
      idcategory: idcategory
    }, {where: {id: id}})
    res.status(200).send("Producto editado")
    } catch(error){
      res.status(404).json(error)
    }
  }
});

router.put("/disable/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.update({ active: false }, { where: {id: id} });
    return res.status(200).json(id);
  } 
  catch(error) {
    console.log("error: ", error)
    res.status(404).json({ message: "Cant disable product"})
  }
});

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  //puede llegar a estar mal

  await Order.update({ data }, { where: { id } });
  return res.send("Product edited");
});

module.exports = router;