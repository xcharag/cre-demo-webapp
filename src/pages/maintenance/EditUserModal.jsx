import React, { useEffect } from 'react';
import { Box, Button, TextField, Typography, MenuItem, FormControl, InputLabel, Select, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from "../../utils/Api.js";

const validationSchema = Yup.object({
    firstName: Yup.string().required('El nombre es obligatorio'),
    lastName: Yup.string().required('El apellido es obligatorio'),
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
    role: Yup.string().required('El rol es obligatorio'),
});

// eslint-disable-next-line react/prop-types
const EditUserModal = ({ open, handleClose, userToEdit, onUserUpdated }) => {
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
            updateUser(values).then(() => {
                onUserUpdated();  // Callback to refresh user list
                handleClose();  // Close the modal
            });
        },
    });

    useEffect(() => {
        if (userToEdit) {
            formik.setValues({
                // eslint-disable-next-line react/prop-types
                firstName: userToEdit.firstName,
                // eslint-disable-next-line react/prop-types
                lastName: userToEdit.lastName,
                // eslint-disable-next-line react/prop-types
                username: userToEdit.username,
                // eslint-disable-next-line react/prop-types
                role: userToEdit.role,
                password: '',
                confirmPassword: '',
            });
        }
    }, [userToEdit]);

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="edit-user-modal"
            aria-describedby="edit-user-description"
        >
            <Box sx={modalStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography id="edit-user-modal" variant="h6" component="h2">
                        Editar Usuario
                    </Typography>
                    <IconButton onClick={handleClose} color="inherit">
                        <CloseIcon />
                    </IconButton>
                </Box>

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
                        label="Nuevo Password"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Confirmar Nuevo Password"
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                        Confirmar Cambios
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default EditUserModal;
