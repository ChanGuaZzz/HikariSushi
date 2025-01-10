import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Hikari() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/getsession", { withCredentials: true })
      .then((res) => {
        console.log(res.data.user);
        if (!res.data.user) {
          navigate("/login");
        } else {
          console.log("Usuario logueado");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    axios
      .get("http://localhost:3000/logout", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>hikari</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}

export default Hikari;
