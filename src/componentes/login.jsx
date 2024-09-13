import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
  const { register, handleSubmit } = useForm();
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [noEncontrado, setNoEncontrado] = useState(null);
  const navigate = useNavigate();

  const inputTouch = (e) => {
    const label = document.querySelector("#label-untouched");
    const inputUser = document.querySelector("#input-user-untouched");
    label.classList.remove("label-untouched");
    label.classList.add("label-touched");
    inputUser.classList.remove("input-user-untouched");
    inputUser.classList.add("input-user-touched");
  };

  useEffect(()=>{
    axios.get("http://localhost:8080/users/check-session", {withCredentials: true})
    .then((response)=>{
      if (response.data.user) {
        navigate("/inicio");
      };
    });
  },[]);

  const checkUser = (data) => {
    axios
      .post(
        "http://localhost:8080/users/login",
        {
          user: data.username,
          password: "",
        },
        { withCredentials: true }
      )
      .then((response) => {})
      .catch((error) => {
        if (error.response.data === "Contraseña incorrecta") {
          setUser(data.username);
        } else {
          setNoEncontrado("noEncontrado");
          setTimeout(() => {
            setNoEncontrado(null);
          }, 3000);
        }
      });
  };

  useEffect(() => {
    if (user === "") {
      document.querySelector("#input-user").value = "";
    } else {
      document.querySelector("#input-password").focus();
      document.querySelector("#input-password").value = "";
    }
  }, [user]);

  const checkPass = (data) => {
    axios
      .post(
        "http://localhost:8080/users/login",
        {
          user: user,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        navigate("/inicio");
      })
      .catch((error) => {
        setError(error.response.data);
        setTimeout(() => {
          setError(null);
        }, 3000);
      });
  };

  return (
    <div>
      {user !== "" && user !== "noEncontrado" ? (
        <form
          onSubmit={handleSubmit(checkPass)}
          className={user ? "contraseña" : "contra-movido"}
        >
          <p>
            Ingresando como <i>{user}</i>
          </p>
          <div className="input-password-container">
            <div className="input-password">
              <input
                type="password"
                placeholder="Ingresar contraseña"
                id="input-password"
                {...register("password", { required: true })}
              />
            </div>
            <div className="siguiente-button">
              <button type="submit">Ingresar</button>
              <button
                onClick={() => {
                  setUser("");
                }}
                id="btn-cambiar-usuario"
              >
                Cambiar usuario
              </button>
            </div>
            <div className="error">{error}</div>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit(checkUser)}>
          <div className="usuario">
            <div className="input-container">
              <label
                htmlFor="input-user"
                className="label-untouched"
                id="label-untouched"
              >
                Ingresar usuario
              </label>
              <div id="input-user-untouched">
                <input
                  type="text"
                  id="input-user"
                  onFocus={inputTouch}
                  {...register("username", { required: true })}
                />
                <div className="siguiente-button">
                  <button type="submit">Siguiente</button>
                  <Link to="/registrar">
                    <button>Registrarse</button>
                  </Link>
                </div>
              </div>
            </div>
            <div>
              {noEncontrado ? (
                <div>
                  <p className="error">Usuario no encontrado</p>
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
