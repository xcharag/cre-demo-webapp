import React from 'react';
import { TextField, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const UserFilters = ({ filters, setFilters }) => {
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
                label="Filtrar por Nombre"
                name="firstName"
                value={filters.firstName}
                onChange={handleFilterChange}
                variant="outlined"
            />
            <TextField
                label="Filtrar por Apellido"
                name="lastName"
                value={filters.lastName}
                onChange={handleFilterChange}
                variant="outlined"
            />
            <TextField
                label="Filtrar por Usuario"
                name="username"
                value={filters.username}
                onChange={handleFilterChange}
                variant="outlined"
            />
            <FormControl variant="outlined" sx={{ minWidth: 150 }}>
                <InputLabel shrink>Filtrar por Rol</InputLabel>
                <Select
                    name="role"
                    value={filters.role}
                    onChange={handleFilterChange}
                    label="Filtrar por Rol"
                    displayEmpty
                >
                    <MenuItem value="">
                        TODOS
                    </MenuItem>
                    <MenuItem value="USER">USUARIO</MenuItem>
                    <MenuItem value="ADMIN">ADMINISTRADOR</MenuItem>
                    <MenuItem value="OWNER">PROPIETARIO</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default UserFilters;
