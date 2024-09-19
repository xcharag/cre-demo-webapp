// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Menu, MenuItem, Button, ListItemButton, ListItemText, Collapse, Divider } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// eslint-disable-next-line react/prop-types
const DropdownWithDividers = ({ label, options, isMobile, icon, onSelect }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        if (isMobile) {
            setOpen(!open);
        } else {
            setAnchorEl(event.currentTarget);
            setOpen(!open);
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    };

    const renderOptionsWithDividers = () => {
        // eslint-disable-next-line react/prop-types
        return options.map((option, index) => {
            if (option === 'hr') {
                return <Divider key={index} />;
            } else {
                return (
                    <MenuItem key={index} onClick={() => {
                        if (onSelect) onSelect(option);
                        handleClose();
                    }} sx={isMobile ? { pl: 4 } : null}>
                        {option}
                    </MenuItem>
                );
            }
        });
    };

    if (isMobile) {
        return (
            <>
                <ListItemButton onClick={handleClick}>
                    {icon}
                    <ListItemText primary={label} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    {renderOptionsWithDividers()}
                </Collapse>
            </>
        );
    }

    return (
        <>
            <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
                endIcon={open ? <ExpandLess /> : <ExpandMore />}
                startIcon={icon}
            >
                {label}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {renderOptionsWithDividers()}
            </Menu>
        </>
    );
};

export default DropdownWithDividers;
