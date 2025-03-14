import { useState, useEffect } from "react";
import axios from "axios";

function useSettingsManager(settings, setSettings, setLoading) {
  const [animationSaveHour, setanimationSaveHour] = useState("bg-black");
  const [isAddingHour, setIsAddingHour] = useState(false);
  const [isAddingTable, setIsAddingTable] = useState(false);
  const [newHour, setNewHour] = useState("");
  const [qtyNewTable, setQtyNewTable] = useState(0);
  const [capacityNewTable, setCapacityNewTable] = useState(0);
  const [animationSaveTable, setanimationSaveTable] = useState("bg-black");

  // Handle state reset when adding mode changes
  useEffect(() => {
    setNewHour("");
  }, [isAddingHour]);

  useEffect(() => {
    setQtyNewTable("");
    setCapacityNewTable("");
  }, [isAddingTable]);

  // Animation effects
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

  // Auto-save when adding new items
  useEffect(() => {
    if (isAddingHour) {
      saveChanges("allHours");
    }
  }, [settings.allHours]);

  useEffect(() => {
    if (isAddingTable) {
      saveChanges("typeOfTables");
    }
  }, [settings.typeOfTables]);

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

  const handleEditTable = (tableindex, qty, capacity) => {
    const newTables = settings.typeOfTables.map((table, i) => {
      if (i === tableindex) {
        return { qty: qty, capacity: capacity };
      }
      return table;
    });
    setSettings({ ...settings, typeOfTables: newTables });
    setanimationSaveTable(" bg-green-500 animate-bounce border border-green-500");
  };

  const saveChanges = async (change) => {
    setLoading(true);
    setIsAddingHour(false);
    setIsAddingTable(false);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/setSettings`, {
        change,
        allHours: settings.allHours,
        typeOfTables: settings.typeOfTables,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setanimationSaveHour("bg-black");
      setanimationSaveTable("bg-black");
    }
  };

  const getSettings = async (setting) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/getSettings`, { withCredentials: true });

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
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
      setSettings({
        ...settings,
        typeOfTables: [...settings.typeOfTables, { qty: qtyNewTable, capacity: capacityNewTable }],
      });
      setQtyNewTable("");
      setCapacityNewTable("");
    } else {
      setIsAddingTable(false);
    }
  };

  return {
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
    saveChanges,
    resetData,
    addhour,
    addNewTable,
    handleEditTable,
  };
}

export default useSettingsManager;
