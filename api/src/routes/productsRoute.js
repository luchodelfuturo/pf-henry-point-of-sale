const { Router } = require('express');
import {productsController} from '../controllers/productsController.js'

const productRouter = Router();

productRouter.get('/products', productsController)

export default productRouter;