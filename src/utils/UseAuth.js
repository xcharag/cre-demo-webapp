import { getUserData } from "./Api.js";
import {useState} from "react";

const BASE_URL = 'https://project-manager-web-crm-8b2dbc36e91e.herokuapp.com';

const authenticateUser = async (username, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    return response.json();
}

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (username, password) => {
        try {
            const data = await authenticateUser(username, password);
            if (data.token) {
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('username', username);
                await getUserData();
                setIsAuthenticated(true);
                return data;
            }
            throw new Error('Authentication failed');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
    };

    const checkAuth = async () => {
        const token = localStorage.getItem('authToken');
        const username = localStorage.getItem('username');
        let isAuthenticated;
        const response = await fetch(`${BASE_URL}/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, token }),
        });

        if (!response.ok) {
            isAuthenticated = false;
        } else {
            isAuthenticated = true;
        }

        setIsAuthenticated(isAuthenticated);
        return isAuthenticated;
    };

    return { isAuthenticated, login, logout, checkAuth };
};

export default useAuth;