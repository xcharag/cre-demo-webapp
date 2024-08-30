// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            light: '#a5d6a7', // Light green
            main: '#367038',  // Main green
            dark: '#2e7d32',  // Dark green
            contrastText: '#fff', // White text color for contrast
        },
        secondary: {
            light: '#c8e6c9', // Light secondary green
            main: '#81c784',  // Main secondary green
            dark: '#388e3c',  // Dark secondary green
            contrastText: '#000', // Black text color for contrast
        },
        background: {
            default: '#e8f5e9',  // Background green
            paper: '#f1f8e9',    // Paper background green
        },
        text: {
            primary: '#1b5e20',  // Primary text color
            secondary: '#4caf50', // Secondary text color
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
});

export default theme;