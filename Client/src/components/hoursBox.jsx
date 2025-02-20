import { CircleXIcon } from "lucide-react";

function HoursBox({hour, index, handleDelete}) {
  return (
    <div className=" py-2 bg-slate-300  rounded-lg transition-all hover:brightness-90 w-full flex my-1 justify-evenly ">
        <h1 className=" py-1 px-10 bg-black bg-opacity-15 rounded-lg">{hour}</h1>
      <button onClick={() => handleDelete(index)} className="transition-transform hover:scale-[1.05] bg-black bg-opacity-15 rounded-full">
        <CircleXIcon className="mx-1 w-6 text-red-600 h-6 cursor-pointer" />
      </button>
    </div>
  );
}

export default HoursBox;