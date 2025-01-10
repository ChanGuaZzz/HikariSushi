import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js'; // Importar la configuración de Sequelize
import bcrypt from 'bcrypt';

class User extends Model {
  // Método para confirmar una reserva
  setPassword(password) {
    const saltRounds = 10; // or another salt round as per security requirement
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    this.password = hashedPassword;
  }

  // Method to check the password against the hashed password
  checkPassword(password) {
    const result = bcrypt.compareSync(password, this.password);
    // console.log(`Checking password for ${this.username}: ${result}`); // Debug print
    return result;
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
  },
  {
    sequelize, // Instancia de Sequelize
    modelName: 'User',
  }
);

export default User;
