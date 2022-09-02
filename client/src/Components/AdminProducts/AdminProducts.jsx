import React, { useState } from "react";
import FormProducts from "./FormProducts";

export default function AdminProducts() {
  const [categorias, setCategorias] = useState([
    "Combos",
    "Hamburguers",
    "Pizzas",
    "Drinks",
  ]);

  const [products, setProducts] = useState([
    {
      name: "Pizza Doble queso",
      price: 200,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Pizzas",
    },
    {
      name: "Hamburguesa",
      price: 400,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Hamburguers",
    },
    {
      name: "Tragos",
      price: 600,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Drinks",
    },
    {
      name: "Pizza Doble queso",
      price: 200,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Pizzas",
    },
    {
      name: "Hamburguesa",
      price: 400,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Hamburguers",
    },
    {
      name: "Tragos",
      price: 600,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Drinks",
    },
    {
      name: "Pizza Doble queso",
      price: 200,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Pizzas",
    },
    {
      name: "Hamburguesa",
      price: 400,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Hamburguers",
    },
    {
      name: "Tragos",
      price: 600,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Drinks",
    },
    {
      name: "Pizza Doble queso",
      price: 200,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Pizzas",
    },
    {
      name: "Hamburguesa",
      price: 400,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Hamburguers",
    },
    {
      name: "Tragos",
      price: 600,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Drinks",
    },
    {
      name: "Pizza Doble queso",
      price: 200,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Pizzas",
    },
    {
      name: "Hamburguesa",
      price: 400,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Hamburguers",
    },
    {
      name: "Tragos",
      price: 600,
      desc: "Pizza con extra queso y no sé que más poner aqui",
      categorias: "Drinks",
    },
  ]);
  const [addCatShow, setAddCatShow] = useState(false);
  const [inputCategory, setInputCategory] = useState("");
  const [showFormProducts, setShowFormProducts] = useState(false);

  const imagenes = {
    Pizzas:
      "https://www.laespanolaaceites.com/wp-content/uploads/2019/06/pizza-con-chorizo-jamon-y-queso-1080x671.jpg",
    Hamburguers:
      "https://media.istockphoto.com/photos/hamburger-with-cheese-and-french-fries-picture-id1188412964?k=20&m=1188412964&s=612x612&w=0&h=Ow-uMeygg90_1sxoCz-vh60SQDssmjP06uGXcZ2MzPY=",
    Drinks:
      "https://media.glamour.mx/photos/61905c1b2d97bd4c522a3fed/master/w_1600%2Cc_limit/245951.jpg",
    default:
      "https://media.istockphoto.com/photos/chinese-food-blank-background-picture-id545286388?k=20&m=545286388&s=612x612&w=0&h=1zAWEuV5W6SoYtErOkWasELFcAWMKgQEBUsNOoH5znc=",
  };
  const addProduct = (product) => {
    setProducts(products.concat(product));
  };
  console.log(inputCategory);
  const handleSubmit = (e) => {
    e.preventDefault();

    setCategorias(categorias.concat(inputCategory));
    setInputCategory("");
  };

  const [productEdit, setProductEdit] = useState({
    name: "",
    price: "",
    categorias: "",
    desc: "",
  });

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        height: "100%",
        backgroundColor: "lightgray",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        margin: "auto",
      }}
    >
      <div
        style={{
          minHeight: "90vh",
          width: "100%",
          height: "90vh",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
        }}
      >
        <div
          style={{
            width: "90%",
            margin: "20px auto",
            backgroundColor: "red",
            height: "10%",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <span>Buscar Productos "[X]"</span>{" "}
          <button onClick={() => setShowFormProducts(!showFormProducts)}>
            Agregar Productos [X]
          </button>
          Admin Page
        </div>
        <div
          style={{
            width: "90%",
            height: "100%",
            display: "flex",
            margin: "0 auto",
            gap: "10px",
            backgroundColor: "violet",

            overflowY: "scroll",
          }}
        >
          {/* Productos */}
          <div
            style={{
              width: "80%",
              height: "90%",
              backgroundColor: "green",
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              padding: "10px 0",
            }}
          >
            {showFormProducts && (
              <FormProducts
                categorias={categorias}
                setShowFormProducts={setShowFormProducts}
                addProduct={addProduct}
                productEdit={productEdit}
                setProductEdit={setProductEdit}
              />
            )}

            <div
              style={{
                width: "90%",
                height: "90%",
                backgroundColor: "lightblue",
                margin: "0 auto",
                padding: "10px",
                display: "grid",

                gridTemplateRows: "auto",
                overflowY: "scroll",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                alignContent: "start",
                gap: "10px",
              }}
            >
              {products.map((prod) => {
                return (
                  <div
                    onClick={() => {
                      setProductEdit(prod);
                      setShowFormProducts(true);
                    }}
                    style={{
                      backgroundColor: "white",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "start",
                      alignContent: "center",
                      borderRadius: "10px",
                      border: "2px solid",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "lightpink",
                        borderRadius: "20px 20px 0px 0px",
                        width: "100%",
                        height: "40%",
                      }}
                    >
                      <img
                        src={
                          imagenes[prod.categorias]
                            ? imagenes[prod.categorias]
                            : imagenes.default
                        }
                        alt=""
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                          borderRadius: "8px 8px 0px 0px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: "90%",
                        height: "50%",

                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        marginTop: "10px",
                        alignItems: "start",
                        gap: "2px",
                      }}
                    >
                      <span
                        style={{
                          width: "90%",
                          margin: "0 auto",
                          height: "fit",
                          fontSize: "110%",
                          fontWeight: "bold",
                          textAlign: "start",
                        }}
                      >
                        {prod.name}
                      </span>
                      {/* <p
                        style={{
                          width: "90%",
                          margin: "0 auto",
                          height: "fit",
                          fontSize: "90%",

                          textAlign: "start",
                        }}
                      >
                        {prod.desc}
                      </p> */}
                      <span
                        style={{
                          borderRadius: "10px",
                          fontWeight: "bold",
                          fontSize: "110%",
                          border: "1px solid",
                          width: "40%",
                          padding: "2px",
                          position: "absolute",
                          bottom: "2%",
                          left: "5%",
                        }}
                      >
                        ${prod.price}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Categorias */}
          <div
            style={{
              width: "30%",
              height: "90%",
              backgroundColor: "lightgreen",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              margin: "auto ",
              gap: "0px",
              padding: "10px 0 ",
            }}
          >
            {/* <h4 style={{ height: "5%" }}>Categorias</h4> */}
            <div
              style={{
                width: "90%",
                height: "80%",
                margin: "auto",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                padding: "4px",
                gap: "4px",
                overflowY: "scroll",
              }}
            >
              {categorias &&
                categorias.map((categ, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        width: "90%",
                        margin: "0 auto",
                        minHeight: "40px",
                        height: "30%",
                        maxHeight: "50px",
                        border: "2px solid black",
                        borderRadius: "10px",
                        alignItems: "center",
                        display: "flex",
                        justifyContent: "center",
                        fontSize: "80%",
                      }}
                    >
                      {categ}
                    </div>
                  );
                })}
            </div>
            <div
              style={{
                height: "20%",
                margin: "auto",
                width: "90%",
                display: "flex",
              }}
            >
              {!addCatShow ? (
                <button
                  style={{ height: "50%", width: "100%", margin: "auto" }}
                  onClick={() => setAddCatShow(!addCatShow)}
                >
                  Add Category
                </button>
              ) : (
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <input
                    style={{
                      height: "50%",
                      width: "85%",
                      margin: "auto",
                      padding: "0 8px",
                      textAlign: "center",
                    }}
                    placeholder="Add Category"
                    type="text"
                    name=""
                    id=""
                    value={inputCategory}
                    onChange={(e) => setInputCategory(e.target.value)}
                  />
                  <button
                    disabled={inputCategory.length === 0}
                    style={{ height: "55%", width: "15%", margin: "auto" }}
                    type="submit"
                  >
                    +
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          height: "10vh",
          width: "100%",
          backgroundColor: "lightblue",
          display: "flex",
          flexDirection: "column",
        }}
      >
        Navbar Bottom
      </div>
    </div>
  );
}
