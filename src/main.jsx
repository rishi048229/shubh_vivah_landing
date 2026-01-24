import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import '@fontsource/playfair-display';
import '@fontsource/montserrat';
import '@fontsource/great-vibes';
import '@fontsource/cinzel';
import './i18n';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);