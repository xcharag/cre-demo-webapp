// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import { Box, Button, TextField, Typography, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {getUsers, registerUser} from "../../utils/Api.js";
import UserListModal from "./UserListModal.jsx";

const validationSchema = Yup.object({
    firstName: Yup.string().required('El nombre es obligatorio'),
    lastName: Yup.string().required('El apellido es obligatorio'),
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
    role: Yup.string().required('El rol es obligatorio'),
});

const UserForm = () => {
    const [userModalOpen, setUserModalOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            role: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
            registerUser(values).then(r => console.log(r));
        },
    });

    return (
        <Box sx={{ width: '100%', maxWidth: 500, margin: '0 auto', mt: 10 }}>
            <Typography variant="h5" gutterBottom>
                Crear Nuevo Usuario
            </Typography>

            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    label="Nombre"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Apellido"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Nombre de Usuario"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Contraseña"
                    type="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    margin="normal"
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel>Rol</InputLabel>
                    <Select
                        name="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        error={formik.touched.role && Boolean(formik.errors.role)}
                    >
                        <MenuItem value="USER">USUARIO</MenuItem>
                        <MenuItem value="ADMIN">ADMINISTRADOR</MenuItem>
                        <MenuItem value="OWNER">PROPIETARIO</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Guardar Usuario
                </Button>
            </form>

            <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 2 }} onClick={() => setUserModalOpen(true)}>
                Ver Usuarios
            </Button>

            <UserListModal open={userModalOpen} handleClose={() => setUserModalOpen(false)} />
        </Box>
    );
};

export default UserForm;
