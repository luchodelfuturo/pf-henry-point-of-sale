import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalCashAction } from "../../redux/actions/ordersActions";
import { useTable } from "react-table";
import { Table } from "./styledTable";
import NavBarApp from "../NavbarApp/NavBarApp";

function CashFlow() {
  const dispatch = useDispatch();

  const { finishedOrders } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getTotalCashAction());
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Inicio de Caja",
        columns: [
          {
            Header: "",
            accessor: "cell",
          },
        ],
      },
      {
        Header: "Ventas",
        columns: [
          {
            Header: "Efectivo",
            accessor: "total",
            id: 23423,
          },
          {
            Header: "Tarjeta",
            accessor: "",
          },
          {
            Header: "Total",
            accessor: "total",
            id: 666,
          },
        ],
      },
      {
        Header: "Ingresos",
        columns: [
          {
            Header: "",
            accessor: "income",
          },
        ],
      },
      {
        Header: "Retiros",
        columns: [
          {
            Header: "",
            accessor: "expense",
          },
        ],
      },
      {
        Header: "Total Efectivo",
        columns: [
          {
            Header: "",
            // Footer: (info) => {
            //   const total = useMemo(
            //     () =>
            //       info.data.reduce(
            //         (sum, finishedOrders) => finishedOrders.totals + sum
            //       ),
            //     [info.data]
            //   );
            //   return { total };
            // },
            accessor: "total",
            id: 777,
            // Cell: ({ value }) => <strong>{value ? value : null}</strong>,
          },
        ],
      },
    ],
    []
  );
  const data = useMemo(() => finishedOrders, [finishedOrders]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: columns,
      data: data,
    });
  console.log(finishedOrders);
  // const [income, setIngreso] = useState("");
  // const [expense, setExpense] = useState("");

  // const handleChangeIncome = (value) => {
  //   setIngreso(value);
  // };

  // const handleChangeExpense = (value) => {
  //   setExpense(value);
  // };

  // const handleSubmitIncome = (e) => {
  //   e.preventDefault();

  //   dispatch(addIngresoAction(income));
  // };

  // const handleSubmitExpense = (e) => {
  //   e.preventDefault();

  //   dispatch(addExpenseAction(expense));
  // };

  return (
    <div>
      <h1>Resumen de caja</h1>
      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          <tr>
            <td>0</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {/* <tbody>
          <tr>
            <td>hola</td>
            <td>pepe</td>
          </tr>
          <tr>
            <td>titi</td>
            <td></td>
            <td>asi</td>
          </tr>
        </tbody> */}
      </Table>
      {/* <form onSubmit={handleSubmitIncome}>
        <label>Nuevo ingreso</label>
        <input
          type="number"
          value={income}
          placeholder="income"
          onChange={(e) => handleChangeIncome(e.target.value)}
        />
        <input type="submit" value="add" />
      </form>
      <form onSubmit={handleSubmitExpense}>
        <label>Nuevo retiro</label>
        <input
          type="number"
          value={expense}
          placeholder="expense"
          onChange={(e) => handleChangeExpense(e.target.value)}
        />
        <input type="submit" value="add" />
      </form> */}

      {/*   
       <Table>
       <thead>
      //     <tr>
      //       <th></th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     <tr>
      //       <td></td>
      //     </tr>
      //   </tbody>
      // </Table>
      // <ul>
      //   <li>Historial de Cierres</li>
      //   <li>Cerrar Caja</li>
      // </ul> 
      */}
      <NavBarApp />
    </div>
  );
}

export default CashFlow;
