import { useEffect, useState } from "react";
import { XIcon } from "lucide-react";

function GeneralModal({ children, onClose }) {
  return (
    <div className="fixed flex justify-center items-center bg-[#0c0c0c5b] w-full h-full  backdrop-blur-sm z-[100]">
      <div className="bg-white flex flex-col text-black p-6 rounded-lg relative">
        <span className="absolute top-4 right-4 " onClick={onClose}>
          <XIcon className="w-6 h-6 cursor-pointer" />
        </span>
        <div className="m-8">{children}</div>
      </div>
    </div>
  );
}

export default GeneralModal;
