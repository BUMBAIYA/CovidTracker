import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { HelmetProvider } from "react-helmet-async";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import "simplebar/src/simplebar.css";

ReactDOM.render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeConfig>
        <GlobalStyles/>
        <App />
      </ThemeConfig>
    </HelmetProvider>
  </React.StrictMode>,
  document.getElementById('root')
);