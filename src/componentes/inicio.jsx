import axios from "axios";
import { useEffect, useState } from "react";

const Inicio = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:8080/users/check-session", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data.user);
        setUser(response.data?.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h1>
            Bienvenido <strong>{user}</strong>
          </h1>
        </div>
      ) : (
        <h1>Inicio</h1>
      )}
    </div>
  );
};

export default Inicio;
