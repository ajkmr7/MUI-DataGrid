# Project Setup

## Hosted Web App on Netlify

[React Frontend](https://qrm-datagrid.netlify.app/)
[Express as Serverless function](https://qrm-service.netlify.app/.netlify/functions/api/qr-profiles)

## Backend Express Server Setup

1. Checkout to backend dir
2. Install npm packages
3. Make use of tsc command for auto-conversion of typescript files to javascript (supporting interop)
4. Run index.js file

```bash
cd backend && npm install && tsc && node dist/index.js
```

## Frontend React App Setup

1. Checkout to mui-react-app dir
2. Install npm packages
3. Run react project

```bash
cd mui-react-app && npm install && npm start
```

## MUI Datagrid Setup

```bash
npm install @mui/x-data-grid
```

Data Grid package has a peer dependency on @mui/material

```bash
npm install @mui/material @emotion/react @emotion/styled
```

Material UI is using `Emotion` as a styling engine by default. If you want to use styled-components

```bash
npm install @mui/styled-engine-sc styled-components
```
