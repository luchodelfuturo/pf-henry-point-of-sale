const server = require("./src/app.js");
const { conn, Category, Product } = require("./src/db.js");
const { Op } = require("sequelize");

function precarga() {
  const category = [
    { name: "Burgers", section: "kitchen" },
    { name: "Pizzas", section: "kitchen" },
    { name: "Drinks", section: "counter" },
    { name: "Extras", section: "counter" },
  ];
  Category.bulkCreate(category).then(() => console.log("Categories preloaded"));
}
// function preCharge() {
//   const products = [
//     {
//       name: "Bacon Cheese Burger",
//       category: "Burgers",
//       price: 1500,
//       image: "./images/Bacon-Cheese-Burger.png",
//       description: "Bacon Cheese Burger",
//     },
//     {
//       name: "Cheese Burger",
//       category: "Burgers",
//       price: 900,
//       image: "./images/Cheese-Burger.png",
//       description: "Cheese Burger",
//     },
//     {
//       name: "Crispy chicken burger",
//       category: "Burgers",
//       price: 1200,
//       image: "./images/Crispy-chiken-burger.png",
//       description: "Crispy chicken burger",
//     },
//     {
//       name: "Veggie Burger",
//       category: "Burgers",
//       price: 1000,
//       image: "./images/Veggie-Burger.png",
//       description: "Veggie Burger",
//     },
//   ];
//   products
//     .forEach((e) => {
//       let newProduct = Product.create(e);
//       newProduct.addCategories(e.category);
//     })

//     //.then(() => console.log("Products preloaded"));
  
// }

conn
  .sync({ force: true })
  .then(() => {
    // preCarga()
    server.listen(3001, () => {
      console.log("%s listening at 3001");
    });
  })
  .then(() => {
    precarga();
    //preCharge();
  });
