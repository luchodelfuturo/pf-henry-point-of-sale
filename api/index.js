const server = require("./src/app.js");
const { conn } = require("./src/db.js");


// function preCarga() {
//   const products = {
//     products: [
//       {
//         id: 1,
//         name: "Philadelphia",
//         description: "Roll Philadelphia",
//         id_cat: ["Rolls", "Salsas", "Bebidas"],
//         image: "",
//         price: "900",
//         status: "active",
//       },
//       {
//         id: 2,
//         name: "Philadelphia",
//         description: "Roll Philadelphia",
//         id_cat: ["Rolls", "Salsas", "Bebidas"],
//         image: "",
//         price: "900",
//         status: "active",
//       }
//     ]
//   }
//   Product.bulkCreate(products)
// }



conn.sync({ force: true }).then(() => {
 // preCarga()
  server.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
