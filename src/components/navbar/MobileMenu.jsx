import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItem, ListItemText, Button, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ClientesDropdown from './options/ClientesDropdown'; // Ensure this imports correctly

const MobileMenu = () => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = (open) => () => {
        setOpen(open);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ display: { xs: 'block', sm: 'none' } }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        backgroundColor: '#333', // Set background color here
                        color: '#fff', // Set text color here
                    },
                }}
            >
                <List>
                    <ListItem button onClick={handleClick}>
                        <ListItemText primary="Clientes" />
                    </ListItem>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        sx={{
                            '& .MuiPaper-root': {
                                backgroundColor: '#333', // Set background color of menu
                                color: '#fff', // Set text color of menu items
                            },
                        }}
                    >
                        {/* Add MenuItems here */}
                        <MenuItem onClick={handleClose}>Datos de Clientes</MenuItem>
                        <MenuItem onClick={handleClose}>Listado de Clientes</MenuItem>
                        <MenuItem onClick={handleClose}>Kardex de Clientes</MenuItem>
                        <MenuItem onClick={handleClose}>Pagos por Clientes</MenuItem>
                        <MenuItem onClick={handleClose}>Deudas por Clientes</MenuItem>
                    </Menu>
                </List>
            </Drawer>
        </>
    );
};

export default MobileMenu;
