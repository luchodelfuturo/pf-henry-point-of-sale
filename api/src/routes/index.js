const { Router } = require('express');
const { Product, Category, User, Order } = require('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// prueba
// otro cambio
// cambio3

router.get('/orders', async (req, res) => {

    let results = []
    results = await Order.findAll({include: Product})

    if(results.length === 0){

        res.status(404).json("No se encontraron resultados")

    } else{

        res.status(200).json(results)

    }

})

module.exports = router;
