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
  groupIndex?: number; // Optional field for group index
}

const groupRowsByStandNo = (rows: RowData[]): RowData[] => {
  const groupedRows = rows.reduce<{ [key: string]: RowData[] }>((acc, row) => {
    const group = acc[row.standNo] || [];
    group.push(row);
    acc[row.standNo] = group;
    return acc;
  }, {});

  return Object.entries(groupedRows).flatMap(([standNo, rows], index) =>
    rows.map((row) => ({ ...row, groupIndex: index }))
  );
};

export default groupRowsByStandNo;
