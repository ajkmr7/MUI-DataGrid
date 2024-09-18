import * as React from "react";
import { Chip } from "@mui/material";

const QRStatus = ({ status, time }) => (
  <div
    style={{
      padding: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Chip
      label={status}
      variant="outlined"
      style={{ borderRadius: "10px", marginBottom: "4px" }}
    />
    {time}
  </div>
);

export default QRStatus;
