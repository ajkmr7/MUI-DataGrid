import * as React from "react";
import Box from "@mui/material/Box";
import { Link, MenuItem, Select } from "@mui/material";
import QRStatus from "./QRStatus.tsx";
import DownloadStatus from "./DownloadStatus.tsx";
import StyledDataGrid from "../theme/StyledDataGrid.tsx";
import { ReactComponent as DuplicateIcon } from "../assets/DuplicateIcon.svg";
import { ReactComponent as EditIcon } from "../assets/EditIcon.svg";
import { ReactComponent as DownloadIcon } from "../assets/DownloadIcon.svg";
import { ReactComponent as CheckIcon } from "../assets/CheckIcon.svg";
import { ReactComponent as CloseIcon } from "../assets/CloseIcon.svg";
import '../theme/row-styling.css';

import {
  GridRowModesModel,
  GridRowModes,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridRowsProp,
} from "@mui/x-data-grid";
import EditLinkedContent from "./EditLinkedContent.tsx";
import groupRowsByStandNo from "../utils/groupRowsByStandNumber.ts";

interface FullFeaturedCrudGridProps {
  rows: GridRowsProp;
  setRows: React.Dispatch<React.SetStateAction<GridRowsProp>>;
}

export default function FullFeaturedCrudGrid({
  rows,
  setRows,
}: FullFeaturedCrudGridProps) {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

  const groupedRows = groupRowsByStandNo(rows);

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    const updatedRow = rows.find((row) => row.id === id);
    if (updatedRow) {
      console.log("Updated Row Details:", updatedRow);
    }

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const getRowClassName = (params) => {
    const { groupIndex } = params.row;
    return `group-${groupIndex % 2 === 0 ? 'light' : 'dark'}`;
  };

  const columns: GridColDef[] = [
    {
      field: "qrDisplayName",
      headerName: "QR Display Name",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "shortCode",
      headerName: "ShortCode",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "standNo",
      headerName: "Stand No.",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "location",
      headerName: "Location",
      sortable: false,
      editable: true,
      flex: 1,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["At Stand", "At Entrance Foyer", "Product Feature Zone"],
      renderEditCell: (params) => (
        <Select
          value={params.value}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value,
            })
          }
          size="small"
          sx={{ padding: "4px" }}
          fullWidth
        >
          {(params.colDef as any).valueOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "linkedContent",
      headerName: "Linked Content",
      sortable: false,
      editable: true,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Link href={params.value.url} target="_blank" rel="noopener">
          {params.value.text}
        </Link>
      ),
      renderEditCell: (params) => (
        <EditLinkedContent
          value={params.value}
          onChange={(newValue) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: newValue,
            })
          }
        />
      ),
    },
    {
      field: "qrStatus",
      headerName: "QR Status",
      sortable: false,
      editable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <QRStatus status={params.value.status} time={params.value.time} />
      ),
    },
    {
      field: "downloadStatus",
      headerName: "Download Status",
      sortable: false,
      editable: true,
      flex: 1.25,
      align: "center",
      headerAlign: "center",
      type: "singleSelect",
      valueOptions: ["Downloaded", "Not Downloaded"],
      renderCell: (params) => (
        <DownloadStatus status={params.value.status} time={params.value.time} />
      ),
      renderEditCell: (params) => (
        <Select
          value={params.value.status}
          onChange={(e) =>
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: { ...params.value, status: e.target.value },
            })
          }
          size="small"
        >
          {(params.colDef as any).valueOptions.map((option: string) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      ),
    },
    {
      field: "format",
      headerName: "Format",
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      flex: 1,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<CheckIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CloseIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<DuplicateIcon />}
            label="Duplicate"
            onClick={() => {
              /* Handle duplicate action */
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DownloadIcon />}
            label="Download"
            onClick={() => {
              /* Handle download action */
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <StyledDataGrid
        rows={groupedRows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        hideFooter={true}
        disableColumnMenu={true}
        checkboxSelection
        getRowHeight={() => "auto"}
        disableRowSelectionOnClick
        getRowClassName={getRowClassName}
      />
    </Box>
  );
}
