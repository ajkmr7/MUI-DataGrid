interface LinkedContent {
  text: string;
  url: string;
}

interface QRStatus {
  status: string;
  time?: string;
  note?: string;
}

interface DownloadStatus {
  status: string;
  time?: string;
}

interface RowData {
  id: string,
  qrDisplayName: string;
  shortCode: string;
  standNo: string;
  location: string;
  linkedContent: LinkedContent;
  qrStatus: QRStatus;
  downloadStatus: DownloadStatus;
  format: string;
}

export default RowData;