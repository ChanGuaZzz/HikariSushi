import React from "react";
import { PlusCircle } from "lucide-react";
import TimeConfigSection from "../components/TimeConfigSection.jsx";
import TableConfigSection from "../components/TableConfigSection.jsx";
import useSettingsManager from "../hooks/useSettingsManager.jsx";

function AdminConfig({ settings, setSettings, setLoading }) {
  const {
    animationSaveHour,
    animationSaveTable,
    isAddingHour,
    isAddingTable,
    newHour,
    qtyNewTable,
    capacityNewTable,
    setIsAddingHour,
    setIsAddingTable,
    setNewHour,
    setQtyNewTable,
    setCapacityNewTable,
    handleDeleteHour,
    handleDeleteTable,
    handleEditTable,
    saveChanges,
    resetData,
    addhour,
    addNewTable
  } = useSettingsManager(settings, setSettings, setLoading);

  return (
    <div className="bg-[white] flex justify-evenly flex-wrap shadow-xl p-10 w-full max-w-[1000px] rounded-lg text-black">
      <TimeConfigSection 
        settings={settings}
        isAddingHour={isAddingHour}
        setIsAddingHour={setIsAddingHour}
        newHour={newHour}
        setNewHour={setNewHour}
        animationSaveHour={animationSaveHour}
        handleDeleteHour={handleDeleteHour}
        saveChanges={saveChanges}
        resetData={resetData}
        addhour={addhour}
      />
      
      <TableConfigSection 
        settings={settings}
        isAddingTable={isAddingTable}
        setIsAddingTable={setIsAddingTable}
        qtyNewTable={qtyNewTable}
        setQtyNewTable={setQtyNewTable}
        capacityNewTable={capacityNewTable}
        setCapacityNewTable={setCapacityNewTable}
        animationSaveTable={animationSaveTable}
        handleDeleteTable={handleDeleteTable}
        saveChanges={saveChanges}
        handleEditTable={handleEditTable}
        resetData={resetData}
        addNewTable={addNewTable}
      />
    </div>
  );
}

export default AdminConfig;