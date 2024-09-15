import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import { Link } from "@mui/material";
import QRStatus from "./QRStatus.tsx";
import DownloadStatus from "./DownloadStatus.tsx";
import { ReactComponent as DuplicateIcon } from "../assets/DuplicateIcon.svg";
import { ReactComponent as EditIcon } from "../assets/EditIcon.svg";
import { ReactComponent as DownloadIcon } from "../assets/DownloadIcon.svg";

export const columns: GridColDef[] = [
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
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "linkedContent",
    headerName: "Linked Content",
    sortable: false,
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <Link href={params.value.url} target="_blank" rel="noopener">
        {params.value.text}
      </Link>
    ),
  },
  {
    field: "qrStatus",
    headerName: "QR Status",
    sortable: false,
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
    flex: 1.25,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => (
      <DownloadStatus status={params.value.status} time={params.value.time} />
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
    field: "duplicate",
    headerName: "",
    sortable: false,
    flex: 0.25,
    align: "center",
    headerAlign: "center",
    renderCell: () => <DuplicateIcon />,
  },
  {
    field: "edit",
    headerName: "",
    sortable: false,
    flex: 0.25,
    align: "center",
    headerAlign: "center",
    renderCell: () => <EditIcon />,
  },
  {
    field: "download",
    headerName: "",
    sortable: false,
    flex: 0.25,
    align: "center",
    headerAlign: "center",
    renderCell: () => <DownloadIcon />,
  },
];
