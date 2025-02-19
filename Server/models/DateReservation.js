import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Importar la configuración de Sequelize
import bcrypt from 'bcrypt';

class DateReservation extends Model {
  // Método para confirmar una reserva
  
}

DateReservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hour: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    availableTables: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 20,
    },
  },
  {
    sequelize, // Instancia de Sequelize
    modelName: 'DateReservation',
  }
);

export default DateReservation;
