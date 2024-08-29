import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.jsx";
import DefaultLayout from "../components/DefaultLayout.jsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                // eslint-disable-next-line react/no-children-prop
                <DefaultLayout children={<Home />} />
            } />
        </Routes>
    );
}

export default AppRoutes;