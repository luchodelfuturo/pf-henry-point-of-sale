const server = require("./src/app.js");
const { conn, Category, Product } = require("./src/db.js");
const process = require('process');

async function precarga() {
  const category = [
    { name: "All Products", section: "kitchen" },
    { name: "Burgers", section: "kitchen" },
    { name: "Pizzas", section: "kitchen" },
    { name: "Drinks", section: "counter" },
    { name: "Extras", section: "counter" },
  ];
  await Category.bulkCreate(category).then(() =>
    console.log("Categories preloaded")
  );

  // Desde aqui muere el codigo xd

  const burguers = await Product.bulkCreate([
    {
      name: "Cheese Burguer",
      price: 850,
      image:
        "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Double-Cheeseburger-1:1-3-product-tile-desktop?wid=829&hei=515&dpr=off",
      description: "Hamburguesa de doble medallón y queso cheddar",
      active: true,
      idcategory: 2,
      stock: 26
    },
    {
      name: "Hamburguesa de huevo",
      price: 790,
      image:
        "https://okdiario.com/img/2018/08/08/receta-de-hamburguesa-rellena-de-huevo.jpg",
      description: "Hamburguesa de doble medallón y un huevo frito",
      active: true,
      idcategory: 2,
      stock: 25
    },
    {
      name: "Cheese Burguer triple",
      price: 1100,
      image:
        "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Triple-Cheeseburger:1-3-product-tile-desktop?wid=829&hei=515&dpr=off",
      description: "Hamburguesa de triple medallón y queso cheddar",
      active: true,
      idcategory: 2,
      stock: 27
    },
    {
      name: "Cheese Burguer cuádruple",
      price: 1300,
      image:
        "https://media.istockphoto.com/photos/quadruple-cheeseburger-picture-id637284524?k=20&m=637284524&s=170667a&w=0&h=QlvScc8lmWgimGYTuL5YSU5g4k9vK7J5gVusDhP6WdM=",
      description: "Hamburguesa de cuádruple medallón y queso cheddar",
      active: true,
      idcategory: 2,
      stock: 25
    },
    {
      name: "porky Burguer",
      price: 1000,
      image:
        "https://delivery.sunsetrooftopbar.com/wp-content/uploads/2020/08/Bacon-burger-plus-300x300.jpg",
      description: "Hamburguesa de cerdo de doble medallón y queso cheddar",
      active: true,
      idcategory: 2,
      stock: 20
    },
    {
      name: "Bacon Cheese Burguer",
      price: 900,
      image:
        "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2010/4/26/1/FNM_060110-Insert-017_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371591466674.jpeg",
      description: "Hamburguesa de doble medallón, cheddar y bacon",
      active: true,
      idcategory: 2,
      stock: 16
    },
    {
      name: "Veggie Burguer",
      price: 1100,
      image:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/veggie-burger-recipe-2-1650394698.jpg?crop=0.922xw:0.922xh;0.0311xw,0.0449xh&resize=640:*",
      description: "Hamburguesa de soja texturizada de doble medallón y tofu",
      active: true,
      idcategory: 2,
      stock: 20
    },
    {
      name: "blue Cheese Burguer",
      price: 1150,
      image:
        "http://4.bp.blogspot.com/-qhpQQe-4Y-0/VbIbx_rs1VI/AAAAAAAAcys/XGLxQwwXR-g/s1600/Mini%2BBurger%2By%2BQueso%2BRoquefort%2B%2528Burgers%2Bau%2BRoquefort%2529.jpg",
      description: "Hamburguesa de doble medallón, queso roquefort y cebolla",
      active: true,
      idcategory: 2,
      stock: 24
    },
  ]);
  await burguers[0].addCategory(2);
  await burguers[1].addCategory(2);
  await burguers[2].addCategory(2);
  await burguers[3].addCategory(2);
  await burguers[4].addCategory(2);
  await burguers[5].addCategory(2);
  await burguers[6].addCategory(2);
  await burguers[7].addCategory(2);

  const pizzas = await Product.bulkCreate([
    {
      name: "Pizza de muzzarella",
      price: 1100,
      image:
        "https://www.johaprato.com/files/styles/flexslider_full/public/pizza_de_mozzarella.jpg?itok=0X9_f7K8",
      description: "pizza con queso muzzarella",
      active: true,
      idcategory: 3,
      stock: 23
    },
    {
      name: "Pizza fugazzeta",
      price: 1200,
      image:
        "https://t1.rg.ltmcdn.com/es/posts/7/0/2/pizza_fugazza_7207_orig.jpg",
      description: "Pizza con queso muzzarella y cebolla salteada",
      active: true,
      idcategory: 3,
      stock: 28
    },
    {
      name: "Pizza 4 quesos",
      price: 1550,
      image:
        "https://www.comedera.com/wp-content/uploads/2022/04/Pizza-cuatro-quesos-shutterstock_1514858234.jpg",
      description: "Pizza con queso muzzarella, roquefort, cremón y pategrás",
      active: true,
      idcategory: 3,
      stock: 27
    },
    {
      name: "Pizza margarita",
      price: 1250,
      image:
        "https://www.laespanolaaceites.com/wp-content/uploads/2019/06/pizza-margarita-1080x671.jpg",
      description:
        "Pizza con queso muzzarella, rodajas de tomate, albahaca y aceite de oliva",
      active: true,
      idcategory: 3,
      stock: 18
    },
    {
      name: "Pizza de morrones asados",
      price: 1600,
      image:
        "https://www.comemelapizza.com/wp-content/uploads/2014/10/pizza_de_jam%C3%B3n_y_morrones_5.jpg",
      description: "Pizza con queso muzzarella y morrones asados",
      active: true,
      idcategory: 3,
      stock: 21
    },
    {
      name: "Pizza funghi",
      price: 1500,
      image:
        "https://babycocina.com/wp-content/uploads/2021/03/pizza-funghi.jpg",
      description: "Pizza con queso muzzarella, cebolla salteada y champiñones",
      active: true,
      idcategory: 3,
      stock: 20
    },
    {
      name: "Pizza de salmón",
      price: 1450,
      image:
        "https://www.hogarmania.com/archivos/201106/0672-pizza-salmon-rucula-xl-1280x720x80xX.jpg",
      description: "Pizza con queso muzzarella, salmón y rúcula",
      active: true,
      idcategory: 3,
      stock: 18
    },
    {
      name: "Pizza carbonara",
      price: 1600,
      image: "https://imag.bonviveur.com/pizza-carbonara.jpg",
      description:
        "Pizza con queso muzzarella, panceta, champiñones y nata líquida",
      active: true,
      idcategory: 3,
      stock: 17
    },
  ]);
  await pizzas[0].addCategory(3);
  await pizzas[1].addCategory(3);
  await pizzas[2].addCategory(3);
  await pizzas[3].addCategory(3);
  await pizzas[4].addCategory(3);
  await pizzas[5].addCategory(3);
  await pizzas[6].addCategory(3);
  await pizzas[7].addCategory(3);

  const drinks = await Product.bulkCreate([
    {
      name: "Fernet con Coca cola",
      price: 550,
      image:
        "https://www.mendovoz.com/u/fotografias/m/2020/4/3/f1280x720-127798_259473_5050.jpg",
      description: "Fernet Branca mezclado con Coca Cola y hielo",
      active: true,
      idcategory: 4,
      stock: 35
    },
    {
      name: "Gancia con Sprite",
      price: 500,
      image:
        "https://http2.mlstatic.com/D_NQ_NP_694141-MLA46897400670_072021-O.webp",
      description: "Gancia mezclado con Sprite y hielo",
      active: true,
      idcategory: 4,
      stock: 23
    },
    {
      name: "Margarita",
      price: 600,
      image:
        "https://www.recetasderechupete.com/wp-content/uploads/2020/06/Margarita-768x527.jpg",
      description: "Tequila Mezclado con jugo de limón y sal en los bordes",
      active: true,
      idcategory: 4,
      stock: 19
    },
    {
      name: "negroni",
      price: 850,
      image:
        "https://www.liquor.com/thmb/FpQjWZNtBBC8PoW8aPfUj7cysYg=/720x720/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__liquor__2018__05__08110806__negroni-720x720-recipe-7c1b747a616f4659af4008d025ab55df.jpg",
      description: "Ginebra mezclado con Campari y Vermut dulce",
      active: true,
      idcategory: 4,
      stock: 25
    },
    {
      name: "Manhattan",
      price: 750,
      image:
        "https://www.liquor.com/thmb/6DfPgZNzIKFZHoG244MCI4Rw0fc=/720x720/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__liquor__2018__05__10144903__Manhattan-720x720-recipe-9497922907c14d91898f557cb51f2ea3.jpg",
      description: "Whiskey mezclado con Vermut y 2 dashes angostura bitters",
      active: true,
      idcategory: 4,
      stock: 25
    },
    {
      name: "Whisky Sour",
      price: 650,
      image:
        "https://images.absolutdrinks.com/drink-images/Raw/Absolut/304d2c33-5ff1-4195-b27b-20c3db5449a3.jpg?imwidth=500",
      description:
        "Whiskey mezclado con jugo de limón, azucar y clara de huevo",
      active: true,
      idcategory: 4,
      stock: 25
    },
    {
      name: "Sazerac",
      price: 950,
      image:
        "https://www.thespruceeats.com/thmb/vx0rCd5GD3gz5xd0-X3L40rPCNQ=/1333x1000/smart/filters:no_upscale()/sazerac-cocktail-recipe-760604-hero-01-cb5dd2089d204bdd9745e46fd4eef597.jpg",
      description: "Whiskey mezclado con Sirope, Absenta y amargo de Peychaud",
      active: true,
      idcategory: 4,
      stock: 24
    },
    {
      name: "Gimlet",
      price: 700,
      image:
        "https://www.liquor.com/thmb/LUOv-A1IgpS8DkD21f9oml5TXyI=/735x0/__opt__aboutcom__coeus__resources__content_migration__liquor__2019__09__12092910__Vodka-Gimlet-720x720-recipe-e0aad3b18d514bd99faceb8b57f5d446.jpg",
      description: "Ginebra mezclado con sirope de azúcar y jugo de limón",
      active: true,
      idcategory: 4,
      stock: 21
    },
  ]);
  await drinks[0].addCategory(4);
  await drinks[1].addCategory(4);
  await drinks[2].addCategory(4);
  await drinks[3].addCategory(4);
  await drinks[4].addCategory(4);
  await drinks[5].addCategory(4);
  await drinks[6].addCategory(4);
  await drinks[7].addCategory(4);

  const extras = await Product.bulkCreate([
    {
      name: "Flan con dulce de leche y crema",
      price: 850,
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/13/a7/1e/50/flan-con-crema-y-dulce.jpg",
      description: "Flan con dulce de leche y crema",
      active: true,
      idcategory: 5,
      stock: 22
    },
    {
      name: "Papas Bravas",
      price: 520,
      image:
        "https://mui.kitchen/__export/1623169788508/sites/muikitchen/img/2021/06/08/patatas-bravas-2.jpg_1782192108.jpg",
      description: "Papas en cuña con salsa brava (creo)",
      active: true,
      idcategory: 5,
      stock: 27
    },
    {
      name: "Chicken fingers",
      price: 480,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Crispy_Chicken_Strips_-_FotoosVanRobin.jpg/640px-Crispy_Chicken_Strips_-_FotoosVanRobin.jpg",
      description: "pechuga de pollo empanada y frita",
      active: true,
      idcategory: 5,
      stock: 25
    },
    {
      name: "Lemmon Pie",
      price: 680,
      image:
        "https://www.lavanguardia.com/files/article_main_microformat/files/fp/uploads/2020/10/07/5f7d904a1bce2.r_d.1182-787-0.jpeg",
      description: "1 porción mediana de torta con limón y nata casera",
      active: true,
      idcategory: 5,
      stock: 20
    },
    {
      name: "Apple Crumble",
      price: 650,
      image:
        "https://i0.wp.com/commememucho.com/wp-content/uploads/2020/04/3572577615_5afed2e401_c-850642812-1586100009292.jpg",
      description: "1 porción mediana de torta de manzana",
      active: true,
      idcategory: 5,
      stock: 17
    },
    {
      name: "Cheese Cake",
      price: 750,
      image: "https://vinomanos.com/wp-content/uploads/2021/01/Chees-min.jpg",
      description:
        "1 porción mediana de torta de ricotta y dulce de frutos rojos",
      active: true,
      idcategory: 5,
      stock: 15
    },
    {
      name: "Maracuyá Cheese Cake",
      price: 780,
      image:
        "https://images.aws.nestle.recipes/original/f799a126395a89e228f074414a01d680_Cheesecake_de_Maracuy%C3%A1.jpg",
      description: "1 porción mediana de torta de ricotta y dulce de maracuyá",
      active: true,
      idcategory: 5,
      stock: 22
    },
    {
      name: "Mousse de choco",
      price: 650,
      image:
        "https://www.comedera.com/wp-content/uploads/2016/12/dessert-4034053_1280.jpg",
      description: "1 copa de Mousse de chocolate y nata líquida",
      active: true,
      idcategory: 5,
      stock: 20
    },
  ]);
  await extras[0].addCategory(5);
  await extras[1].addCategory(5);
  await extras[2].addCategory(5);
  await extras[3].addCategory(5);
  await extras[4].addCategory(5);
  await extras[5].addCategory(5);
  await extras[6].addCategory(5);
  await extras[7].addCategory(5);
}

// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  })
  .then(() => {
    precarga();
  });
