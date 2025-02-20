import Settings from "../models/Settings";

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

const setSettings = async (req, res) => {
    // PARAMS: change, allHours, typeOfTables
  try {
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

      console.log(allHours);

      settings.allHours = allHours;
      await settings.save();
      return res.status(200).json(settings);
    }
    if (change == "typeOfTables") {
      const { typeOfTables } = req.body;
      if (!typeOfTables) {
        return res.status(400).json({ message: "No se ha enviado ninguna mesa" });
      }

      console.log(typeOfTables);
      settings.typeOfTables = typeOfTables;
      await settings.save();
      return res.status(200).json(settings);
    }
  } catch (error) {
    console.error("Error al actualizar la configuración:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export { getSettings, setSettings };
