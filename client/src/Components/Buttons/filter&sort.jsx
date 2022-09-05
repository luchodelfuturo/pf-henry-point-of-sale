import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanAction,
  filterDoingAction,
  filterPendingAction,
  sortByOrderNumberAction,
} from "../../redux/actions/ordersActions";

function FilterSort() {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const handleChange = (e) => {
    if (e.target.value === "orderNumber") dispatch(sortByOrderNumberAction());

    // if (e.target.value === "size") dispatch(sortBySizeAction())

    if (e.target.value === "sortDefault") return dispatch(cleanAction());

    if (e.target.value === "filterDefault") dispatch(cleanAction());

    if (e.target.value === "pending") dispatch(filterPendingAction());

    if (e.target.value === "doing") dispatch(filterDoingAction());

    // if (e.target.value === "ready") dispatch(readyAction());
  };

  return (
    <>
      {!orders.length < 2 && (
        <div>
          <label>Filter by status:</label>
          <select name="filter" id="filter" onChange={(e) => handleChange(e)}>
            <option value="filterDefault">default</option>
            <option value="pending">pending</option>
            <option value="doing">doing</option>
          </select>
        </div>
      )}
    </>
  );
}

export default FilterSort;
