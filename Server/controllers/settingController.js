import { se } from "date-fns/locale";
import Settings from "../models/Settings.js";

const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }
    return res.status(200).json(settings);
  } catch (error) {
    console.error("Error al obtener la configuración:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// New function to get only block config settings
const getSettingsForClient = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (!settings) {
      return res.status(404).json({ message: "Settings not found" });
    }
    
    return res.status(200).json({ 
      blockConfig: settings.blockConfig,
      unavailableDates: settings.unavailableDates  
    });
  } catch (error) {
    console.error("Error al obtener la configuración de bloqueo:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

const setSettings = async (req, res) => {
  // PARAMS: change, allHours, typeOfTables, blockConfig
try {
  console.log("ENVIA A SETSETTINGS",req.body);
  const { change } = req.body;
  if (!change) {
    return res.status(400).json({ message: "No se ha enviado ningún cambio" });
  }
  const settings = await Settings.findOne();
  if (!settings) {
    return res.status(404).json({ message: "Settings not found" });
  }
  if (change == "allHours") {
    const { allHours } = req.body;
    if (!allHours) {
      return res.status(400).json({ message: "No se ha enviado ninguna hora" });
    }

    console.log(allHours, "asi entran las horas");

    //ordenar las horas de menor a mayor
    allHours.sort((a, b) => {
      const [hourA, minuteA] = a.split(":").map(Number);
      const [hourB, minuteB] = b.split(":").map(Number);
  
      if (hourA !== hourB) return hourA - hourB;
      return minuteA - minuteB;
  });
  

    console.log(allHours, "asi quedan las horas");

    settings.allHours = allHours;
    await settings.save();
    return res.status(200).json(settings);
  }
  if (change == "typeOfTables") {
    const { typeOfTables } = req.body;
    if (!typeOfTables) {
      return res.status(400).json({ message: "No se ha enviado ninguna mesa" });
    }

    typeOfTables.sort((a, b) => {
      return a.capacity - b.capacity;
    });
    console.log(typeOfTables);
    settings.typeOfTables = typeOfTables;
    await settings.save();
    return res.status(200).json(settings);
  }
  // Add handling for blockConfig
  if (change == "blockConfig") {
    const { blockConfig } = req.body;
    if (!blockConfig) {
      return res.status(400).json({ message: "No se ha enviado configuración de bloqueo" });
    }
    
    console.log("Actualizando configuración de bloqueo:", blockConfig);
    settings.blockConfig = blockConfig;
    await settings.save();
    return res.status(200).json(settings);
  }

  if (change == "unavailableDates") {
    const { unavailableDates } = req.body;
    if (!unavailableDates) {
      return res.status(400).json({ message: "No se ha enviado ninguna hora" });
    }
    
    console.log("Actualizando fechas bloqueadas:", unavailableDates);
    settings.unavailableDates = unavailableDates;
    await settings.save();
    return res.status(200).json(settings);
  }
} catch (error) {
  console.error("Error al actualizar la configuración:", error);
  return res.status(500).json({ message: "Error interno del servidor" });
}
};

export { getSettings, setSettings, getSettingsForClient };