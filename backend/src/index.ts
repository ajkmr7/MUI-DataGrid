const cors = require('cors');
import express from 'express';
import generateRandomRows from './GenerateRandomRows';
import RowData from './RowData';

const app = express();
app.use(cors());
const port = 5050;

app.use(express.json());

app.get('/api/qr-profiles', (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;

  const allRows: RowData[] = generateRandomRows(500);

  const start = (page - 1) * limit;
  const end = start + limit;
  
  const rows = allRows.slice(start, end);
  
  res.json(rows);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
