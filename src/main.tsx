import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import './translations';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <App />
    </BrowserRouter>
    <ToastContainer />
  </React.StrictMode>,
);
