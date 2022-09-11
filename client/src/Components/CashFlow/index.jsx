import React, { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngresoAction,
  getFinishedOrdersAction,
} from "../../redux/actions/ordersActions";
import { useTable } from "react-table";
// import EditableCell, { COLUMNS } from "./columns.js";
import { Table } from "./styledTable";
import NavBarApp from "../NavbarApp/NavBarApp";
// import finishedOrders from "./finishedOrders.json";

function CashFlow() {
  const dispatch = useDispatch();

  const { finishedOrders } = useSelector((state) => state.orders);
  useEffect(() => {
    dispatch(getFinishedOrdersAction());
  }, []);

  const EditableCell = ({ value: initialValue }) => {
    // We need to keep and update the state of the cell normally
    const [valueI, setValueI] = useState(initialValue);
    const onChange = (e) => {
      setValueI(e.target.value);
    };

    // If the initialValue is changed external, sync it up with our state
    useEffect(() => {
      setValueI(initialValue);
    }, [initialValue]);
    return <input value={valueI} onChange={onChange} />;
  };

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
            accessor: "totalCash",
          },
          {
            Header: "Tarjeta",
            accessor: "",
          },
          {
            Header: "Total",
            accessor: "totalCash",
            id: 666,
          },
        ],
      },

      {
        Header: "Ingresos",
        columns: [
          {
            Header: "",
            accessor: "ingreso",
            Cell: EditableCell,
          },
        ],
      },
      {
        Header: "Retiros",
        columns: [
          {
            Header: "",
            accessor: "firasstName",
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
            accessor: "totalCash",
            id: 777,
            Cell: ({ value }) => <strong>{value}</strong>,
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

  const [income, setIngreso] = useState("");

  const handleChange = (value) => {
    setIngreso(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addIngresoAction(income));
  };

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
      <form onSubmit={handleSubmit}>
        <label>Nuevo ingreso</label>
        <input
          type="number"
          value={income}
          placeholder="income"
          onChange={(e) => handleChange(e.target.value)}
        />
        <input type="submit" value="add" />
      </form>
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
      //   <li>Retiro</li>
      //   <li>Historial de Cierres</li>
      //   <li>Cerrar Caja</li>
      // </ul> 
      */}
      <NavBarApp />
    </div>
  );
}

export default CashFlow;
