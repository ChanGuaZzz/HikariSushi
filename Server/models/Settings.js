import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Importar la configuración de Sequelize

class Settings extends Model {}

Settings.init(
  {
    typeOfTables: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return JSON.parse(this.getDataValue("typeOfTables"));
      },
      set(val) {
        this.setDataValue("typeOfTables", JSON.stringify(val));
      },
    },
    allHours: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("allHours").split(";");
      },
      set(val) {
        this.setDataValue("allHours", val.join(";"));
      },
    },
    // Add new blockConfig field
    blockConfig: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: JSON.stringify({
        enabled: false,
        startDate: "",
        endDate: "",
        reason: "",
      }),
      get() {
        const rawValue = this.getDataValue("blockConfig");
        return rawValue
          ? JSON.parse(rawValue)
          : {
              enabled: false,
              startDate: "",
              endDate: "",
              reason: "",
            };
      },
      set(val) {
        this.setDataValue("blockConfig", JSON.stringify(val));
      },
    },
    // Add new availableHours field
        unavailableDates: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "", 
      get() {
        const rawValue = this.getDataValue("unavailableDates");
        return rawValue ? rawValue.split(";") : [];
      },
      set(val) {
        // Format dates to YYYY-MM-DD if they're date strings
        if (Array.isArray(val)) {
          const formattedDates = val.map(date => {
            // Check if it's a valid date string
            if (date && !isNaN(new Date(date).getTime())) {
              const d = new Date(date);
              // Format to YYYY-MM-DD
              return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            }
            return date; // Return as is if not a valid date
          });
          this.setDataValue("unavailableDates", formattedDates.join(";"));
        } else {
          this.setDataValue("unavailableDates", "");
        }
      },
    },
  },
  {
    sequelize, // Instancia de Sequelize
    modelName: "Settings", // Nombre de la tabla
  }
);

export default Settings;
