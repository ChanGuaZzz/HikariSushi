import { useState, useEffect } from "react";
import {XIcon} from "lucide-react"

function ModalMessage({ message, onClose }) {
  return (
    <div className="fixed flex justify-center items-center bg-[#0c0c0c5b] w-full h-full  backdrop-blur-sm z-[100]">
      <div className="bg-white flex flex-col text-black p-6 rounded-lg relative">
        <span className="absolute top-4 right-4 " onClick={onClose}>
          <XIcon className="w-6 h-6 cursor-pointer" />
        </span>

        <div className="p-8">
          <p className="">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default ModalMessage;
