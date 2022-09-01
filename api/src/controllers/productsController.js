import Product from '../models/Product.model.js'

export const productsController = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
    }
};
 

//asd

// router.get("/products", async (req, res) => {
//   let allProducts = [];
//   try {
//     allProducts = await Product.findAll({ include: Category });
//     res.json(allProducts.length > 0 ? allProducts : "No hay productos");
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });