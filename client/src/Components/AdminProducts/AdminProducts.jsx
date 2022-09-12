import React, { useState, useEffect } from "react";
import FormProducts from "./FormProducts";
import {
  filterByCategoryAction,
  getProducts,
  postProducts,
} from "../../redux/actions/productsActions";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/actions/categoriesActions";
import axios from "axios";
import NavBarApp from "../NavbarApp/NavBarApp";
import { ButtonSave } from "../../theme/styled-componets";
import SearchNav from "../SearchNav/SearchNav";

export default function AdminProducts() {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [categorias, setCategorias] = useState([
    "Combos",
    "Hamburguers",
    "Pizzas",
    "Drinks",
  ]);
  const [productsFinal, setProductsFinal] = useState();
  const [productEdit, setProductEdit] = useState({
    name: "",
    price: "",
    categories: "",
    description: "",
    active: true,
    idcategory: "",
    image: "",
  });

  const [addCatShow, setAddCatShow] = useState(false);
  const [inputCategory, setInputCategory] = useState("");
  const [showFormProducts, setShowFormProducts] = useState(false);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch, showFormProducts]);

  const imagenes = {
    3: "https://www.laespanolaaceites.com/wp-content/uploads/2019/06/pizza-con-chorizo-jamon-y-queso-1080x671.jpg",
    2: "https://media.istockphoto.com/photos/hamburger-with-cheese-and-french-fries-picture-id1188412964?k=20&m=1188412964&s=612x612&w=0&h=Ow-uMeygg90_1sxoCz-vh60SQDssmjP06uGXcZ2MzPY=",
    4: "https://media.glamour.mx/photos/61905c1b2d97bd4c522a3fed/master/w_1600%2Cc_limit/245951.jpg",
    default:
      "https://media.istockphoto.com/photos/chinese-food-blank-background-picture-id545286388?k=20&m=545286388&s=612x612&w=0&h=1zAWEuV5W6SoYtErOkWasELFcAWMKgQEBUsNOoH5znc=",
  };

  const addProduct = async (product) => {
    await dispatch(postProducts(product)).then(dispatch(getProducts()));
    setShowFormProducts(false);
  };

  const addCategory = async (category) => {
    await axios.post("http://localhost:3001/category/add", category);
    setInputCategory("");
    dispatch(getCategories());
  };

  // Submit Category
  const handleSubmit = (e) => {
    e.preventDefault();
    //Acá hacer post Category
    addCategory({ name: inputCategory, section: "kitchen" });
  };
  const filterCategory = async (category) => {
    await dispatch(filterByCategoryAction(category));
  };

  const [changeColor, setChangeColor] = useState("white");
  console.log("esto son los producs del reducer state:", products);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        height: "100%",
        display: "flex",

        flexDirection: "column",
        justifyContent: "start",
        margin: "0 auto",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          minHeight: "90vh",
          width: "90%",
          margin: "0 auto",
          height: "90vh",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          justifyContent: "start",
        }}
      >
        <div
          style={{
            borderRadius: "26px",
            width: "90%",
            margin: "0 auto",
            border: "2px solid gray",
            height: "10%",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <span>
            <SearchNav />{" "}
          </span>
          <ButtonSave onClick={() => setShowFormProducts(!showFormProducts)}>
            Agregar Productos
          </ButtonSave>
          <span>Admin Page</span>
        </div>
        <div
          style={{
            width: "90%",
            height: "100%",
            display: "flex",
            margin: "0 auto",
            gap: "10px",
          }}
        >
          {/* Productos */}
          <div
            style={{
              width: "80%",
              height: "90%",
              borderRadius: "26px",
              border: "2px solid gray",

              display: "flex",
              flexDirection: "column",
              margin: " auto",
              padding: "10px 0",
            }}
          >
            {showFormProducts && (
              <FormProducts
                categories={categories}
                setShowFormProducts={setShowFormProducts}
                addProduct={addProduct}
                productEdit={productEdit}
                setProductEdit={setProductEdit}
              />
            )}

            <div
              style={{
                width: "95%",
                height: "90%",

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
              {!products.includes("No hay productos")
                ? products.map((prod, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          console.log("esto es un product:", prod);
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
                              prod.image
                                ? prod.image
                                : imagenes[prod.idcategory]
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
                  })
                : "no Hay products"}
            </div>
          </div>
          {/* Categorias */}
          <div
            style={{
              width: "30%",
              height: "90%",
              border: "2px solid gray",
              borderRadius: "26px",

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

                display: "flex",
                flexDirection: "column",
                padding: "4px",
                gap: "4px",
                overflowY: "scroll",
              }}
            >
              {categories &&
                categories.map((categ, index) => {
                  return (
                    <div
                      onClick={() => {
                        filterCategory(categ.name.toLowerCase());
                      }}
                      key={index}
                      style={{
                        width: "90%",
                        backgroundColor: "white",
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
                      {categ.name}
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

      <NavBarApp />
    </div>
  );
}
