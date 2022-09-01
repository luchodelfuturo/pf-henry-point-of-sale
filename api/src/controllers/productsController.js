// const { Product, Category} = require("../db.js");


//  const productsController = async (req, res) => {
//     let allProducts = [];
//     try {
//       allProducts = await Product.findAll({ include: Category });
//       res.json(allProducts.length > 0 ? allProducts : "No hay productos");
//     } catch (error) {
//       res.status(404).json(error);
//     }
// };

// module.exports = productsController
