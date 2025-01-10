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

  // Método para actualizar una solicitud especial
  updateSpecialRequest(request) {
    this.specialRequest = request;
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
    reservationDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    numberOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    tableNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specialRequest: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize, // Instancia de Sequelize
    modelName: 'Reservation',
  }
);

export { Reservation };
