import { Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();


const sequelize = new Sequelize({
    database: process.env.DB_DATABASE || "Hikari",
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    logging: false,
  });
  

export default sequelize;
