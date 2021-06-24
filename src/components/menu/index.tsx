import { NavLink } from "react-router-dom";

export const Menu = () => {
  return (
    <div style={{ display: "block", padding: "1em" }}>
      <div>
        <NavLink to="/">Dashboard</NavLink>
      </div>
      <div>
        <NavLink to="/sales">Caja</NavLink>
      </div>
      <div>
        <NavLink to="/stock">Productos</NavLink>
      </div>
      <div>
        <NavLink to="/customer">Clientes</NavLink>
      </div>
      <div>
        <NavLink to="/supplier">Proveedores</NavLink>
      </div>
      <div>
        <NavLink to="/admin">Configuración</NavLink>
      </div>
    </div>
  );
};
