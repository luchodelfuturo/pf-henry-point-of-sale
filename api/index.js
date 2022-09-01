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

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
}) 
.then (()=>{
  precarga()
});