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
        reason: ""
      }),
      get() {
        const rawValue = this.getDataValue("blockConfig");
        return rawValue ? JSON.parse(rawValue) : {
          enabled: false,
          startDate: "",
          endDate: "",
          reason: ""
        };
      },
      set(val) {
        this.setDataValue("blockConfig", JSON.stringify(val));
      },
    },
  },
  {
    sequelize, // Instancia de Sequelize
    modelName: "Settings", // Nombre de la tabla
  }
);

export default Settings;