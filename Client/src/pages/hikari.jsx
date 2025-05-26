import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DoorOpen, Calendar, Clock, Users, User, PhoneCall, CircleXIcon, PlusCircle, SaveIcon } from "lucide-react";
import { use } from "react";
import ReservationsBox from "../components/ReservationsBox";
import Loading from "../components/loading";
import ModalMessage from "../components/modalMessage";
import GeneralModal from "../components/generalmodal";
import ChangePassword from "../components/changepassword";
import ChangeEmail from "../components/changeemail";
import HoursBox from "../components/hoursBox";
import TablesBox from "../components/tablesBox";
import AdminConfig from "../sections/adminconfig";
import BlockReservationModal from "../components/BlockReservationModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const [confirmedReservations, setConfirmedReservations] = useState([{}]);
  const [cancelledReservations, setCancelledReservations] = useState([{}]);
  const [changepass, setchangepass] = useState(false);
  const [changeemail, setchangeemail] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isreserved, setIsReserved] = useState(false);
  const [role, setRole] = useState("");
  const [canreserve, setCanreserve] = useState(true);
  const [nameReservation, setNameReservation] = useState("");
  const [phoneReservation, setPhoneReservation] = useState("");
  const [loadingHours, setLoadingHours] = useState(false);
  const [thereHours, setThereHours] = useState(null);
  const [settings, setSettings] = useState({
    allHours: [],
    typeOfTables: [],
    blockConfig: {
      enabled: false,
      startDate: "",
      endDate: "",
      reason: "",
    },
    unavailableDates: [],
  });

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Añadir al hikari.jsx después de la definición de estados
  const [showBlockModal, setShowBlockModal] = useState(false);

  // Verificar si hay un bloqueo activo
  useEffect(() => {
    // Solo verificar si el usuario es cliente y hay configuración de bloqueo
    console.log(settings, "settings");
    if (role === "client" && settings?.blockConfig?.enabled && settings.blockConfig.startDate && settings.blockConfig.endDate) {
      console.log("Verificando bloqueo...");
      const currentDate = new Date();
      const startDate = new Date(settings.blockConfig.startDate);
      const endDate = new Date(settings.blockConfig.endDate);

      // Resetear horas para comparar solo fechas
      currentDate.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      // Si la fecha actual está dentro del rango de bloqueo
      if (currentDate >= startDate && currentDate <= endDate) {
        setShowBlockModal(true);
        setCanreserve(false);
      }
    }
  }, [settings, role]);

  useEffect(() => {
    if (selectedDate) {
      setLoadingHours(true);
      setThereHours(null);
      axios
        .get(`${import.meta.env.VITE_API_URL}/gethours?date=${selectedDate}`)
        .then((res) => {
          //console.log(res.data);

          setAvailableHours(res.data);
          setThereHours(res.data.length > 0);
          setLoadingHours(false);
        })
        .catch((err) => {
          console.log(err);
        });

      //Se pueden 4 reservas por hora, si hay 4 reservas en una hora, se hace una consulta a la base de datos buscando las reservas en esa fecha y hora y si hay 4, se deshabilita esa hora
      // setAvailableHours([{ "9:00": false }, { "12:00": true }, { "14:00": false }, { "16:00": false }, { "19:00": false }]);
    }
  }, [selectedDate]);

  const getReservations = async (status) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/getreservations`,
        { status: status },
        { withCredentials: true }
      );
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
    if (!canreserve) {
      setMessage("No se pueden realizar reservas en este momento.");
      setModal(true);
      setIsReserved(false);
      return;
    }

    setLoading(true);
    const reservation = {
      date: selectedDate,
      hour: selectedHour,
      people: selectedPeople,
    };
    if (role == "admin") {
      reservation.name = nameReservation;
      reservation.phone = phoneReservation;
    }
    console.log(reservation);
    axios
      .post(`${import.meta.env.VITE_API_URL}/reserve`, { reservation }, { withCredentials: true })
      .then((res) => {
        //console.log(res.data.message);
        putReservations(role);
        setLoading(false);
        setMessage(res.data.message);
        setIsReserved(true);
        setModal(true);
      })
      .catch((err) => {
        //console.log(err);
        setLoading(false);
        setMessage(err.response.data.message);
        //console.log(err.response.data.message);
        setModal(true);
        setIsReserved(false);
      });

    //comprueba si tengo una reserva en la misma fecha, solo se puede tener una reserva por fecha,
  };

  // Get today's date formatted as YYYY-MM-DD
  const today = formatDate(new Date());

  // Get date 5 days from now as the maximum selectable date
  const maxDate = formatDate(new Date(new Date().setDate(new Date().getDate() + 6)));

  // Function to check if a date is a weekend
  // Function to check if a date is unavailable
  const isUnavailableDate = (date) => {
    // If date is empty or invalid, return false
    if (!date) return false;

    const d = new Date(date);

    // Check if date is valid before proceeding
    if (isNaN(d.getTime())) return false;

    // Check if it's a Sunday
    const isSunday = d.getDay() === 0; // 0 = Sunday

    // Format the date to match YYYY-MM-DD format for comparison
    const formattedDate = d.toISOString().split("T")[0];

    // Check if the date is in the custom disabled dates array
    const isDisabled = settings.unavailableDates?.includes(formattedDate) || false;
    // Return true if either condition is met
    return isSunday || isDisabled;
  };

  const handleDateChange = (e) => {
    if (!settings) return;

    const date = new Date(e.target.value);
    console.log(date, "date");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 7);

    if (date > maxDate) {
      setIsReserved(false);
      setModal(true);
      setMessage("No es posible reservar más de 7 días antes de la fecha.");
    } else if (!isUnavailableDate(date)) {
      setSelectedDate(e.target.value);
    } else {
      setIsReserved(false);
      setModal(true);
      setMessage("No es posible reservar en la fecha seleccionada.");
    }
  };

  const putReservations = async (role) => {
    //console.log(role, "entroooo");
    if (role == "client") {
      getReservations().then((res) => {
        console.log(res, "ESTE ES EL RES");
        setReservations(res);
      });
    } else {
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
      .get(`${import.meta.env.VITE_API_URL}/getsession`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (!res.data.user) {
          navigate("/login");
        } else {
          putReservations(res.data.user.role);
          setRole(res.data.user.role);
          setLoading(false);

          if (res.data.user.role == "admin") {
            axios
              .get(`${import.meta.env.VITE_API_URL}/getSettings`, { withCredentials: true })
              .then((res) => {
                const settings = res.data;
                if (settings.allHours[0] == "") {
                  settings.allHours = [];
                }
                setSettings(settings);
                console.log(settings, "settings");
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            axios
              .get(`${import.meta.env.VITE_API_URL}/getSettingsForClient`, { withCredentials: true })
              .then((res) => {
                const settings = res.data;
                setSettings(settings);
              })
              .catch((err) => {
                console.log(err);
              });
          }

          //console.log("Usuario logueado");
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);

  const handleLogout = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        navigate("/login");
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

      {showBlockModal && (
        <BlockReservationModal
          reason={settings?.blockConfig?.reason || "Temporalmente no disponible"}
          onClose={() => setShowBlockModal(false)}
        />
      )}
      <Link to={"/"} className=" flex absolute w-full justify-center items-center top-6 ">
        <h1 className="simbol text-4xl px-1 text-[#ff3e01]">i</h1>
        <h1 className=" title px-1 text-[#]">Hikari</h1>
      </Link>
      <button
        className="absolute top-6 left-6 bg-[#ff851c] hover:opacity-70 shadow-md transition-all active:scale-[0.9] rounded-lg px-2 py-3"
        onClick={handleLogout}
      >
        <DoorOpen className="text-white" />
      </button>
      <div className="w-[80%] space-y-10 m-[100px] flex flex-col items-center justify-center">
        <div className="bg-[white] shadow-xl p-10 w-full max-w-[1000px] rounded-lg text-black">
          <div>
            <h1 className=" w-full px-2 text-left text-xl mb-5">Nueva Reserva</h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-wrap justify-between space-y-6 sm:space-y-0">
                {role == "admin" && (
                  <>
                    <div className="w-full sm:max-w-[48%]">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
                      <div className="relative flex w-full ">
                        <div className=" mx-2 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={nameReservation}
                          onChange={(e) => setNameReservation(e.target.value)}
                          placeholder="Steven Arjona"
                          maxLength={30}
                          className="text-center w-full pr-2 h-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full sm:max-w-[48%]">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Telefono</label>
                      <div className="relative flex w-full ">
                        <div className="   mx-2 flex items-center pointer-events-none">
                          <PhoneCall className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          value={phoneReservation}
                          onChange={(e) => setPhoneReservation(e.target.value)}
                          placeholder="603434212"
                          maxLength={9}
                          className="text-center w-full pr-2 h-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="w-full sm:max-w-[48%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fecha</label>
                  <div className="relative flex w-full">
                    <div className="mx-2 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <DatePicker
                      selected={selectedDate ? new Date(selectedDate) : null}
                      onChange={(date) => {
                        if (date) {
                          console.log(date, "date");
                          const formattedDate = formatDate(date);
                          console.log(formattedDate, "formattedDate");
                          handleDateChange({ target: { value: formattedDate } });
                        }
                      }}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date(today)}
                      maxDate={new Date(maxDate)}
                      placeholderText="dd/mm/aaaa"
                      disabled={!canreserve}
                      className={`text-center w-full pr-2 h-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 ${
                        !canreserve ? "bg-gray-100 cursor-not-allowed opacity-70" : ""
                      }`}
                      required
                    />
                  </div>
                  {isUnavailableDate(selectedDate) && (
                    <p className="mt-2 text-sm text-red-600">No se permiten reservas los fines de semana</p>
                  )}
                </div>

                <div className="w-full sm:max-w-[48%]">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                  <div className="relative flex w-full ">
                    <div className="   mx-2 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    {!selectedDate ? (
                      <select
                        className="text-center  w-full h-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                        disabled
                      >
                        <option value="">Selecciona una fecha</option>
                      </select>
                    ) : AvailableHours.length > 0 ? (
                      <select
                        className="text-center w-full h-10  py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                        disabled={loadingHours}
                        onChange={() => setSelectedHour(event.target.value)}
                      >
                        <option value="">{loadingHours ? "Cargando Horas" : "Selecciona una hora"}</option>
                        {AvailableHours.map((hour, index) => {
                          return (
                            <option key={index} value={hour.hour} disabled={!hour.available}>
                              {hour.hour}
                            </option>
                          );
                        })}
                      </select>
                    ) : (
                      <select
                        className="text-center  w-full h-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        required
                        disabled
                      >
                        <option value="">{loadingHours ? "Cargando Horas":"No hay horas disponibles"}</option>
                      </select>
                    )}
                  </div>
                </div>

                <div className="w-full sm:pt-9">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Número de Personas</label>
                  <div className="relative flex w-full ">
                    <div className="   mx-2 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      className="text-center w-full overflow-hidden py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      required
                      onChange={() => setSelectedPeople(event.target.value)}
                    >
                      <option value="">Número de personas</option>
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
                disabled={!canreserve}
                className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors ${
                  canreserve ? "bg-orange-600 text-white hover:bg-orange-700" : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                Confirmar Reserva
              </button>
            </form>
          </div>
        </div>
        <div className="bg-[white] shadow-xl p-10  w-full max-w-[1000px] rounded-lg text-black">
          {role == "client" ? (
            <>
              <h1 className=" w-full px-2 text-left text-xl">Mis Reservas</h1>
              {Reservations.length === 0 && <h1 className="text-center">No hay reservas</h1>}
              {Reservations.map((reservation, index) => (
                <ReservationsBox
                  setLoading={setLoading}
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
              <div className="size-full rounded-lg max-h-[500px] overflow-y-auto">
                {confirmedReservations.length === 0 && (
                  <h1 className="text-xs opacity-35 text-center">No hay reservas confirmadas</h1>
                )}
                {confirmedReservations.map((reservation, index) => (
                  <ReservationsBox
                    setLoading={setLoading}
                    key={index}
                    update={putReservations}
                    role={role}
                    reservation={reservation}
                  />
                ))}
              </div>

              <div className="w-full my-5 border border-[#3f3f3f62]"></div>

              <h1 className=" w-full px-2 text-left text-xl">Canceladas</h1>
              <div className="size-full rounded-lg max-h-[500px] overflow-y-auto">
                {cancelledReservations.length === 0 && (
                  <h1 className="text-xs opacity-35 text-center">No hay reservas canceladas</h1>
                )}
                {cancelledReservations.map((reservation, index) => (
                  <ReservationsBox
                    setLoading={setLoading}
                    key={index}
                    update={putReservations}
                    role={role}
                    reservation={reservation}
                  />
                ))}
              </div>
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

        {role == "admin" && <AdminConfig settings={settings} setSettings={setSettings} setLoading={setLoading} />}
      </div>
    </div>
  );
}

export default Hikari;
