import React, { useEffect, useState } from "react";
import HoursBox from "../components/hoursBox";
import TablesBox from "../components/tablesBox";
import { CircleXIcon, PlusCircle, RotateCcw, SaveIcon } from "lucide-react";
import axios from "axios";

function AdminConfig({ settings, setSettings, setLoading }) {
  const [animationSaveHour, setanimationSaveHour] = useState("bg-black");
  const [isAddingHour, setIsAddingHour] = useState(false);
  const [newHour, setNewHour] = useState("");
  const [animationSaveTable, setanimationSaveTable] = useState("bg-black");

  const handleDeleteHours = (index) => {
    const newHours = settings.allHours.filter((hour, i) => i !== index);
    setSettings({ ...settings, allHours: newHours });
    setanimationSaveHour(" bg-green-500 animate-bounce border border-green-500");
  };

  const saveChanges = async (change) => {
    setLoading(true);
    setIsAddingHour(false);
    axios
      .post(`${import.meta.env.VITE_API_URL}/setSettings`, { change, allHours: settings.allHours, typeOfTables: settings.typeOfTables })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    setanimationSaveHour("bg-black");
  };

  const getallHours = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/getSettings`, { withCredentials: true })
      .then((res) => {
        setSettings({
          ...settings,
          allHours: res.data.allHours,
        });
        console.log(res.data, "settings");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetHours = async () => {
    setLoading(true);
    setIsAddingHour(false);

    getallHours();

    setanimationSaveHour("bg-black");
  };

  useEffect(() => {
    setNewHour("");
  }, [isAddingHour]);

  const addhour = async() => {
    if (newHour !== "") {
      setSettings({ ...settings, allHours: [...settings.allHours, newHour] });    
      setNewHour("");
    }else{
      setIsAddingHour(false);
    }
  };

  useEffect (() => {
    if(isAddingHour){
    saveChanges("allHours");
    console.log("guardando")
    }
  }, [settings.allHours])

  return (
    <div className="bg-[white] flex justify-evenly flex-wrap  shadow-xl p-10  w-full max-w-[1000px] rounded-lg text-black">
      <div className="w-[30%] min-w-[200px]">
        <h1>Horas</h1>
        <div className="flex w-full mt-3 flex-col max-h-[300px] overflow-y-auto">
          {settings.allHours.map((hour, index) => (
            <HoursBox
              key={index}
              hour={hour}
              index={index}
              handleDelete={() => {
                handleDeleteHours(index);
              }}
            />
          ))}
        </div>
        {isAddingHour && (
          <div className=" py-2 bg-green-100 rounded-lg transition-all hover:brightness-90 w-full flex my-1 justify-evenly ">
            <input
              type="text"
              value={newHour}
              onChange={(e) => {
                setNewHour(e.target.value);
              }}
              placeholder="hh:mm"
              className=" py-1 w-[120px] text-center bg-black bg-opacity-15 rounded-lg"
            />
            <button onClick={() => setIsAddingHour(false)} className="transition-transform hover:scale-[1.05] bg-black bg-opacity-15 rounded-full">
              <CircleXIcon className="mx-1 w-6 text-red-600 h-6 cursor-pointer" />
            </button>
          </div>
        )}
        <div className="flex justify-center space-x-2 items-center mt-3">
          <button
            className="bg-black w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full"
            onClick={() => {
              setIsAddingHour(true);
            }}
          >
            <PlusCircle className="mx-1 w-6 text-blue-600 h-6 cursor-pointer" />
          </button>
          {!isAddingHour ? (
            <button
              className={`bg-black ${animationSaveHour} w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full`}
              onClick={() => {
                saveChanges("allHours");
              }}
            >
              <SaveIcon className="mx-1 w-6 text-green-600 h-6 cursor-pointer" />
            </button>
          ) : (
            <button
              className={`bg-black ${animationSaveHour} w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full`}
              onClick={() => {
                addhour();
              }}
            >
              <SaveIcon className="mx-1 w-6 text-green-600 h-6 cursor-pointer" />
            </button>
          )}
          <button
            className={`bg-black w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full`}
            onClick={() => {
              resetHours();
            }}
          >
            <RotateCcw className="mx-1 w-6 text-red-600 h-6 cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="w-[30%] min-w-[200px]">
        <h1>Mesas</h1>
        <div className="flex w-full mt-3 flex-col max-h-[300px] overflow-y-auto">
          {settings.typeOfTables.map((table, index) => (
            <TablesBox key={index} qty={table.qty} capacity={table.capacity} index={index} handleDelete={() => {}} handleEdit={() => {}} />
          ))}
        </div>
        <div className="flex justify-center space-x-2 items-center mt-3">
          <button
            className="bg-black w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full"
            onClick={() => {}}
          >
            <PlusCircle className="mx-1 w-6 text-blue-600 h-6 cursor-pointer" />
          </button>
          <button
            className={`bg-black ${animationSaveTable} w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full`}
            onClick={() => {
              saveChanges("typeOfTables");
            }}
          >
            <SaveIcon className="mx-1 w-6 text-green-600 h-6 cursor-pointer" />
          </button>
          <button
            className={`bg-black w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full`}
            onClick={() => {
              resetTables();
            }}
          >
            <RotateCcw className="mx-1 w-6 text-red-600 h-6 cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminConfig;
