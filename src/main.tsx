import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Local high-performance bundled fonts with full Vietnamese character subsets
import '@fontsource/manrope/vietnamese.css';
import '@fontsource/manrope/latin.css';
import '@fontsource/noto-serif/vietnamese.css';
import '@fontsource/noto-serif/latin.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
