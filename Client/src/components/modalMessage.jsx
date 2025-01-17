import { useState, useEffect } from "react";
import {XIcon, BadgeCheck, BadgeX } from "lucide-react"

function ModalMessage({ message, onClose, iscorrect }) {
  return (
    <div className="fixed flex justify-center items-center bg-[#0c0c0c5b] w-full h-full  backdrop-blur-sm z-[100]">
      <div className="bg-white flex flex-col text-black p-6 rounded-lg relative">
        <span className="absolute top-4 right-4 " onClick={onClose}>
          <XIcon className="w-6 h-6 cursor-pointer" />
        </span>

        <div className="flex flex-col justify-center items-center p-8">
            {iscorrect ? (
              <BadgeCheck className="text-green-500" size={50} />
            ) : (
              <BadgeX className="text-red-600" size={50} />
            )}
          <p className="mt-5">{message}</p>
        </div>
      </div>
    </div>
  );
}

export default ModalMessage;
