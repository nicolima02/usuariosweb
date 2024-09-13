import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fechaAGMT } from "../services/helperFechas";
import { useNavigate } from "react-router-dom";

const Auditorias = () => {
  const [user, setUser] = useState(null);
  const [auditorias, setAuditorias] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [filtros, setFiltros] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8080/users/check-session", {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data?.message.includes("jwt expired")) {
          alert("Sesión expirada");
          navigate("/login");
        }
        setUser(response.data?.user);
      })
      .catch((error) => {
        alert("Sesión no iniciada");
      });
  }, []);

  const consultar = (data) => {
    setLoading(true);
    let paginaParam = null;
    if (JSON.stringify(filtros) !== JSON.stringify(data)) {
      paginaParam = 1;
      setPagina(paginaParam);
    } else {
      paginaParam = pagina;
    }
    axios
      .post(
        "http://localhost:8080/auditorias",
        {
          filtros: { ...data, pagina: paginaParam },
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setAuditorias([]);
        setTimeout(() => {
          setAuditorias(response.data);
        }, 900);
      })
      .catch((error) => {});
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setSubmitted(true);
    setFiltros(data);
  };

  return (
    <div>
      {user === "admin" ? (
        <div>
          {/* filtros */}
          <form onSubmit={handleSubmit(consultar)}>
            <div className="filtros-container">
              <div className="filtro-container">
                <label htmlFor="usuario">Usuario</label>
                <input type="text" name="usuario" {...register("user")} />
              </div>
              <div className="filtro-container">
                <label htmlFor="fechaDesde">Fecha desde: </label>
                <input
                  type="date"
                  name="fechaDesde"
                  {...register("fechaDesde")}
                />
              </div>
              <div className="filtro-container">
                <label htmlFor="fechaHasta">Fecha hasta: </label>
                <input
                  type="date"
                  name="fechaHasta"
                  {...register("fechaHasta")}
                />
              </div>
              <div className="filtro-container">
                <label htmlFor="accion">Accion:</label>
                <select name="accion" {...register("accion")}>
                  <option value=""></option>
                  <option value="Registro">Registrar</option>
                  <option value="login">Login</option>
                </select>
              </div>
            </div>
              <button type="submit" className="btn-consultar">
                <i className="fas fa-search"></i>Consultar
              </button>
            {loading ? <h3>Cargando...</h3> : null}
            {/* fin filtros */}
            {auditorias?.length > 0 ? (
              <div>
                <h1>Auditorias</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Operacion</th>
                      <th>Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditorias.map((auditoria) => (
                      <tr key={auditoria.id}>
                        <td>{auditoria.user}</td>
                        <td>{auditoria.accion}</td>
                        <td>{fechaAGMT(auditoria.fecha)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* paginador */}
                <div className="paginador">
                  <button
                    onClick={(ev) => {
                      pagina > 1 ? setPagina(pagina - 1) : ev.preventDefault();
                    }}
                    className={pagina > 1 ? "btn-cambioPaginador" : "invisible"}
                  >
                    Anterior
                  </button>

                  <span>{pagina}</span>
                  <button
                    onClick={(ev) => {
                      auditorias.length === 10
                        ? setPagina(pagina + 1)
                        : ev.preventDefault();
                    }}
                    className={
                      auditorias.length === 10
                        ? "btn-cambioPaginador"
                        : "invisible"
                    }
                  >
                    Siguiente
                  </button>
                </div>
                {/* fin paginador */}
              </div>
            ) : null}
            <div className="error">
              {auditorias.length === 0 && submitted && !loading ? (
                <h3>No hay registros</h3>
              ) : null}
            </div>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Auditorias;
