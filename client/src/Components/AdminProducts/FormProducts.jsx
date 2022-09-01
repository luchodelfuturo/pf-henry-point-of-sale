import React, { useEffect } from "react";
import { useState } from "react";

export default function FormProducts({
  categorias,
  setShowFormProducts,
  addProduct,
  productEdit,
}) {
  const [state, setState] = useState({
    name: "",
    price: "",
    categorias: "",
    desc: "",
  });
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

  const handleChange = (e) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  };
  const handleCategoria = (e) => {
    const value = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(state);
    setShowFormProducts(false);
  };

  return (
    <div
      style={{
        backgroundColor: "rgba(0,0,0, 0.9)",
        width: "100%",
        height: "100vh",
        zIndex: "20",
        position: "absolute",
        top: "0",
        left: "0",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div
        style={{
          width: "80%",
          height: "80%",
          backgroundColor: "lightgray",

          margin: "auto",
          position: "relative",
          zIndex: "10",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignCenter: "center",
          padding: "10px",
        }}
      >
        <button
          style={{
            position: "absolute",
            right: "20px",
            top: "10px",
            backgroundColor: "red",
          }}
          onClick={() => setShowFormProducts(false)}
        >
          X
        </button>
        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{
            width: "80%",
            height: "90%",
            margin: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {/* left side */}
          <div
            style={{
              width: "40%",
              height: "100%",

              display: "grid",
              gridTemplateColumns: "1fr",
              gridTemplateRows: "2fr 1fr 1fr 1fr",
              margin: "auto",
              gap: "10px",
            }}
          >
            <div
              style={{
                backgroundColor: "blue",
              }}
            >
              <img
                src={
                  imagenes[state.categorias]
                    ? imagenes[state.categorias]
                    : imagenes.default
                }
                alt=""
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </div>
            <button
              disabled
              type="button"
              style={{
                border: "2px solid lightblue",

                borderRadius: "5px",
              }}
            >
              Agregar Imagen
            </button>
            <button
              type="button"
              style={{
                border: "2px solid red",

                borderRadius: "5px",
              }}
            >
              Eliminar
            </button>
            <button
              disabled={
                state.name === "" ||
                state.price === "" ||
                state.categorias === "" ||
                state.desc === ""
              }
              type="submit"
              style={{
                border: "2px solid black",

                borderRadius: "5px",
              }}
            >
              Guardar
            </button>
          </div>
          {/* right side */}
          <div
            style={{
              backgroundColor: "pink",
              width: "60%",
              display: "grid",
              gridTemplateColumns: "40% 60%",
              gridTemplateRows: "1fr 2fr 1fr 1fr",

              gap: "10px",
              height: "100%",
              margin: "auto",
            }}
          >
            <div
              style={{
                border: "2px solid black",
                padding: "12px",
                borderRadius: "5px",
                fontSize: "90%",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Nombre
            </div>
            <input
              onChange={(e) => handleChange(e)}
              style={{
                border: "2px solid black",
                padding: "14px",
                borderRadius: "5px",
              }}
              type="text"
              name="name"
              maxLength={30}
              value={state.name}
            />
            <div
              style={{
                border: "2px solid black",
                padding: "4px",
                borderRadius: "5px",
                fontSize: "90%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
              }}
            >
              Descripcion
            </div>
            <textarea
              onChange={(e) => handleChange(e)}
              style={{
                border: "2px solid black",
                padding: "8px",
                borderRadius: "5px",
              }}
              type="text"
              name="desc"
              value={state.desc}
            />
            <div
              style={{
                border: "2px solid black",
                padding: "12px",
                borderRadius: "5px",
                fontSize: "90%",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Precio
            </div>
            <input
              onChange={(e) => handleChange(e)}
              style={{
                border: "2px solid black",
                padding: "14px",
                borderRadius: "5px",
              }}
              type="number"
              name="price"
              value={state.price}
            />
            <div
              style={{
                border: "2px solid black",
                padding: "12px",
                borderRadius: "5px",
                fontSize: "90%",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Categorias
            </div>
            <select
              onChange={(e) => handleChange(e)}
              style={{
                border: "2px solid black",
                padding: "14px",
                borderRadius: "5px",
              }}
              name="categorias"
              id=""
              value={state.categorias}
            >
              <option value="">Select Category</option>
              {categorias &&
                categorias.map((cat, index) => {
                  return (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  );
                })}
            </select>
          </div>
        </form>
      </div>
    </div>
  );
}
