import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  color: "rgba(255,255,255,0.85)",
  fontFamily: "Open Sans, sans-serif",
  fontSize: "12px",
  fontWeight: 700,

  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#1d1d1d",
    fontSize: "12px",
    fontWeight: 700,
    color: "rgba(255,255,255,0.85)",
    ...theme.applyStyles("light", {
      color: "rgba(0,0,0,.85)",
      backgroundColor: "#fafafa",
    }),
  },

  "& .MuiDataGrid-columnHeaderTitle": {
    fontFamily: "Open Sans, sans-serif",
    fontSize: "12px",
    fontWeight: 700,
  },

  "& .MuiDataGrid-cell": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    whiteSpace: "normal",
    wordWrap: "break-word",
    textAlign: "center",
    color: "rgba(255,255,255,0.65)",
    fontFamily: "Open Sans, sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    ...theme.applyStyles("light", {
      color: "rgba(0,0,0,.85)",
    }),
  },

  "& .MuiDataGrid-row": {
    borderTop: "1px solid black",
    borderBottom: "none",
  },

  "& .MuiDataGrid-row:last-child": {
    borderBottom: "1px solid black",
  },

  "& .MuiDataGrid-iconSeparator": {
    display: "none",
  },

  "& .MuiDataGrid-sortIcon": {
    opacity: "inherit !important",
    color: "black",
  },

  "& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus": {
    outline: "none",
  },

  "&  .MuiDataGrid-iconButtonContainer": {
    visibility: "visible",
  },
}));

export default StyledDataGrid;
