import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// How to add tailwind: https://tailwindcss.com/docs/guides/create-react-app

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
