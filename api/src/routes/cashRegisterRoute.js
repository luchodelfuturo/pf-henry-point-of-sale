const { Router } = require("express");
const router = Router();
const { Cash } = require("../db.js");

router.post("/close", async (req, res) => {
  try {
    let cashClose = await Cash.create(req.body);
    res.json({msg:"Cierre de Caja Exitoso"});
  } catch (error) {
    res.json(error)
  }
});

router.get("/history", async (req, res) => {
  let results = [];
  try {
    results = await Cash.findAll();

    if (results.length === 0) {
      res.status(404).json("No se encontraron resultados");
    } else {
      res.status(200).json(results);
    }
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
