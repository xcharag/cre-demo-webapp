import {Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import useAuth from "../utils/UseAuth.js";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { checkAuth } = useAuth();

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const isAuth = await checkAuth();
                setIsAuthenticated(isAuth);
            } catch (error) {
                console.error('Validation error:', error);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        verifyAuth().then(r => console.log(r));
    }, [checkAuth]);

    if (isLoading) {
        return <div>Loading...</div>; // Show a loading indicator while checking authentication
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
}

export default ProtectedRoute;