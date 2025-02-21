import React, { useEffect, useState } from "react";
import HoursBox from "../components/hoursBox";
import TablesBox from "../components/tablesBox";
import { CircleXIcon, PlusCircle, RotateCcw, SaveIcon } from "lucide-react";
import axios from "axios";

function AdminConfig({ settings, setSettings, setLoading }) {
  const [animationSaveHour, setanimationSaveHour] = useState("bg-black");
  const [isAddingHour, setIsAddingHour] = useState(false);
  const [isAddingTable, setIsAddingTable] = useState(false);
  const [newHour, setNewHour] = useState("");
  const [qtyNewTable, setQtyNewTable] = useState(0);
  const [capacityNewTable, setCapacityNewTable] = useState(0);
  const [animationSaveTable, setanimationSaveTable] = useState("bg-black");

  const handleDeleteHour = (index) => {
    const newHours = settings.allHours.filter((hour, i) => i !== index);
    setSettings({ ...settings, allHours: newHours });
    setanimationSaveHour(" bg-green-500 animate-bounce border border-green-500");
  };
  const handleDeleteTable = (index) => {
    const newTables = settings.typeOfTables.filter((table, i) => i !== index);
    setSettings({ ...settings, typeOfTables: newTables });
    setanimationSaveTable(" bg-green-500 animate-bounce border border-green-500");
  };

  const saveChanges = async (change) => {
    setLoading(true);
    setIsAddingHour(false);
    setIsAddingTable(false);
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
    setanimationSaveTable("bg-black");
  };

  // const getallHours = () => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL}/getSettings`, { withCredentials: true })
  //     .then((res) => {
  //       setSettings({
  //         ...settings,
  //         allHours: res.data.allHours,
  //       });
  //       console.log(res.data, "settings");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const getSettings = (setting) => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/getSettings`, { withCredentials: true })
      .then((res) => {
        if (setting === "allHours") {
          setSettings({
            ...settings,
            allHours: res.data.allHours,
          });
        } else if (setting === "typeOfTables") {
          setSettings({
            ...settings,
            typeOfTables: res.data.typeOfTables,
          });
        } else {
          setSettings(res.data);
        }

        console.log(res.data, "settings");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetData = async (data) => {
    setLoading(true);
    if (data === "allHours") {
      setIsAddingHour(false);
      getSettings("allHours");
      setanimationSaveHour("bg-black");
    } else {
      setIsAddingTable(false);
      getSettings("typeOfTables");
      setanimationSaveTable("bg-black");
    }
  };

  useEffect(() => {
    setNewHour("");
  }, [isAddingHour]);

  useEffect(() => {
    setQtyNewTable("");
    setCapacityNewTable("");
  }, [isAddingTable]);

  const addhour = async () => {
    if (newHour !== "") {
      setSettings({ ...settings, allHours: [...settings.allHours, newHour] });
      setNewHour("");
    } else {
      setIsAddingHour(false);
    }
  };

  const addNewTable = async () => {
    if (qtyNewTable !== "" && capacityNewTable !== "") {
      setSettings({ ...settings, typeOfTables: [...settings.typeOfTables, { qty: qtyNewTable, capacity: capacityNewTable }] });
      setQtyNewTable("");
      setCapacityNewTable("");
    } else {
      setIsAddingTable(false);
    }
  };

  useEffect(() => {
    if (isAddingHour) {
      saveChanges("allHours");
      console.log("guardando");
    }
  }, [settings.allHours]);

  useEffect(() => {
    if (isAddingTable) {
      saveChanges("typeOfTables");
      console.log("guardando mesas");
    }
  }, [settings.typeOfTables]);

  useEffect(() => {
    if (newHour !== "") {
      setanimationSaveHour(" bg-green-500 animate-bounce border border-green-500");
    } else {
      setanimationSaveHour("bg-black");
    }
  }, [newHour]);

  useEffect(() => {
    if (qtyNewTable > 0 && capacityNewTable > 0) {
      setanimationSaveTable(" bg-green-500 animate-bounce border border-green-500");
    } else {
      setanimationSaveTable("bg-black");
    }
  }, [qtyNewTable, capacityNewTable]);

  return (
    <div className="bg-[white] flex justify-evenly flex-wrap  shadow-xl p-10  w-full max-w-[1000px] rounded-lg text-black">
      <div className="w-[30%] min-w-[200px]">
        <h1>Horas</h1>
        <div className="flex w-full mt-3 flex-col max-h-[300px] overflow-y-auto">
          {settings.allHours && settings.allHours.length <= 0 && (
            <>
              <h1 className="text-xs opacity-35 text-center">No hay horas disponibles</h1>
            </>
          )}
          {settings.allHours.map((hour, index) => (
            <HoursBox
              key={index}
              hour={hour}
              index={index}
              handleDelete={() => {
                handleDeleteHour(index);
              }}
            />
          ))}
        </div>
        {isAddingHour && <HoursBox isaddingHour={isAddingHour} newHour={newHour} setNewHour={setNewHour} setIsAddingHour={setIsAddingHour} />}
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
              disabled={animationSaveHour == "bg-black" ? true : false}
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
              resetData("allHours");
            }}
          >
            <RotateCcw className="mx-1 w-6 text-red-600 h-6 cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="w-[30%] min-w-[200px]">
        <h1>Mesas por hora</h1>
        <div className="flex w-full mt-3 flex-col max-h-[300px] overflow-y-auto">
          {settings.typeOfTables && settings.typeOfTables.length <= 0 && (
            <>
              <h1 className="text-xs opacity-35 text-center">No hay Mesas disponibles</h1>
            </>
          )}
          {settings.typeOfTables.map((table, index) => (
            <TablesBox
              key={index}
              qty={table.qty}
              capacity={table.capacity}
              index={index}
              handleDelete={() => {
                handleDeleteTable(index);
              }}
              handleEdit={() => {}}
            />
          ))}
        </div>
        {isAddingTable && (
          <TablesBox
            isAddingTable={isAddingTable}
            setIsAddingTable={setIsAddingTable}
            qtyNewTable={qtyNewTable}
            setQtyNewTable={setQtyNewTable}
            capacityNewTable={capacityNewTable}
            setCapacityNewTable={setCapacityNewTable}
          />
        )}
        <div className="flex justify-center space-x-2 items-center mt-3">
          <button
            className="bg-black w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full"
            onClick={() => {
              setIsAddingTable(true);
            }}
          >
            <PlusCircle className="mx-1 w-6 text-blue-600 h-6 cursor-pointer" />
          </button>
          {!isAddingTable ? (
            <button
              className={`bg-black ${animationSaveTable} w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full`}
              onClick={() => {
                saveChanges("typeOfTables");
              }}
            >
              <SaveIcon className="mx-1 w-6 text-green-600 h-6 cursor-pointer" />
            </button>
          ) : (
            <button
              className={`bg-black ${animationSaveTable} w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full`}
              onClick={() => {
                addNewTable();
              }}
            >
              <SaveIcon className="mx-1 w-6 text-green-600 h-6 cursor-pointer" />
            </button>
          )}
          <button
            className={`bg-black w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full`}
            onClick={() => {
              resetData("typeOfTables");
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
