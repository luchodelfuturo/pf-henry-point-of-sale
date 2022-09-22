import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByNameAction } from "../../redux/actions/productsActions";
export default function SearchNav() {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState();
  const handleInputChange = (e) => {
    e.preventDefault();
    setSearchName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchByNameAction(searchName));

    setSearchName("");
  };

  return (
    <div
      style={{
        backgroundColor: "blueviolet",
        border: "none",
        color: "white",
        padding: "4px 10px",
        borderRadius: "4px",
      }}
    >
      <input
        style={{
          border: "2px solid blueviolet",

          padding: "5px 10px",
          borderRadius: "4px",
          marginRight: "4px",
        }}
        onChange={(e) => handleInputChange(e)}
        type="text"
        placeholder="Search Products..."
        value={searchName}
      />
      <button
        style={{
          borderRadius: "4px",
          border: "none",
          color: "blueviolet",
          padding: "6px 10px",
          fontStyle: "bold",
        }}
        disabled={!searchName}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search!
      </button>
    </div>
  );
}
