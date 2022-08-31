import React, { useState } from "react";

export default function AdminProducts() {
  const [categorias, setCategorias] = useState([
    "Combos",
    "Hamburguers",
    "Pizzas",
    "Drinks",
  ]);
  const [addCatShow, setAddCatShow] = useState(false);
  const [inputCategory, setInputCategory] = useState("");

  console.log(inputCategory);
  const handleSubmit = (e) => {
    e.preventDefault();

    setCategorias(categorias.concat(inputCategory));
    setInputCategory("");
  };

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
          <button>Agregar Productos [X]</button>
          Admin Page
        </div>
        <div
          style={{
            width: "90%",
            height: "80%",
            display: "flex",
            margin: "0 auto",
            gap: "10px",
            backgroundColor: "violet",
            padding: "20px 0 ",
            overflowY: "scroll",
          }}
        >
          {/* Productos */}
          <div
            style={{
              width: "70%",
              height: "90%",
              backgroundColor: "green",
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              padding: "10px 0",
            }}
          >
            Productos
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
