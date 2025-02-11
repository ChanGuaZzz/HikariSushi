import { useEffect, useState } from "react";
import { Utensils, Mail, Lock, User, Phone } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { use } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [errorpassword, setErrorpassword] = useState(false);
  const [isInLogin, setisInLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);

  const login = async (email, password) => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/login`, { email, password }, { withCredentials: true })
      .then((res) => {
        //console.log(res.data);
        navigate("/hikari");
      })
      .catch((err) => {
        //console.log(err.response.data.message);
        setError(err.response.data.message || "Error al crear usuario");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(email);
    //console.log(password);
    //console.log(confirmPassword);
    if (isInLogin) {
      login(email, password);
    } else {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/register`, { email, password, name, phone })
        .then((res) => {
          //console.log(res.data);
          login(email, password);
        })
        .catch((err) => {
          //console.log(err.response.data.message);
          setError(err.response.data.message || "Error al crear usuario");
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/getsession`, { withCredentials: true })
      .then((res) => {
        //console.log(res.data.user);
        if (res.data.user) {
          navigate("/hikari");
        } else {
          //console.log("Usuario logueado");
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  useEffect(() => {
    if (password !== confirmPassword) {
      setErrorpassword(true);
      return;
    } else {
      setErrorpassword(false);
    }
  }, [confirmPassword, password]);
  return (
    <>
      <div className="min-h-screen  bg-gradient-to-br from-[#352c29] to-[#000000] flex items-center justify-center">
        <div className={`bg-white p-8 rounded-lg flex flex-col ${!isInLogin?"sm:flex-row sm:max-w-2xl sm:w-[80%]":"sm:max-w-md"} justify-center sm:justify-around shadow-2xl w-full min-h-screen sm:min-h-0  `}>
          <div className="text-center mb-3 flex flex-col items-center justify-center bg-[#]">
            <div className={`flex flex-col justify-center mb-4 `}>
              <h1 className="simbol text-[#ff3e01] text-8xl">i</h1>
              <h1 className="title text-[#5f4842]">Hikari</h1>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">{isInLogin ? "Bienvenido" : "Crear Cuenta"} </h2>
            <p className="text-gray-600">Inicia sesión para hacer tu reserva</p>
          </div>

          <h1 className="text-orange-800 text-center h-8">{error} </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 w-full text-black px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {!isInLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre Completo</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Antonio Pérez Lopez"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10 w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="688297781"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  minLength={5}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 w-full px-4 p-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {!isInLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirma contraseña</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 w-full px-4 p-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                    required
                    minLength={5}
                  />
                </div>
              </div>
            )}

            <h1 className="text-blue-800 text-center h-4 text-[13px] text-wrap ">{errorpassword && !isInLogin && "Las contraseñas no coinciden"} </h1>
            {errorpassword && !isInLogin ? (
              <button
                disabled
                className="w-full bg-[#ff3e01] hover:bg-red-700 opacity-45 text-white py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                {isInLogin ? "Iniciar Sesión" : "Registrarse"}
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#ff3e01] hover:bg-red-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                {isInLogin ? "Iniciar Sesión" : "Registrarse"}
              </button>
            )}

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setisInLogin(!isInLogin);
                }}
                className="text-[#ff3e01] hover:text-red-700 font-medium"
              >
                {isInLogin ? "¿No tienes cuenta? Regístrate" : " ¿Ya tienes cuenta? Inicia sesión"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
