import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getUsers } from "../../utils/Api.js";

// eslint-disable-next-line react/prop-types
const UserListModal = ({ open, handleClose }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (open) {
            // Fetch users when the modal opens
            getUsers().then(setUsers);
        }
    }, [open]);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
    };

    const headerStyle = {
        fontWeight: 'bold',
        fontSize: '1.2rem'
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="user-list-modal"
            aria-describedby="user-list-description"
        >
            <Box sx={modalStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography id="user-list-modal" variant="h6" component="h2" sx={headerStyle}>
                        Lista de Usuarios
                    </Typography>
                    <IconButton onClick={handleClose} color="inherit">
                        <CloseIcon />
                    </IconButton>
                </Box>
                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table aria-label="user table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={headerStyle}>Nombre</TableCell>
                                <TableCell sx={headerStyle}>Apellido</TableCell>
                                <TableCell sx={headerStyle}>Usuario</TableCell>
                                <TableCell sx={headerStyle}>Rol</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    );
};

export default UserListModal;
