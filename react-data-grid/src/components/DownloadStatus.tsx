import * as React from "react";

const DownloadStatus = ({ status, time }) =>
  status === "Downloaded" ? (
    // TODO: Add download tick icon
    <div
      style={{
        padding: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      Downloaded For Print
      {time}
    </div>
  ) : (
    <div
      style={{
        padding: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {status}
    </div>
  );

export default DownloadStatus;
