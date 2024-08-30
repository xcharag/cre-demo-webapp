import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Drawer, List } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DropdownWithDividers from './options/DropdownOption.jsx';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import BuildIcon from '@mui/icons-material/Build';

const NavbarComponent = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const dropdowns = [
        { label: 'Clientes', options: ['Datos de Clientes', 'Listado de Clientes', 'Kardex de Clientes', 'Pagos por Clientes', 'Deudas por Clientes'], icon: <PersonIcon sx={{mr:1}}/> },
        { label: 'Proyectos', options: ['Crear Proyecto', 'Modificar Proyecto', 'Consultar Proyecto', 'Registrar Tipo de Proyectos', 'hr',
                'Crear Solicitud de Material', 'Modificar Solicitud de Material', 'Consultar Solicitud de Material', ' Registrar Tipo de Solicitud', 'hr',
                'Registrar Pagos de proyectos', 'Consultar Pagos de Proyecto', 'hr',
                'Registrar egresos por proyecto', 'Consultar egresos', 'Registrar tipo de egresos', 'Listar egresos por proyectos', 'hr',
                'Registrar Datos de Empleados', 'Listar Empleados','Registrar Datos de Responsables'], icon: <BusinessIcon sx={{mr:1}}/> },
        { label: 'Compras', options: ['Datos de Proveedor', 'Kardex de Proveedor', 'hr',
                'Crear orden de Compra','Modificar Orden de Compra', 'Consultar Orden de Compra', 'hr',
                'Pagos a proveedores', 'Modificar Pagos a Proveedores', 'Consultar Pago a Proveedores', 'hr',
                'Listado de Proveedores', 'Compras por Proveedor', 'Compras por Proyecto', 'Pagos por proveedor', 'Deudas por proveedor', 'Orden de compra pendiente de ingreso', ' Resumen de compras', 'Pagos por orden de compra'], icon: <ShoppingCartIcon sx={{mr:1}}/> },
        { label: 'Inventarios', options: ['Rubros de Productos', 'Unidades de Medida', 'Tipos de Salidas', 'Datos de Almacenes','hr',
                'Datos de Productos','Cargar Inventario Inicial', 'Kardex de Productos','Regularizar Kardex','hr',
                'Ingreso al Almacen','Modificar Ingreso','Consulta de Ingresos','hr',
                'Salida del Almacen','Modificar Salida','Consulta de Salidas','hr',
                'TOMA DE INVENTARIO','hr',
                'Lista de Precios','Estado de Inventario','Detalle de Ingresos','Resumen de Ingresos','Detalles de Salidas x Proyecto','Resumen de Inventario','Salidas por Proyecto'], icon: <InventoryIcon sx={{mr:1}}/> },
        { label: 'Mantenimiento', options: ['Cambiar Clave de acceso','Definir Mes de trabajo','Dolar del dia','Reindexar la base de datos','Cerrar la gestion actual','Parametros del sistema','Usuarios','Inicializar el sistema','Datos de Empresa','Informacion del Sistema'], icon: <BuildIcon sx={{mr:1}}/> },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                My Application
            </Typography>
            <List>
                {dropdowns.map((dropdown, index) => (
                    <DropdownWithDividers
                        key={index}
                        label={dropdown.label}
                        options={dropdown.options}
                        isMobile={true}
                        icon={dropdown.icon}
                    />
                ))}
            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Application
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {dropdowns.map((dropdown, index) => (
                            <DropdownWithDividers
                                key={index}
                                label={dropdown.label}
                                options={dropdown.options}
                                isMobile={false}
                                icon={dropdown.icon}
                            />
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </>
    );
};

export default NavbarComponent;
