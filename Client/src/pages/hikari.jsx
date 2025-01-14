import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoorOpen, Calendar, Clock, Users } from "lucide-react";
import { use } from "react";
import ReservationsBox from "../components/ReservationsBox";
import Loading from "../components/loading";
import ModalMessage from "../components/modalMessage";

function Hikari() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedPeople, setSelectedPeople] = useState("");
  const [AvailableHours, setAvailableHours] = useState([]);
  const [Reservations, setReservations] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  useEffect(() => {
    if (selectedDate) {
      // axios
      //   .get(`http://localhost:3000/gethours?date=${selectedDate}`)
      //   .then((res) => {
      //     console.log(res.data);
      //     setAvailableHours(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      //Se pueden 4 reservas por hora, si hay 4 reservas en una hora, se hace una consulta a la base de datos buscando las reservas en esa fecha y hora y si hay 4, se deshabilita esa hora
      setAvailableHours([{ "9:00": false }, { "12:00": true }, { "14:00": false }, { "16:00": false }, { "19:00": false }]);
    }
  }, [selectedDate]);

  const getReservations = async () => {
    // axios
    //   .get("http://localhost:3000/getreservations", { withCredentials: true })
    //   .then((res) => {
    //     console.log(res.data);
    //     setReservations(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    }
    //devuelve un array de objetos con las reservas

    const handleSubmit = (e) => {
      setLoading(true);
      e.preventDefault();
      const reservation = {
        date: selectedDate,
        hour: selectedHour,
        people: selectedPeople,
      };
      console.log(reservation);
      axios
        .post("http://localhost:3000/reserve", {reservation}, { withCredentials: true })
        .then((res) => {
          console.log(res.data.message);
          getReservations();
          setLoading(false);
          setMessage(res.data.message);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setMessage(err.response.data.message);
          console.log(err.response.data.message);
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
    return d.getDay() === 0 || d.getDay() === 6;
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    if (!isWeekend(date)) {
      setSelectedDate(date);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/getsession", { withCredentials: true })
      .then((res) => {
        console.log(res.data.user);
        if (!res.data.user) {
          navigate("/login");
        } else {
          getReservations();
          setLoading(false);
          console.log("Usuario logueado");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setReservations([
      { date: "2025-01-01", hour: "12:00", people: 2, status: "confirmed" },
      { date: "2025-01-01", hour: "14:00", people: 4, status: "canceled" },
      { date: "2025-01-01", hour: "16:00", people: 6, status: "pending" },
    ]);
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
    <div className="relative min-h-screen bg-gradient-to-br from-[#352c29] to-[#000000] flex flex-col items-center  ">
      {loading && <Loading />}
      {modal && <ModalMessage message={message} onClose={()=>{setModal(false)}}/>}
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
                      {AvailableHours.map((hourObj, index) => {
                        const hour = Object.keys(hourObj)[0];
                        const isDisabled = !hourObj[hour];
                        return (
                          <option key={index} value={hour} disabled={isDisabled}>
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
        <div className="bg-[white] shadow-xl p-10  w-full max-w-[1000px] rounded-lg text-black">
          <h1 className=" w-full px-2 text-left text-xl">Mis Reservas</h1>

          {Reservations.map((reservation, index) => (
            <ReservationsBox key={index} reservation={reservation} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hikari;
