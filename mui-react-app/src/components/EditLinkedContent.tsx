import React from "react";
import { Box, TextField } from "@mui/material";

interface EditLinkedContentProps {
  value: { text: string; url: string };
  onChange: (event: { text: string; url: string }) => void;
}

export default function EditLinkedContent({
  value,
  onChange,
}: EditLinkedContentProps) {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ text: e.target.value, url: value.url });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ text: value.text, url: e.target.value });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        padding: 2,
      }}
    >
      <TextField
        label="Text"
        value={value.text}
        onChange={handleTextChange}
        size="small"
        sx={{
          padding: "8px",
        }}
        fullWidth
      />
      <TextField
        label="URL"
        value={value.url}
        onChange={handleUrlChange}
        size="small"
        sx={{
          padding: "8px",
        }}
        fullWidth
      />
    </Box>
  );
}
