import express, { Router } from "express";
import serverless from "serverless-http";
import generateRandomRows from "./GenerateRandomRows";
import RowData from "./RowData";

const api = express();
const router = Router();

router.get("/qr-profiles", (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;

  const allRows: RowData[] = generateRandomRows(500);

  const start = (page - 1) * limit;
  const end = start + limit;

  const rows = allRows.slice(start, end);

  res.json(rows);
});

router.get("/sortedData", (req, res) => {
  const { field, order, page, limit } = req.query;

  if (!field || !order) {
    return res.status(400).json({ error: "Invalid sorting parameters" });
  }

  const currentPage = Number(page) || 1;
  const pageSize = Number(limit) || 50;

  const allRows: RowData[] = generateRandomRows(500);

  const sortedRows = allRows.sort((a, b) => {
    const fieldA = a[field as keyof RowData];
    const fieldB = b[field as keyof RowData];

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return order === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    } else if (typeof fieldA === "number" && typeof fieldB === "number") {
      return order === "asc" ? fieldA - fieldB : fieldB - fieldA;
    }

    return 0;
  });

  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;

  const paginatedRows = sortedRows.slice(start, end);

  res.json(paginatedRows);
});

api.use("/.netlify/functions/api", router);

export const handler = serverless(api);