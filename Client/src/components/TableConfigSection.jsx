import React from "react";
import { PlusCircle, SaveIcon, RotateCcw } from "lucide-react";
import TablesBox from "./tablesBox";

function TableConfigSection({ 
  settings, 
  isAddingTable, 
  setIsAddingTable, 
  qtyNewTable, 
  setQtyNewTable,
  capacityNewTable, 
  setCapacityNewTable,
  animationSaveTable, 
  handleDeleteTable, 
  saveChanges, 
  resetData,
  addNewTable,
  handleEditTable
}) {
  return (
    <div className="w-[30%] min-w-[200px]">
      <h1>Mesas por hora </h1>
      <span className="text-xs opacity-30">(Los cambios seran reflejados en un maximo de 7 dias)</span>
      <div className="p-1 flex w-full mt-3 flex-col max-h-[300px] overflow-y-auto">
        {settings.typeOfTables && settings.typeOfTables.length <= 0 && (
          <h1 className="text-xs opacity-35 text-center">No hay Mesas disponibles</h1>
        )}
        {settings.typeOfTables.map((table, index) => (
          <TablesBox
            key={index}
            qty={table.qty}
            capacity={table.capacity}
            index={index}
            handleEditTable={handleEditTable}
            handleDelete={() => handleDeleteTable(index)}
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
          onClick={() => setIsAddingTable(true)}
        >
          <PlusCircle className="mx-1 w-6 text-blue-600 h-6 cursor-pointer" />
        </button>
        
        {!isAddingTable ? (
          <button
            className={`bg-black ${animationSaveTable} w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full`}
            onClick={() => saveChanges("typeOfTables")}
          >
            <SaveIcon className="mx-1 w-6 text-green-600 h-6 cursor-pointer" />
          </button>
        ) : (
          <button
            className={`bg-black ${animationSaveTable} w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full`}
            onClick={addNewTable}
          >
            <SaveIcon className="mx-1 w-6 text-green-600 h-6 cursor-pointer" />
          </button>
        )}
        
        <button
          className="bg-black w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full"
          onClick={() => resetData("typeOfTables")}
        >
          <RotateCcw className="mx-1 w-6 text-red-600 h-6 cursor-pointer" />
        </button>
      </div>
    </div>
  );
}

export default TableConfigSection;