import React, { useEffect } from "react";
import { PlusCircle } from "lucide-react";
import TimeConfigSection from "../components/TimeConfigSection.jsx";
import TableConfigSection from "../components/TableConfigSection.jsx";
import BlockConfigSection from "../components/BlockConfigSection.jsx";
import useSettingsManager from "../hooks/useSettingsManager.jsx";
import { use } from "react";

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
    addNewTable,
    blockConfig,
    setBlockConfig
  } = useSettingsManager(settings, setSettings, setLoading);


  useEffect(() => {
    if (settings)
    setBlockConfig(settings.blockConfig);
  }
  , [settings]);
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

      <div className="w-full mt-8 border-t pt-8">
        <BlockConfigSection
          blockConfig={blockConfig}
          setBlockConfig={setBlockConfig}
          saveChanges={saveChanges}
        />
      </div>
    </div>
  );
}

export default AdminConfig;