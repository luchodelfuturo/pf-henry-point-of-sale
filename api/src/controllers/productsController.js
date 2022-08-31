import Product from '../models/Product.model.js'

export const productsController = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send(products);
    } catch (error) {
        console.log(error);
    }
};