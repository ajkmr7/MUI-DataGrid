import React from "react";
import axios from "axios";
import "./App.css";
import StyledDataGrid from "./StyledDataGrid.tsx";
import QRStatus from "./components/QRStatus.tsx";
import { TextField, Select, MenuItem, Link, IconButton } from "@mui/material";
import { ReactComponent as DuplicateIcon } from "./assets/DuplicateIcon.svg";
import { ReactComponent as EditIcon } from "./assets/EditIcon.svg";
import { ReactComponent as DownloadIcon } from "./assets/DownloadIcon.svg";
import { ReactComponent as CheckIcon } from "./assets/CheckIcon.svg";
import { ReactComponent as CloseIcon } from "./assets/CloseIcon.svg";
import DownloadStatus from "./components/DownloadStatus.tsx";
import DataGrid from "react-data-grid";

interface RowData {
  id: string;
  qrDisplayName: string;
  shortCode: string;
  standNo: string;
  location: string;
  linkedContent: { text: string; url: string };
  qrStatus: { status: string; time?: string; note?: string };
  downloadStatus: { status: string; time?: string };
  format: string;
}

function App() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [rows, setRows] = React.useState<RowData[]>([]);
  const [page, setPage] = React.useState<number>(0);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const PAGE_LIMIT = 5;

  const handleEditClick = (rowId: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, isEditMode: true } : row
      )
    );
  };

  const handleSaveClick = (rowId: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, isEditMode: false } : row
      )
    );
  };

  const handleCancelClick = (rowId: string) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === rowId ? { ...row, isEditMode: false } : row
      )
    );
  };

  const handleDuplicateClick = (row: RowData) => {
    // Duplicate logic
  };

  const handleDownloadClick = (row: RowData) => {
    // Download logic
  };

  const handleSortChange = (columnKey: string) => {
    const newSortDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newSortDirection);
    setSortColumn(columnKey);
    setPage(0);
    fetchSortedRows();
  };

  const columns = [
    {
      name: "QR Display Name",
      key: "qrDisplayName",
      sortable: true,
      sortDirection: sortColumn === 'qrDisplayName' ? sortDirection : null,
      onHeaderClick: () => handleSortChange('qrDisplayName'),
    },
    { name: "Short Code", key: "shortCode" },
    {
      name: "Stand No.",
      key: "standNo",
      sortable: true,
      sortDirection: sortColumn === 'standNo' ? sortDirection : null,
      onHeaderClick: () => handleSortChange('standNo'),
    },
    {
      name: "Location",
      key: "location",
      renderCell: ({ row }) =>
        row.isEditMode ? (
          <Select
            size="small"
            value={row.location}
            onChange={(e) =>
              setRows((prevRows) =>
                prevRows.map((r) =>
                  r.id === row.id ? { ...r, location: e.target.value } : r
                )
              )
            }
            fullWidth
          >
            <MenuItem value="At Stand">At Stand</MenuItem>
            <MenuItem value="At Entrance Foyer">At Entrance Foyer</MenuItem>
            <MenuItem value="Product Feature Zone">
              Product Feature Zone
            </MenuItem>
          </Select>
        ) : (
          row.location
        ),
    },
    {
      name: "Linked Content",
      key: "linkedContent",
      renderCell: ({ row }) =>
        row.isEditMode ? (
          <div>
            <TextField
              size="small"
              value={row.linkedContent.text}
              onChange={(e) =>
                setRows((prevRows) =>
                  prevRows.map((r) =>
                    r.id === row.id
                      ? {
                          ...r,
                          linkedContent: {
                            ...r.linkedContent,
                            text: e.target.value,
                          },
                        }
                      : r
                  )
                )
              }
              label="Content Text"
              fullWidth
              margin="normal"
            />
            <TextField
              size="small"
              value={row.linkedContent.url}
              onChange={(e) =>
                setRows((prevRows) =>
                  prevRows.map((r) =>
                    r.id === row.id
                      ? {
                          ...r,
                          linkedContent: {
                            ...r.linkedContent,
                            url: e.target.value,
                          },
                        }
                      : r
                  )
                )
              }
              label="Content URL"
              fullWidth
              margin="normal"
            />
          </div>
        ) : (
          <Link href={row.linkedContent.url} target="_blank" rel="noopener">
            {row.linkedContent.text}
          </Link>
        ),
    },
    {
      name: "QR Status",
      key: "qrStatus",
      renderCell: ({ row }) => (
        <QRStatus status={row.qrStatus.status} time={row.qrStatus.time} />
      ),
    },
    {
      name: "Download Status",
      key: "downloadStatus",
      renderCell: ({ row }) =>
        row.isEditMode ? (
          <Select
            size="small"
            value={row.downloadStatus.status}
            onChange={(e) =>
              setRows((prevRows) =>
                prevRows.map((r) =>
                  r.id === row.id
                    ? {
                        ...r,
                        downloadStatus: {
                          ...r.downloadStatus,
                          status: e.target.value,
                        },
                      }
                    : r
                )
              )
            }
            fullWidth
          >
            <MenuItem value="Downloaded">Downloaded</MenuItem>
            <MenuItem value="Not Downloaded">Not Downloaded</MenuItem>
          </Select>
        ) : (
          <DownloadStatus
            status={row.downloadStatus.status}
            time={row.downloadStatus.time}
          />
        ),
    },
    { name: "Format", key: "format" },
    {
      name: "",
      key: "actions",
      renderCell: ({ row }) => {
        return row.isEditMode ? (
          <>
            <IconButton onClick={() => handleSaveClick(row.id)}>
              <CheckIcon />
            </IconButton>
            <IconButton onClick={() => handleCancelClick(row.id)}>
              <CloseIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={() => handleEditClick(row.id)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDuplicateClick(row)}>
              <DuplicateIcon />
            </IconButton>
            <IconButton onClick={() => handleDownloadClick(row)}>
              <DownloadIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const columnsWithSort = columns.map(column => ({
    ...column,
    onHeaderClick: () => column.sortable && handleSortChange(column.key),
  }));

  const fetchRows = async (): Promise<RowData[]> => {
    try {
      const response = await axios.get(
        `https://qrm-service.netlify.app/.netlify/functions/api/qr-profiles?page=${page}&limit=${PAGE_LIMIT}`
      );
      return response.data || [];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  const fetchSortedRows = async () => {
    setIsLoading(true);
    const sortField = sortColumn;
    const sortOrder = sortDirection;

    const response = await fetch(
      `https://qrm-service.netlify.app/.netlify/functions/api/sortedData?field=${sortField}&order=${sortOrder}`
    );
    return response.json();
  };

  React.useEffect(() => {
    const loadData = async () => {
      if (!isLoading) {
        setIsLoading(true);
        const fetchedRows = await fetchRows();
        setRows((currentRows) => [...currentRows, ...fetchedRows]);
        setIsLoading(false);
      }
    };
    loadData();
  }, [page, sortColumn, sortDirection]);

  async function handleScroll(event: React.UIEvent<HTMLDivElement>) {
    if (isLoading || !isAtBottom(event)) return;
    setPage((currentPage) => currentPage + 1);
  }

  function rowKeyGetter(row: RowData) {
    return row.id;
  }

  function isAtBottom({ currentTarget }: React.UIEvent<HTMLDivElement>): boolean {
    return (
      currentTarget.scrollTop + currentTarget.clientHeight >=
      currentTarget.scrollHeight
    );
  }

  console.log(rows.length);

  return (
    <>
      <StyledDataGrid
        columns={columnsWithSort}
        rows={rows}
        rowKeyGetter={rowKeyGetter}
        onRowsChange={setRows}
        onScroll={handleScroll}
        headerRowHeight={60}
        rowHeight={120}
      />
      {isLoading && <div>Loading more rows...</div>}
    </>
  );
}

export default App;
