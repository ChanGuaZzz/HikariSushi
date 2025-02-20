import React from "react";
import { PencilIcon, CircleXIcon } from "lucide-react";

function TablesBox({ qty, capacity, index, handleDelete, handleEdit }) {
  return (
    <div className="py-2 bg-slate-300 hover:brightness-90 transition-all  rounded-lg w-full flex my-1 p-3 justify-around">
      <div className="py-1 mx-1  items-center flex flex-col ">
        <h1 className="bg-black  bg-opacity-15 text-center rounded-lg w-full">{qty}</h1>
        <h1 className="text-xs">Mesas</h1>
      </div>
      <div className="py-1 mx-1  items-center flex flex-col ">
        <h1 className="bg-black  bg-opacity-15 text-center rounded-lg w-full">{capacity}</h1>
        <h1 className="text-xs">Capacity</h1>
      </div>
      <button onClick={() => handleEdit(index)} className=" transition-transform hover:scale-[1.05] flex justify-center items-center bg-black bg-opacity-15 rounded-full">
        <PencilIcon className="mx-1 w-[60%] text-blue-600 h-6 cursor-pointer" />
      </button>
      <button onClick={() => handleDelete(index)} className="transition-transform hover:scale-[1.05] flex justify-center items-center mx-1 bg-black bg-opacity-15 rounded-full">
        <CircleXIcon className="mx-1 w-[60%] text-red-600 h-6 cursor-pointer" />
      </button>
    </div>
  );
}

export default TablesBox;
