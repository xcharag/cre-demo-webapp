// src/pages/Login.js

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import useAuth from '../utils/UseAuth.js';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(null); // Reset error before a new login attempt
            await login(username, password);
            navigate('/home');
        } catch (error) {
            console.error('Failed to login', error);
            setError('Error al iniciar sesion. Revisar los credenciales');
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: '100px' }}>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                style={{
                    backgroundColor: '#f7f7f7',
                    padding: '30px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                }}
            >
                <img
                    src="https://cloud-cube-us2.s3.amazonaws.com/g8gx1ba6gzvt/public/cooperativalogo.png"
                    alt="Logo"
                    style={{ height: '200px' }}
                />
                <Typography
                    variant="h4"
                    style={{ color: 'rgb(59, 187, 85)' }}
                    gutterBottom>
                    Inicio de Sesion
                </Typography>
                {error && <Typography color="error">{error}</Typography>}
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default Login;
