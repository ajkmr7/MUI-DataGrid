# Project Setup

## Hosted Web App on Netlify

- [React Frontend](https://qrm-datagrid.netlify.app/)
- [Express as Serverless Function](https://qrm-service.netlify.app/.netlify/functions/api/qr-profiles)

## Backend: Express Server Setup

To set up the backend Express server:

1. Navigate to the `backend` directory.
2. Install the necessary npm packages.
3. Use the `tsc` command to automatically convert TypeScript files to JavaScript (enabling interop support).
4. Run the `index.js` file.

```bash
cd backend
npm install
tsc
node dist/index.js
```

## Frontend: React App Setup (MUI Datagrid Implementation)

To set up the React frontend using MUI Datagrid:

1. Navigate to the `mui-react-app` directory.
2. Install the required npm packages.
3. Start the React project.

```bash
cd mui-react-app
npm install
npm start
```

## Frontend: React App Setup (React Data Grid Implementation)

To set up the React frontend using React Data Grid:

1. Navigate to the `react-data-grid` directory.
2. Install the necessary npm packages.
3. Start the React project.

```bash
cd react-data-grid
npm install
npm start
```
