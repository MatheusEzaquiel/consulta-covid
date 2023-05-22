import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-icons';
import './global.css';

import { RouterProvider } from 'react-router-dom';
import { Routes } from './routes/Routes';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <RouterProvider router={Routes()}/>
);

reportWebVitals();