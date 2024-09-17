import * as React from "react";
import FullFeaturedCrudGrid from "./components/FullFeaturedCrudGrid.tsx";
import { GridRowsProp } from "@mui/x-data-grid";
import axios from "axios";

const fetchRows = async (
  page: number,
  limit: number
): Promise<GridRowsProp> => {
  try {
    const response = await axios.get(
      `https://qrm-service.netlify.app/.netlify/functions/api/qr-profiles?page=${page}&limit=${limit}`
    );
    return response.data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default function App() {
  const [rows, setRows] = React.useState<GridRowsProp>([]);

  React.useEffect(() => {
    const loadData = async () => {
      const fetchedRows = await fetchRows(1, 50);
      setRows(fetchedRows);
    };
    loadData();
  }, []);

  console.log("App rows");

  return (
    <div style={{ width: "100%", height: "100vh", overflow: "auto" }}>
      <FullFeaturedCrudGrid rows={rows} setRows={setRows} />
    </div>
  );
}
