import NavbarComponent from "./navbar/NavbarComponent.jsx";

const DefaultLayout = ({ children }) => {
    return (
        <>
            <NavbarComponent>
                {children}
            </NavbarComponent>
        </>
    );
}

export default DefaultLayout;