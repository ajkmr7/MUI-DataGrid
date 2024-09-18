import styled from "styled-components";
import DataGrid from "react-data-grid";
import "react-data-grid/lib/styles.css";

const StyledDataGrid = styled(DataGrid)`
  /* Override general table text styles */
  .rdg {
    color: rgba(255, 255, 255, 0.85);
    font-family: "Open Sans", sans-serif;
    font-size: 12px;
    font-weight: 700;
  }

  /* Customize the column headers */
  .rdg-header-row {
    background-color: #ffffff;
    color: #000000;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
  }

  /* Customize individual header cells */
  .rdg-header-cell {
    font-family: "Open Sans", sans-serif;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
  }

  /* Customize table cells */
  .rdg-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: normal;
    word-wrap: break-word;
    text-align: center;
    color: #000000;
    font-family: "Open Sans", sans-serif;
    font-size: 12px;
    font-weight: 700;
    border: none;
  }

  .rdg-row {
    background-color: #ffffff;
  }

  /* Hide column header sort icon separator */
  .rdg-sortable-header-cell .rdg-sort-icon {
    display: none;
  }

  /* Customize the sort icon */
  .rdg-sortable-header-cell .rdg-sort-icon {
    opacity: 1;
    color: black;
  }

  /* Remove focus outline from cells and headers */
  .rdg-cell:focus-within,
  .rdg-header-cell:focus {
    outline: none;
  }

  /* Customize the selected cell */
  .rdg-cell.selected {
    background-color: #1d1d1d;
  }

  .rdg-selected {
    border: none;
  }
`;

export default StyledDataGrid;
