import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  useEffect(() => {
    axios
      .get("http://localhost:8080/users/check-session", {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data?.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location.pathname]);

  const cerrarSesion = () => {
    axios
      .post("http://localhost:8080/users/logout", {}, { withCredentials: true })
      .then((response) => {
        setUser(null);
        window.location.reload();
      });
  };
  return (
    <nav className="navBar">
      <ul>
        <Link to="/inicio">
          <li>Inicio</li>
        </Link>
        <Link to="/registrar">
          <li>Registrarse</li>
        </Link>
        {user == "admin" ? (
          <Link to="/auditorias">
            <li>Auditorias</li>
          </Link>
        ) : null}
      </ul>
      <div className="user-navbar-container">
        <p className="user-navbar">{user}</p>
        {user ? <button onClick={cerrarSesion}>Cerrar sesión</button> : <Link to="/login"><button style={{backgroundColor: 'rgb(37, 109, 37)'}}>Iniciar Sesión</button></Link>}
      </div>
    </nav>
  );
};

export default NavBar;
