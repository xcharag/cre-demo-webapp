import NavbarComponent from "./navbar/NavbarComponent.jsx";

// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ children }) => {
    return (
        <>
            <NavbarComponent/>
            {children}
        </>
    );
}

export default DefaultLayout;