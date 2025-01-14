import { useState, useEffect } from "react";
import { Utensils, UsersRound } from "lucide-react";

function ReservationsBox({ reservation }) {
  const formattedDate = new Date(reservation.date).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizedDate = capitalizeFirstLetter(formattedDate);

  return (
    <div
      className={`flex border items-center bg-[#ebecec] shadow-lg w-full my-5 p-3 rounded-lg ${reservation.status == "confirmed" ? "opacity-100 " : "opacity-50"}`}
    >
      <div className="flex flex-col items-center">
        <div className={` ${reservation.status === "confirmed" ? "bg-[#28d428]" : reservation.status === "canceled" ? "bg-[#fe3d00]" : "bg-[#535353]"} rounded-full size-[40px]`}>
          <Utensils className="  size-full p-2   text-white" />
        </div>
        <span className="text-[#ff851c]">{reservation.hour} </span>{" "}
      </div>
      <div className="flex flex-col ml-5 w-[70%] space-y-1">
        <div className=" sm:text-lg">{capitalizedDate}</div>
        <div className="text-sm flex flex-wrap items-center space-x-3 space-y-1  ">
          <div className=" flex items-center opacity-55">
            <UsersRound className=" mx-2 h-4 w-4 text-gray-400 flex items-center" />
            <h2>{reservation.people} Persona/s </h2>
          </div>
          <div>
            <div className={`${reservation.status == "confirmed" ? "text-[#28d428]" : reservation.status == "canceled" ? "text-[#fa3232]" : "text-gray-500"}`}>
              Estado: {reservation.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationsBox;
