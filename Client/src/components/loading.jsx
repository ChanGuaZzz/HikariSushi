import React from "react";

function Loading() {
  return (
    <div className="fixed z-[1000] backdrop-blur-sm flex justify-center items-center bg-black size-full opacity-75">
      <style>
        {`
          .loadinganimation div {
            animation: loading 1s infinite;
          }
          
          .loadinganimation div:nth-child(1) {
            animation-delay: 0s;
          }
          
          .loadinganimation div:nth-child(2) {
            animation-delay: 0.2s;
          }
          
          .loadinganimation div:nth-child(3) {
            animation-delay: 0.4s;
          }

          @keyframes loading {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.5);
            }
          }

          .loadingsimbol {
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            100% {
              transform: rotate(360deg);
            }
          }

        `}
      </style>
      <div className="flex flex-col items-center justify-center h-[20%] w-full">
        <h1 className="simbol loadingsimbol text-8xl text-[#ff3e01] ">i</h1>
        <div className="loadinganimation size-full flex justify-center items-center text-white">
          <div className="size-2 mx-1 bg-white rounded-full transition-all"></div>
          <div className="size-2 mx-1 bg-white rounded-full transition-all"></div>
          <div className="size-2 mx-1 bg-white rounded-full transition-all"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;