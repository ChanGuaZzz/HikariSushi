import React, { useState } from "react";
import { PencilIcon, CircleXIcon, SaveIcon } from "lucide-react";

function TablesBox({
  qty,
  capacity,
  index,
  handleDelete,
  isAddingTable,
  setIsAddingTable,
  qtyNewTable,
  setQtyNewTable,
  capacityNewTable,
  setCapacityNewTable,
  handleEditTable
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editQty, setEditQty] = useState(qty);
  const [editCapacity, setEditCapacity] = useState(capacity);
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditQty(qty);
    setEditCapacity(capacity);
   
  };

  const handleSaveEdit = () => {
    // Handle edit logic here - this would require passing a function from parent
    setIsEditing(false);
    handleEditTable(index, editQty, editCapacity);
  };

  const handleCancel = () => {
    if (setIsAddingTable) {
      setIsAddingTable(false);
    } else {
      setIsEditing(false);
    }
  };

  // For new table entry
  const TableEntryForm = ({useValues, useSetters}) => (
    <div className="py-2 bg-slate-300 hover:brightness-90 transition-all rounded-lg w-full flex my-1 p-3 justify-around">
      <div className="py-1 mx-1 items-center flex flex-col">
        <input
          placeholder="#"
          type="number"
          value={useValues.qty}
          onChange={(e) => useSetters.setQty(e.target.value)}
          className="bg-black bg-opacity-15 text-center rounded-lg w-[35px]"
        />
        <h1 className="text-xs">Mesas</h1>
      </div>
      <div className="py-1 mx-1 items-center flex flex-col">
        <input
          placeholder="#"
          type="number"
          value={useValues.capacity}
          onChange={(e) => useSetters.setCapacity(e.target.value)}
          className="bg-black bg-opacity-15 text-center rounded-lg w-[35px]"
        />
        <h1 className="text-xs">Capacity</h1>
      </div>

      {isEditing ? (
        <>
          <button
            onClick={handleSaveEdit}
            className="transition-transform hover:scale-[1.05] flex justify-center items-center mx-1 bg-black bg-opacity-15 rounded-full"
          >
            <SaveIcon className="mx-1 w-[60%] text-green-600 h-6 cursor-pointer" />
          </button>
          <button
            onClick={handleCancel}
            className="transition-transform hover:scale-[1.05] flex justify-center items-center mx-1 bg-black bg-opacity-15 rounded-full"
          >
            <CircleXIcon className="mx-1 w-[60%] text-red-600 h-6 cursor-pointer" />
          </button>
        </>
      ) : (
        <button
          onClick={handleCancel}
          className="transition-transform hover:scale-[1.05] flex justify-center items-center mx-1 bg-black bg-opacity-15 rounded-full"
        >
          <CircleXIcon className="mx-1 w-[60%] text-red-600 h-6 cursor-pointer" />
        </button>
      )}
    </div>
  );

  // For existing table display
  const TableDisplay = () => (
    <div className="py-2 bg-slate-300 hover:brightness-90 transition-all rounded-lg w-full flex my-1 p-3 justify-around">
      <div className="py-1 mx-1 items-center flex flex-col">
        <h1 className="bg-black bg-opacity-15 text-center rounded-lg w-full">{qty}</h1>
        <h1 className="text-xs">Mesas</h1>
      </div>
      <div className="py-1 mx-1 items-center flex flex-col">
        <h1 className="bg-black bg-opacity-15 text-center rounded-lg w-full">{capacity}</h1>
        <h1 className="text-xs">Capacity</h1>
      </div>
      <button
        onClick={handleEdit}
        className="transition-transform hover:scale-[1.05] flex justify-center items-center bg-black bg-opacity-15 rounded-full"
      >
        <PencilIcon className="mx-1 w-[60%] text-blue-600 h-6 cursor-pointer" />
      </button>
      <button
        onClick={() => handleDelete(index)}
        className="transition-transform hover:scale-[1.05] flex justify-center items-center mx-1 bg-black bg-opacity-15 rounded-full"
      >
        <CircleXIcon className="mx-1 w-[60%] text-red-600 h-6 cursor-pointer" />
      </button>
    </div>
  );

  // Decide which component to render
  if (isAddingTable) {
    return (
      <TableEntryForm 
        useValues={{qty: qtyNewTable, capacity: capacityNewTable}}
        useSetters={{setQty: setQtyNewTable, setCapacity: setCapacityNewTable}}
      />
    );
  } else if (isEditing) {
    return (
      <TableEntryForm 
        useValues={{qty: editQty, capacity: editCapacity}}
        useSetters={{setQty: setEditQty, setCapacity: setEditCapacity}}
      />
    );
  } else {
    return <TableDisplay />;
  }
}

export default TablesBox;