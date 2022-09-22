import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { disableProductAction } from "../../redux/actions/productsActions";
import { ButtonX, ButtonDis,ButtonDelete, ButtonSave } from '../../theme/styled-componets';
import Swal from 'sweetalert2'
import LoadImage from "./LoadImage";

export default function FormProducts({
  categories,
  setShowFormProducts,
  addProduct,
  productEdit,
  setProductEdit,
}) {
  const [state, setState] = useState(
    !productEdit
      ? {
          name: "",
          price: "",
          stock: 0,
          description: "",
          active: true,
          idcategory: "",
          image: "s",
        }
      : {
          name: productEdit.name,
          price: productEdit.price,
          stock: productEdit.stock,
          description: productEdit.description,
          idcategory: productEdit.idcategory,
          active: productEdit.active,
          image: productEdit.image,
          id: productEdit.id
        }
  );
  console.log("STATE edit:", state);
  const imagenes = {
    3: "https://www.laespanolaaceites.com/wp-content/uploads/2019/06/pizza-con-chorizo-jamon-y-queso-1080x671.jpg",
    2: "https://media.istockphoto.com/photos/hamburger-with-cheese-and-french-fries-picture-id1188412964?k=20&m=1188412964&s=612x612&w=0&h=Ow-uMeygg90_1sxoCz-vh60SQDssmjP06uGXcZ2MzPY=",
    4: "https://media.glamour.mx/photos/61905c1b2d97bd4c522a3fed/master/w_1600%2Cc_limit/245951.jpg",
    default:
      "https://media.istockphoto.com/photos/chinese-food-blank-background-picture-id545286388?k=20&m=545286388&s=612x612&w=0&h=1zAWEuV5W6SoYtErOkWasELFcAWMKgQEBUsNOoH5znc=",
  };

  const [imageScreen, setImageScreen] = useState(false)

  let dispatch = useDispatch()

  const handleChange = (e) => {
    const value = e.target.value;
    setState({ ...state, [e.target.name]: value });
  };
  const handleCategoria = (e) => {
    const value = e.target.value;

    setState({ ...state, idcategory: value });
  };

  const deleteAlert = (e) => {

    Swal.fire({
      title: 'Advertencia',
      text: 'Estás seguro que deseas eliminar este producto?',
      icon: 'warning',
      showDenyButton: true,
      denyButtonText: 'No',
      confirmButtonText: 'Sí'
    }).then(res => {
      if(res.isConfirmed){
        handleDelete(e)
      }
    })

  }

  const handleDelete = (e) => {

    //Hace la funcion
    dispatch(disableProductAction(productEdit.id))
    setProductEdit((oldProduct) => ({...oldProduct, active: false}))

    // Cierra la pestaña
    setShowFormProducts(false);
    setProductEdit({
      name: "",
      price: "",
      categorias: "",
      desc: "",
    });

  }

  const showImageScreen = (e) => {

    setImageScreen(true)

  }

  //const saveAlert = (e) => {
  //  Swal.fire({
  //    title: 'Advertencia',
  //    text: 'Estás seguro que deseas guardar este producto?',
  //    icon: 'warning',
  //    showDenyButton: true,
  //    denyButtonText: 'No',
  //    confirmButtonText: 'Sí'
  //  }).then(res => {
  //    if(res.isConfirmed){
  //      handleSubmit(e)
  //    }
  //  })
  //}

  const handleSubmit = (e) => {
    console.log("llega a handleSubmit")
    e.preventDefault();
    console.log("prodcuto a post:", state);
    addProduct(state);
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
          backgroundColor: "#fffffe",
          margin: "auto",
          position: "relative",
          zIndex: "10",
          borderRadius: "0.3rem",
          display: "flex",
          justifyContent: "center",
          alignCenter: "center",
          padding: "10px",
        }}
      >
        {imageScreen && (
          <LoadImage
          setImageScreen={setImageScreen}
          setState={setState}
          />
        )}
        <ButtonX
          onClick={() => {
            setShowFormProducts(false);
            setProductEdit({
              name: "",
              price: "",
              categorias: "",
              desc: "",
            });
          }}
        >X</ButtonX>
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
            <div>
              <img
                src={
                  state.image
                    ? state.image
                    : imagenes[state.idcategory]
                }
                alt=""
                style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: "0.3rem" }}
              />
            </div>
            <ButtonDis type="button" onClick={showImageScreen}>Agregar Imagen</ButtonDis>
            <ButtonDelete onClick={(e) => {deleteAlert(e)}} type="button">Eliminar</ButtonDelete>
            <ButtonSave
              disabled={
                state.name === "" ||
                state.price === "" ||
                state.idcategory === "" ||
                state.description === "" ||
                state.idcategory === "Select Category"
              }
              type="submit"
            >Guardar</ButtonSave>
          </div>
          {/* right side */}
          <div
            style={{
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
              name="description"
              value={state.description}
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
              Stock
            </div>
            <input
              onChange={(e) => handleChange(e)}
              style={{
                border: "2px solid black",
                padding: "14px",
                borderRadius: "5px",
              }}
              type="number"
              name="stock"
              value={state.stock}
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
              onChange={(e) => handleCategoria(e)}
              style={{
                border: "2px solid black",
                padding: "14px",
                borderRadius: "5px",
              }}
              name="idcategory"
              id=""
              value={state.idcategory}
            >
              <option>Select Category</option>
              {categories &&
                categories.map((cat, index) => {
                  return (
                    <option key={index} value={cat.id}>
                      {cat.name}
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
