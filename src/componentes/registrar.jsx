import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Registrar = () => {
  const { register, handleSubmit } = useForm();
  const [errorPass, setErrorPass] = React.useState([]);

  const validarPass = (pass) => {
    let error = [];
    if (pass.length < 8) {
      error.push("La contraseña debe tener al menos 8 caracteres.");
    }
    if (!/[^a-zA-Z0-9 ]/.test(pass)) {
      error.push("La contraseña debe tener al menos un caracter especial.");
    }
    if (!/[A-Z]/.test(pass)) {
      error.push("La contraseña debe tener al menos un caracter en mayuscula.");
    }
    if (error.length < 1) {
      setErrorPass([]);
    } else {
      setErrorPass(error);
    }
    return error;
  };

  const registrar = (data) => {
    axios
      .post("http://localhost:8080/users/login", {
        user: data.user,
        password: "",
      })
      .then((response) => {})
      .catch((error) => {
        if (error.response.data === "Usuario no encontrado") {
          const error = validarPass(data.password);
          if (!error[0]) {      
            axios
              .post("http://localhost:8080/users/register", {
                user: data.user,
                password: data.password,
              })
              .then((response) => {
                alert("Usuario registrado");
              })
              .catch((error) => {
                alert("Usuario ya existe");
              });
          }
        } else {
          alert("Usuario ya existe");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(registrar)} className="register-container">
      <div className="register-user-container">
        <div>
          <label htmlFor="input-user" className="label-register">
            Ingresar usuario:
          </label>
        </div>
        <div>
          <input
            type="text"
            name="input-user"
            placeholder="Nombre de usuario"
            className="input-register"
            {...register("user", { required: true })}
          />
        </div>
      </div>
      <span className="divisor"></span>
      <div className="register-password-container">
        <div>
          <label htmlFor="input-password" className="label-register">
            Ingresar Contraseña:
          </label>
        </div>
        <div>
          <input
            type="password"
            name="input-password"
            placeholder="Contraseña"
            className="input-register"
            {...register("password", { required: true })}
          />
        </div>
        {errorPass.map((el, index) => (
          <div className="errorPass"key={index}>{el}</div>
        ))}
      </div>
      <div>
        <button type="submit" className="btn-registrar-submit">
          Registrar
        </button>
      </div>
    </form>
  );
};

export default Registrar;
