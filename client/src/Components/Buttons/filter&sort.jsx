import React from "react";

function FilterSort() {
  return (
    <div>
      <select name="sort" id="sort">
        <option value="">Sort By</option>
        <option value="time">time</option>
      </select>

      <select name="filter" id="filter">
        <option value="">Filter By</option>
        <option value="category">category</option>
      </select>
    </div>
  );
}

export default FilterSort;
