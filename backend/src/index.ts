const cors = require('cors');
import express from 'express';
import generateRandomRows from './GenerateRandomRows';
import RowData from './RowData';

const app = express();
app.use(cors());
const port = 5050;

app.use(express.json());

// Endpoint to get paginated data
app.get('/api/qr-profiles', (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 50;

  // Generate a large set of rows for demonstration
  const allRows: RowData[] = generateRandomRows(500);

  // Calculate start and end index for pagination
  const start = (page - 1) * limit;
  const end = start + limit;
  
  // Slice the rows to return only the requested page
  const rows = allRows.slice(start, end);
  
  res.json(rows);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
