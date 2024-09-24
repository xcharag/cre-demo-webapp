// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUsers, deleteUser } from "../../utils/Api.js";
import UserFormModal from "./UserFormModal.jsx";
import UserFilters from "./UserFilters.jsx";
import EditUserModal from "./EditUserModal.jsx";

const UserForm = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filters, setFilters] = useState({
        firstName: '',
        lastName: '',
        username: '',
        role: '',
    });
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);


    useEffect(() => {
        getUsers().then((data) => {
            setUsers(data);
            setFilteredUsers(data);
        });
    }, []);

    useEffect(() => {
        const filtered = users.filter((user) =>
            Object.keys(filters).every((key) => user[key]?.toLowerCase().includes(filters[key].toLowerCase()))
        );
        setFilteredUsers(filtered);
    }, [filters, users]);

    const refreshUsers = () => {
        getUsers().then((data) => {
            setUsers(data);
            setFilteredUsers(data);
        });
    };

    const handleEdit = (userId) => {
        const user = users.find(u => u.id === userId);
        if (user) {
            setUserToEdit(user);
            setEditModalOpen(true);
        }
    };

    const handleDelete = (userId) => {
        deleteUser(userId).then(() => {
            refreshUsers();
        });
    };

    const headerStyle = {
        fontWeight: 'bold',
        fontSize: '1.2rem',
    };

    return (
        <Box sx={{ width: '100%', mt: 10 }}>
            <Typography variant="h5" gutterBottom>
                Lista de Usuarios
            </Typography>

            {/* Filter Component */}
            <UserFilters filters={filters} setFilters={setFilters} />

            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table aria-label="user table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={headerStyle}>Nombre</TableCell>
                            <TableCell sx={headerStyle}>Apellido</TableCell>
                            <TableCell sx={headerStyle}>Usuario</TableCell>
                            <TableCell sx={headerStyle}>Rol</TableCell>
                            <TableCell sx={headerStyle}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>
                                    <Tooltip title="Editar" arrow>
                                        <IconButton onClick={() => handleEdit(user.id)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar" arrow>
                                        <IconButton onClick={() => handleDelete(user.id)} color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setFormModalOpen(true)}>
                Crear Nuevo Usuario
            </Button>

            <UserFormModal
                open={formModalOpen}
                handleClose={() => setFormModalOpen(false)}
                onUserAdded={refreshUsers}
            />

            <EditUserModal
                open={editModalOpen}
                handleClose={() => {
                    setEditModalOpen(false);
                    setUserToEdit(null); // Reset user to edit when closing
                }}
                userToEdit={userToEdit}
                onUserUpdated={refreshUsers}
            />

        </Box>
    );
};

export default UserForm;
