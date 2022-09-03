const server = require("./src/app.js");
const { conn, Category, Product } = require("./src/db.js");

async function precarga() {
  const category = [
    { name: "All Categories", section: "kitchen" },
    { name: "Burgers", section: "kitchen" },
    { name: "Pizzas", section: "kitchen" },
    { name: "Drinks", section: "counter" },
    { name: "Extras", section: "counter" },
  ];
  await Category.bulkCreate(category).then(() => console.log("Categories preloaded"));

  // Desde aqui muere el codigo xd 

  const burguers = await Product.bulkCreate([
    {
      name: "Cheese Burguer",
      price: 850,
      image: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Double-Cheeseburger-1:1-3-product-tile-desktop?wid=829&hei=515&dpr=off",
      description: "Hamburguesa con doble medallón y queso cheddar",
      active: true,
      idcategory: 2
    },
    {
      name: "Hamburguesa con huevo",
      price: 790,
      image: "https://okdiario.com/img/2018/08/08/receta-de-hamburguesa-rellena-de-huevo.jpg",
      description: "Hamburguesa con doble medallón y un huevo frito",
      active: true,
      idcategory: 2
    }
  ])
  await burguers[0].addCategory(2)
  await burguers[1].addCategory(2)

  const pizzas = await Product.bulkCreate([
    {
      name: "Pizza de muzzarella",
      price: 1300,
      image: "https://www.johaprato.com/files/styles/flexslider_full/public/pizza_de_mozzarella.jpg?itok=0X9_f7K8",
      description: "pizza con queso muzzarella",
      active: true,
      idcategory: 3
    },
    {
      name: "Pizza fugazzeta",
      price: 1450,
      image: "https://t1.rg.ltmcdn.com/es/posts/7/0/2/pizza_fugazza_7207_orig.jpg",
      description: "Pizza con queso muzzarella y cebolla salteada",
      active: true,
      idcategory: 3
    }
  ])
  await pizzas[0].addCategory(3)
  await pizzas[1].addCategory(3)

  const drinks = await Product.bulkCreate([
    {
      name: "Fernet con Coca cola",
      price: 550,
      image: "https://www.mendovoz.com/u/fotografias/m/2020/4/3/f1280x720-127798_259473_5050.jpg",
      description: "Fernet Branca mezclado con Coca Cola y hielo",
      active: true,
      idcategory: 4
    },
    {
      name: "Gancia con Sprite",
      price: 500,
      image: "https://http2.mlstatic.com/D_NQ_NP_694141-MLA46897400670_072021-O.webp",
      description: "Gancia mezclado con Sprite y hielo",
      active: true,
      idcategory: 4
    }
  ])
  await drinks[0].addCategory(4)
  await drinks[1].addCategory(4)

  const extras = await Product.bulkCreate([
    {
      name: "Flan con dulce de leche y crema",
      price: 850,
      image: "https://media-cdn.tripadvisor.com/media/photo-s/13/a7/1e/50/flan-con-crema-y-dulce.jpg",
      description: "Flan con dulce de leche y crema",
      active: true,
      idcategory: 5
    },
    {
      name: "Papas Bravas",
      price: 520,
      image: "https://mui.kitchen/__export/1623169788508/sites/muikitchen/img/2021/06/08/patatas-bravas-2.jpg_1782192108.jpg",
      description: "Papas en cuña con salsa brava (creo)",
      active: true,
      idcategory: 5
    }
  ])
  await extras[0].addCategory(5)
  await extras[1].addCategory(5)



}







// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(() => {
    server.listen(3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  })
  .then(() => {
    precarga();
  });
