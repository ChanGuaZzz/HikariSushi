import React from "react";
import { PlusCircle, SaveIcon, RotateCcw } from "lucide-react";
import HoursBox from "./hoursBox";

function TimeConfigSection({ 
  settings, 
  isAddingHour, 
  setIsAddingHour, 
  newHour, 
  setNewHour,
  animationSaveHour, 
  handleDeleteHour, 
  saveChanges, 
  resetData,
  addhour 
}) {
  return (
    <div className="w-[30%] min-w-[200px]">
      <h1>Horas por dia</h1>
      <div className="p-1 flex w-full mt-3 flex-col max-h-[300px] overflow-y-auto">
        {settings.allHours && settings.allHours.length <= 0 && (
          <h1 className="text-xs opacity-35 text-center">No hay horas disponibles</h1>
        )}
        {settings.allHours.map((hour, index) => (
          <HoursBox
            key={index}
            hour={hour}
            index={index}
            handleDelete={() => handleDeleteHour(index)}
          />
        ))}
      </div>
      
      {isAddingHour && (
        <HoursBox 
          isaddingHour={isAddingHour} 
          newHour={newHour} 
          setNewHour={setNewHour} 
          setIsAddingHour={setIsAddingHour} 
        />
      )}
      
      <div className="flex justify-center space-x-2 items-center mt-3">
        <AddButton onClick={() => setIsAddingHour(true)} />
        
        {!isAddingHour ? (
          <SaveButton 
            animation={animationSaveHour}
            disabled={animationSaveHour === "bg-black"}
            onClick={() => saveChanges("allHours")}
          />
        ) : (
          <SaveButton 
            animation={animationSaveHour}
            onClick={addhour}
          />
        )}
        
        <ResetButton onClick={() => resetData("allHours")} />
      </div>
    </div>
  );
}

// Button components for reusability
const AddButton = ({ onClick }) => (
  <button
    className="bg-black w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full"
    onClick={onClick}
  >
    <PlusCircle className="mx-1 w-6 text-blue-600 h-6 cursor-pointer" />
  </button>
);

const SaveButton = ({ animation, disabled = false, onClick }) => (
  <button
    className={`bg-black ${animation} w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full`}
    disabled={disabled}
    onClick={onClick}
  >
    <SaveIcon className="mx-1 w-6 text-green-600 h-6 cursor-pointer" />
  </button>
);

const ResetButton = ({ onClick }) => (
  <button
    className="bg-black w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full"
    onClick={onClick}
  >
    <RotateCcw className="mx-1 w-6 text-red-600 h-6 cursor-pointer" />
  </button>
);

export default TimeConfigSection;