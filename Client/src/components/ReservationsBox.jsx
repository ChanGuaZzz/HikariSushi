import { useState, useEffect, useRef } from "react";
import { Utensils, UsersRound, PhoneCall, SquareUser, Mail } from "lucide-react";
import { use } from "react";
import axios from "axios";

function ReservationsBox({ reservation, role, update, setLoading }) {
  const [manage, setManage] = useState(false);
  const formattedDate = new Date(reservation.date).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDateAdmin = new Date(reservation.date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const boxRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setManage(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [boxRef]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const ManageReservation = (action) => {
    setLoading(true);
    if (action === "cancelar") {
      //console.log("Cancelando");
      axios
        .post(`${import.meta.env.VITE_API_URL}/reservationManage`, { id: reservation.id, status: "cancelled" })
        .then((res) => {
          //console.log(res);
          update();
          
        })
        .catch((err) => {
          //console.log(err);
        }).finally(()=>{
          setLoading(false);
        });
    } else {
      //console.log("Confirmando");
      axios
        .post(`${import.meta.env.VITE_API_URL}/reservationManage`, { id: reservation.id, status: "confirmed" })
        .then((res) => {
          //console.log(res);
          update();
        })
        .catch((err) => {
          //console.log(err);
        }).finally(()=>{
          setLoading(false);
        });
    }
  };

  const capitalizedDate = capitalizeFirstLetter(formattedDate);

  useEffect(() => {
    console.log(reservation);
  }, [reservation]);
  return (
    <div
      ref={boxRef}
      onClick={() => {
        setManage(!manage);
      }}
      className={`${
        manage == false && "hover:brightness-90"
      } flex relative border cursor-pointer transition-all items-center bg-[#ebecec] shadow-lg w-full my-5 p-3 rounded-lg ${
        reservation.status == "cancelled" ? "opacity-50 " : "opacity-100"
      }`}
    >
      <div className={`absolute flex z-20  ${manage == false ? "h-0" : "h-full"} transition-all duration-200  rounded-lg overflow-hidden  inset-0 bg-white`}>
        {reservation.status !== "cancelled" && (
          <div
            className="justify-center  w-full flex items-center h-full bg-[#da552d] text-white hover:brightness-75"
            onClick={() => {
              ManageReservation("cancelar");
            }}
          >
            Cancelar
          </div>
        )}
        {reservation.status !== "confirmed" && role !== "client" ? (
          <div
            className="justify-center w-full flex items-center h-full bg-[#268a19] text-white hover:brightness-75"
            onClick={() => {
              ManageReservation("confirmar");
            }}
          >
            Confirmar
          </div>
        ) : (
          <>
            {reservation.status == "cancelled" && (
              <div className="justify-center w-full flex items-center h-full bg-[#474747] text-white hover:brightness-75">Has otra reserva</div>
            )}
          </>
        )}
      </div>

      <div className="flex flex-col items-center">
        <div
          className={` ${
            reservation.status === "confirmed" ? "bg-[#28d428]" : reservation.status === "canceled" ? "bg-[#fe3d00]" : "bg-[#535353]"
          } rounded-full size-[40px]`}
        >
          <Utensils className="  size-full p-2   text-white" />
        </div>
        <span className="text-[#ff851c]">{reservation.hour} </span>{" "}
      </div>
      <div className="flex flex-col ml-5 w-[70%] space-y-1">
        <div className=" sm:text-lg">{capitalizedDate}</div>
        <div className="text-sm flex flex-wrap items-center space-y-1  ">
          <div className=" flex items-center opacity-55">
            <UsersRound className=" mx-2 h-4 w-4 text-gray-400 flex items-center" />
            <h2>{reservation.people} Persona/s </h2>
          </div>
          <div className="w-[80%] overflow-hidden">
            {role !== "client" ? (
              <>
                <div className="flex items-center">
                  <SquareUser className=" mx-2 h-3 w-3 text-gray-400 flex items-center" />
                  <h2 className="text-xs overflow-hidden h-4 w-full"> {reservation.customerName}</h2>
                </div>
                <div className="flex items-center">
                  <PhoneCall className=" mx-2 h-3 w-3 text-gray-400 flex items-center" />
                  <h2 className="text-xs overflow-hidden h-4 w-full text-blue-500"> {reservation.customerPhone}</h2>
                </div>
                <div className="flex items-center">
                  <Mail className=" mx-2 h-3 w-3 text-gray-400 flex items-center" />
                  <h2 className="text-xs overflow-x-auto scroll h-4 w-full text-blue-500"> {reservation.customerEmail}</h2>
                </div>
              </>
            ) : (
              <div
                className={`${reservation.status == "confirmed" ? "text-[#28d428]" : reservation.status == "canceled" ? "text-[#fa3232]" : "text-gray-500"}`}
              >
                Estado: {reservation.status}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationsBox;
