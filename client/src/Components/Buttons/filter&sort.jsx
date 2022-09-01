import React from "react";

function FilterSort() {
  const handleChange = (e) => {
    if (e.target.value === "orderNumber" || e.target.value === "size") {
      return console.log(e.target.value);
      // return dispatch(sortByName(ascDsc ? "dsc" : "asc"));
    }
    //dispatch(filterBy)
    console.log(e.target.value);
  };

  return (
    <div>
      <select name="sort" id="sort" onChange={(e) => handleChange(e)}>
        <option value="">Sort By</option>
        <option value="orderNumber">order number</option>
        <option value="size">size</option>
      </select>

      <select name="filter" id="filter" onChange={(e) => handleChange(e)}>
        <option value="">Filter by status</option>
        <option value="pending">pending</option>
        <option value="doing">doing</option>
        <option value="ready">ready</option>
      </select>
    </div>
  );
}

export default FilterSort;
