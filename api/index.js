const server = require("./src/app.js");
const { conn, Category } = require("./src/db.js");

function precarga (){
  const category = [
      {   name: "Burgers",
          section: "kitchen"
      },
      {   name: "Pizzas",
          section: "kitchen"
      },
      {   name: "Drinks",
          section: "counter"
      },
      {   name: "Extras",
          section: "counter"
      }
    ]  
  Category.bulkCreate(category).then(() => console.log("Categories preloaded"));
}


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
}) 
.then (()=>{
  precarga()
});