import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Importar la configuración de Sequelize

class Reservation extends Model {
  // Método para confirmar una reserva
  confirmReservation() {
    this.status = 'confirmed';
  }

  // Método para cancelar una reserva
  cancelReservation() {
    this.status = 'cancelled';
  }

  // Método estático para verificar si hay una reserva en una mesa en una fecha y hora específicas
  static async isTableAvailable(tableNumber, reservationDate) {
    const conflictingReservation = await Reservation.findOne({
      where: {
        tableNumber,
        reservationDate,
        status: 'confirmed',
      },
    });
    return conflictingReservation === null;
  }

  toString() {
    return `Reservation for ${this.customerName} on ${this.reservationDate}`;
  }
}

Reservation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    customerEmail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    customerPhone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    busyTables : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tableCapacity : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    hour: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    people: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    status: {
      type: DataTypes.ENUM('confirmed', 'cancelled'),
      defaultValue: 'confirmed',
    },
  },
  {
    sequelize, // Instancia de Sequelize
    modelName: 'Reservation',
  }
);

export default Reservation ;
