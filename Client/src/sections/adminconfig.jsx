
import React from 'react';
import HoursBox from '../components/hoursBox';
import TablesBox from '../components/tablesBox';
import { PlusCircle, SaveIcon } from 'lucide-react';

function AdminConfig({settings, setSettings}) {
    
  return (
    <div className="bg-[white] flex justify-evenly flex-wrap  shadow-xl p-10  w-full max-w-[1000px] rounded-lg text-black">
              <div className="w-[30%] min-w-[200px]">
                <h1>Horas</h1>
                <div className="flex w-full mt-3 flex-col max-h-[300px] overflow-y-auto">
                  {settings.allHours.map((hour, index) => (
                    <HoursBox key={index} hour={hour} index={index} handleDelete={() => {}} />
                  ))}
                </div>

                <div className="flex justify-center space-x-2 items-center mt-3">
                  <button
                    className="bg-black w-[60%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full"
                    onClick={() => {}}
                  >
                    <PlusCircle className="mx-1 w-6 text-blue-600 h-6 cursor-pointer" />
                  </button>
                  <button
                    className="bg-black w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full"
                    onClick={() => {}}
                  >
                    <SaveIcon className="mx-1 w-6 text-green-600 h-6 cursor-pointer" />
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
                    className="bg-black w-[60%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full"
                    onClick={() => {}}
                  >
                    <PlusCircle className="mx-1 w-6 text-blue-600 h-6 cursor-pointer" />
                  </button>
                  <button
                    className="bg-black w-[30%] hover:bg-opacity-20 hover:scale-[1.05] transition-all flex justify-center py-2 items-center bg-opacity-15 rounded-full"
                    onClick={() => {}}
                  >
                    <SaveIcon className="mx-1 w-6 text-green-600 h-6 cursor-pointer" />
                  </button>
                </div>
              </div>
            </div>
  );
}

export default AdminConfig;