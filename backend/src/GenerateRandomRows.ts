import RowData from "./RowData";
import { v4 as uuidv4 } from "uuid";

const getRandomArrayElement = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateRandomString = (
  length: number,
  isAlpha: boolean = false
): string => {
  const characters = isAlpha
    ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    : "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const generateRandomDisplayName = (): string => {
  const names = ["Exhibitor", "Product"];
  return `${getRandomArrayElement(names)} ${generateRandomString(5, true)}`;
};

const generateRandomShortcode = (): string => {
  return `${generateRandomString(3, true)}${generateRandomString(3)}`;
};

const generateRandomLocation = (): string => {
  const locations = ["At Stand", "At Entrance Foyer", "Product Feature Zone"];
  return getRandomArrayElement(locations);
};

const generateRandomLinkedContent = (): { text: string; url: string } => {
  const texts = ["Atlas Exhibitor Directory", "Custom Content"];
  return {
    text: getRandomArrayElement(texts),
    url: `https://example.com/${generateRandomString(8)}`,
  };
};

const generateRandomQRStatus = (): {
  status: string;
  time?: string;
  note?: string;
} => {
  const statuses = [
    { status: "Created on", time: generateRandomDate() },
    { status: "Blocked", note: "Entitlement Revoked" },
    { status: "Orphaned" },
  ];
  return getRandomArrayElement(statuses);
};

const generateRandomDate = (): string => {
  const now = new Date();
  const pastDate = new Date(
    now.getFullYear() - Math.floor(Math.random() * 5),
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28)
  );
  return `${pastDate.getHours()}:${pastDate.getMinutes()}, ${pastDate.getDate()}.${
    pastDate.getMonth() + 1
  }.${pastDate.getFullYear()}`;
};

const standNumbers = ["STND001", "STND002", "STND003", "STND004", "STND005", "STND006", "STND007", "STND008", "STND009", "STND010", "STND011", "STND012", "STND013", "STND014", "STND015", "STND016"];

const generateRandomRows = (numRows: number): RowData[] => {
  const rows: RowData[] = [];
  for (let i = 0; i < numRows; i++) {
    const qrStatus = generateRandomQRStatus();
    rows.push({
      id: uuidv4(),
      qrDisplayName: generateRandomDisplayName(),
      shortCode: generateRandomShortcode(),
      standNo: getRandomArrayElement(standNumbers),
      location: generateRandomLocation(),
      linkedContent: generateRandomLinkedContent(),
      qrStatus: qrStatus,
      downloadStatus: {
        status: Math.random() > 0.5 ? "Downloaded" : "Not Downloaded",
        time: qrStatus.time,
      },
      format: Math.random() > 0.5 ? "Chrome Sign" : "Tent Card",
    });
  }
  return rows;
};

export default generateRandomRows;
