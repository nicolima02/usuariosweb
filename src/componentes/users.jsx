import axios from "axios";
import { useState } from "react";
import { useForm} from "react-hook-form";
import { Link } from "react-router-dom";

const Users = () => {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const checkUser = (data) => {
    console.log(data);
    if (data.username === "admin") {
      //buscar en bd los usuarios
      setUser(data.username);
      console.log("Usuario encontrado");
    } else {
      setUser("noEncontrado");
      setTimeout(() => {
        setUser("");
      }, 3000);
    }
  };

  const checkPass = (data) => {
    //autenticar
    if (data.password === "admin") {
      setPassword(data.password);
      axios.post("http://localhost:8080/users/login", {
        user: user,
        password: data.password,
      }, { withCredentials: true }).then((response) => {
        console.log(response.data);
      })
    } else {
      console.log("Contraseña incorrecta");
    }
  };

  return (
    <div>
      {user !== "" && user !== "noEncontrado" ? (
        <form onSubmit={handleSubmit(checkPass)}>
          <p>ingresando como {user}</p>
          <div>
            <div>
              <label htmlFor="input-password">Ingresar contraseña:</label>
            </div>
            <div className="input-password">
              <input
                type="password"
                placeholder="Ingresar contraseña"
                id="input-password"
                {...register("password", { required: true })}
              />
            </div>
            <div className="login-button">
              <button type="submit">Ingresar</button>
            </div>
            <button
              onClick={() => {
                setUser("");
              }}
            >
              Cambiar usuario
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(checkUser)}>
          <div className="login">
            <div>
              <label htmlFor="input-user">Ingresar usuario:</label>
            </div>
            <div className="input-user">
              <input
                type="text"
                placeholder="Ingresar usuario"
                id="input-user"
                {...register("username", { required: true })}
              />
            </div>
            <div className="siguiente-button">
              <button type="submit">Siguiente</button>
              <Link to="/registrar"><button>Registrarse</button></Link>
            </div>
            <div>
              {user === "noEncontrado" ? (
                <div>
                  <p>Usuario no encontrado</p>
                </div>
              ) : null}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Users;
