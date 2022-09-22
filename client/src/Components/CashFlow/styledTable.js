import styled from "styled-components";

export const Table = styled.table`
  /* thead {
    float: left;
  }

  thead th {
    display: block;
  }

  tbody {
    float: right;
  } */
  table,
  th,
  td {
    border: 1px solid;
  }
  width: 100%;
  border-collapse: collapse;
  tr:hover {
    background-color: coral;
  }
  th {
    background-color: #04aa6d;
    color: white;
  }
  td {
    text-align: center;
  }
`;
