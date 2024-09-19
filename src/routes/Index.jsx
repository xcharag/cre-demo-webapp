import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.jsx";
import DefaultLayout from "../components/DefaultLayout.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Login from "../pages/Login.jsx";
import Users from "../pages/maintenance/Users.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />

            <Route path="/home" element={
                <ProtectedRoute>
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <DefaultLayout children={<Home />} />
                </ProtectedRoute>
            } />

            <Route path="/usuarios" element={
                <ProtectedRoute>
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <DefaultLayout children={<Users />} />
                </ProtectedRoute>
            } />
        </Routes>
    );
}

export default AppRoutes;