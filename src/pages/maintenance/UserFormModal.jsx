import React from 'react';
import { Box, Button, TextField, Typography, MenuItem, FormControl, InputLabel, Select, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../utils/Api.js";

const validationSchema = Yup.object({
    firstName: Yup.string().required('El nombre es obligatorio'),
    lastName: Yup.string().required('El apellido es obligatorio'),
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es obligatoria'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('La confirmación de la contraseña es obligatoria'),
    role: Yup.string().required('El rol es obligatorio'),
});

// eslint-disable-next-line react/prop-types
const UserFormModal = ({ open, handleClose, onUserAdded }) => {
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: '',
            role: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            registerUser(values).then(() => {
                onUserAdded();  // Callback to refresh user list
                handleClose();  // Close the modal
            });
        },
    });

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',  // Reduced modal width
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
    };

    const headerStyle = {
        fontWeight: 'bold',
        fontSize: '1.2rem'
    };

    const fieldStyle = {
        width: '100%',  // Full width within the modal
        maxWidth: '350px',  // Limit max width to make fields smaller
        marginBottom: '1rem'
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="user-form-modal"
            aria-describedby="user-form-description"
        >
            <Box sx={modalStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography id="user-form-modal" variant="h6" component="h2" sx={headerStyle}>
                        Crear Nuevo Usuario
                    </Typography>
                    <IconButton onClick={handleClose} color="inherit">
                        <CloseIcon />
                    </IconButton>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        sx={fieldStyle}
                        label="Nombre"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        sx={fieldStyle}
                        label="Apellido"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                    <TextField
                        sx={fieldStyle}
                        label="Nombre de Usuario"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField
                        sx={fieldStyle}
                        label="Contraseña"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        sx={fieldStyle}
                        label="Ingresa de nuevo tu contraseña"
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
            </Box>
        </Modal>
    );
};

export default UserFormModal;
