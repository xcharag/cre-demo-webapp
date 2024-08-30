import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import theme from './theme.js';
import {CssBaseline, ThemeProvider} from "@mui/material";

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
      <CssBaseline/>
      <App />
  </ThemeProvider>
)
