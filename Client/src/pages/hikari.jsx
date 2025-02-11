import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoorOpen, Calendar, Clock, Users } from "lucide-react";
import { use } from "react";
import ReservationsBox from "../components/ReservationsBox";
import Loading from "../components/loading";
import ModalMessage from "../components/modalMessage";
import GeneralModal from "../components/generalmodal";
import ChangePassword from "../components/changepassword";
import ChangeEmail from "../components/changeemail";
// import { io } from "socket.io-client";
// const socket = io("ws://localhost:3000", {
//   withCredentials: true,
//   transports: ["websocket"],
// });

function Hikari() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedPeople, setSelectedPeople] = useState("");
  const [AvailableHours, setAvailableHours] = useState([]);
  const [Reservations, setReservations] = useState([{}]);
  const [pendingReservations, setPendingReservations] = useState([{}]);
  const [confirmedReservations, setConfirmedReservations] = useState([{}]);
  const [cancelledReservations, setCancelledReservations] = useState([{}]);
  const [changepass, setchangepass] = useState(false);
  const [changeemail, setchangeemail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isreserved, setIsReserved] = useState(false);
  const [role, setRole] = useState("");

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };


  useEffect(() => {
    if (selectedDate) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/gethours?date=${selectedDate}`)
        .then((res) => {
          //console.log(res.data);
          setAvailableHours(res.data);
        })
        .catch((err) => {
          //console.log(err);
        });

      //Se pueden 4 reservas por hora, si hay 4 reservas en una hora, se hace una consulta a la base de datos buscando las reservas en esa fecha y hora y si hay 4, se deshabilita esa hora
      // setAvailableHours([{ "9:00": false }, { "12:00": true }, { "14:00": false }, { "16:00": false }, { "19:00": false }]);
    }
  }, [selectedDate]);

  const getReservations = async (status) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/getreservations`, { status: status }, { withCredentials: true });
      //console.log(res.data);
      return res.data;
    } catch (err) {
      //console.log(err);
      return [];
    }
  };
  //devuelve un array de objetos con las reservas

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const reservation = {
      date: selectedDate,
      hour: selectedHour,
      people: selectedPeople,
    };
    //console.log(reservation);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/reserve`, { reservation }, { withCredentials: true })
      .then((res) => {
        //console.log(res.data.message);
        putReservations(role);
        setLoading(false);
        setMessage(res.data.message);
        setIsReserved(true);
      })
      .catch((err) => {
        //console.log(err);
        setLoading(false);
        setMessage(err.response.data.message);
        //console.log(err.response.data.message);
        setIsReserved(false);
      });

    setModal(true);

    //comprueba si tengo una reserva en la misma fecha, solo se puede tener una reserva por fecha,
  };

  // Get today's date formatted as YYYY-MM-DD
  const today = formatDate(new Date());

  // Get date 2 months from now as the maximum selectable date
  const maxDate = formatDate(new Date(Date.now() + 60 * 24 * 60 * 60 * 1000));

  // Function to check if a date is a weekend
  const isWeekend = (date) => {
    const d = new Date(date);
    return d.getDay() === 0;
  };

  const handleDateChange = (e) => {
    const date = new Date(e.target.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer la hora a 00:00:00 para comparar solo la fecha

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 5); // Fecha máxima permitida (5 días después de hoy)

    if (date > maxDate) {
      setIsReserved(false);
      setModal(true);
      setMessage("No es posible reservar más de 5 días antes de la fecha.");
    } else if (!isWeekend(date)) {
      setSelectedDate(e.target.value);
    } else {
      setIsReserved(false);
      setModal(true);
      setMessage("No es posible reservar los domingo.");
    }
  };

  const putReservations = async (role) => {
    //console.log(role, "entroooo");
    if (role == "client") {
      //console.log("entro a client");
      getReservations().then((res) => {
        setReservations(res);
      });
    } else {
      getReservations("pending").then((res) => {
        setPendingReservations(res);
      });
      getReservations("confirmed").then((res) => {
        setConfirmedReservations(res);
      });

      getReservations("cancelled").then((res) => {
        setCancelledReservations(res);
      });
    }
  };

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/getsession`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (!res.data.user) {
          navigate("/login");
        } else {
          putReservations(res.data.user.role);
          setRole(res.data.user.role);
          setLoading(false);
          //console.log("Usuario logueado");
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  const handleLogout = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        // navigate("/login");
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#352c29] to-[#000000] flex flex-col items-center  ">
      {loading && <Loading />}
      {modal && (
        <ModalMessage
          message={message}
          iscorrect={isreserved}
          onClose={() => {
            setModal(false);
          }}
        />
      )}
      {changepass && (
        <GeneralModal
          onClose={() => {
            setchangepass(false);
          }}
        >
          <ChangePassword setLoading={setLoading} />
        </GeneralModal>
      )}

      {changeemail && (
        <GeneralModal
          onClose={() => {
            setchangeemail(false);
          }}
        >
          <ChangeEmail setLoading={setLoading} />
        </GeneralModal>
      )}
      <div className=" flex absolute w-full justify-center items-center top-6 ">
        <h1 className="simbol text-4xl px-1 text-[#ff3e01]">i</h1>
        <h1 className=" title px-1 text-[#]">Hikari</h1>
      </div>
      <button
        className="absolute top-6 left-6 bg-[#ff851c] hover:opacity-70 shadow-md transition-all active:scale-[0.9] rounded-lg px-2 py-3"
        onClick={handleLogout}
      >
        <DoorOpen className="text-white" />
      </button>
      <div className="w-[80%] space-y-10 m-[100px] flex flex-col items-center justify-center">
        <div className="bg-[white] shadow-xl p-10 w-full max-w-[1000px] rounded-lg text-black">
          {role == "client" ? (
            <div>
              <h1 className=" w-full px-2 text-left text-xl mb-5">Nueva Reserva</h1>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        min={today}
                        max={maxDate}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                        onKeyDown={(e) => e.preventDefault()}
                      />
                    </div>
                    {isWeekend(selectedDate) && <p className="mt-2 text-sm text-red-600">No se permiten reservas los fines de semana</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      {AvailableHours.length > 0 ? (
                        <select
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                          onChange={() => setSelectedHour(event.target.value)}
                        >
                          <option value="">Selecciona una hora</option>
                          {AvailableHours.map((hour, index) => {
                            return (
                              <option key={index} value={hour}>
                                {hour}
                              </option>
                            );
                          })}
                        </select>
                      ) : (
                        <select
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                          disabled
                        >
                          <option value="">Selecciona una fecha</option>
                        </select>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Número de Personas</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Users className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        className="pl-10 w-full px-4 overflow-hidden py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                        onChange={() => setSelectedPeople(event.target.value)}
                      >
                        <option value="">Selecciona número de personas</option>
                        {Array.from({ length: 20 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} persona{i + 1 > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
                >
                  Confirmar Reserva
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h1 className=" w-full px-2 text-left text-xl mb-5"> Pendientes</h1>

              {pendingReservations.map((reservation, index) => (
                <ReservationsBox key={index} update={putReservations} role={role} reservation={reservation} />
              ))}
            </div>
          )}
        </div>
        <div className="bg-[white] shadow-xl p-10  w-full max-w-[1000px] rounded-lg text-black">
          {role == "client" ? (
            <>
              <h1 className=" w-full px-2 text-left text-xl">Mis Reservas</h1>

              {Reservations.map((reservation, index) => (
                <ReservationsBox
                  key={index}
                  update={() => {
                    putReservations("client");
                  }}
                  role={role}
                  reservation={reservation}
                />
              ))}
            </>
          ) : (
            <>
              <h1 className=" w-full px-2 text-left text-xl">Confirmadas</h1>

              {confirmedReservations.map((reservation, index) => (
                <ReservationsBox key={index} update={putReservations} role={role} reservation={reservation} />
              ))}

              <div className="w-full my-5 border border-[#3f3f3f62]"></div>

              <h1 className=" w-full px-2 text-left text-xl">Canceladas</h1>
              {cancelledReservations.map((reservation, index) => (
                <ReservationsBox key={index} update={putReservations} role={role} reservation={reservation} />
              ))}
            </>
          )}
        </div>
        <div className="flex flex-wrap  justify-center items-center">
          <button
            className="py-3 m-1 bg-[#dd300c] w-[300px] rounded-lg px-[50px]"
            onClick={() => {
              setchangeemail(true);
            }}
          >
            Cambiar Correo
          </button>
          <button
            className="py-3 m-1 bg-[#dd300c] w-[300px] rounded-lg px-[50px]"
            onClick={() => {
              setchangepass(true);
            }}
          >
            Cambiar contraseña
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hikari;
