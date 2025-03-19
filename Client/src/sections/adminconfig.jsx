import React, { useEffect } from "react";
import { PlusCircle } from "lucide-react";
import TimeConfigSection from "../components/TimeConfigSection.jsx";
import TableConfigSection from "../components/TableConfigSection.jsx";
import BlockConfigSection from "../components/BlockConfigSection.jsx";
import BlockedDatesSection from "../components/BlockedDatesSection.jsx";
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
    addNewTable,
    blockConfig,
    setBlockConfig,
  } = useSettingsManager(settings, setSettings, setLoading);


  useEffect(() => {
    if (settings) {
      setBlockConfig(settings.blockConfig);
      // Inicializar blockedDates si existe en settings
      if (settings.blockedDates) {
        setBlockedDates(settings.blockedDates.map(date => new Date(date)));
      }
    }
  }, [settings]);
  
  return (
    <div className="bg-[white] flex justify-evenly flex-wrap shadow-xl p-10 w-full max-w-[1000px] rounded-lg text-black">
     <div className="flex justify-evenly flex-wrap w-full">
      <div className="w-full text-2xl font-semibold mb-4 flex items-center justify-center pb-6">
        Configuracion de Reservas
      </div>
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
      /></div> 

      <div className="w-full mt-8 border-t pt-8">
        <BlockConfigSection
          blockConfig={blockConfig}
          setBlockConfig={setBlockConfig}
          saveChanges={saveChanges}
        />
      </div>

      <div className="w-full mt-8 border-t pt-8">
        <BlockedDatesSection 
          saveChanges={saveChanges}
          setSettings={setSettings}
          settings={settings}
        />
      </div>
    </div>
  );
}

export default AdminConfig;