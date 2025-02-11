import dotenv from "dotenv";
import sequelize from "./config/db.js";
import { server } from "./app.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";
// import "./routes/socketRoutes.js"
// import "./config/mailer.js"
dotenv.config();
sequelize.sync({ alter: true }).then(() => {
  //CREA UN USUARIO ADMINISTRADOR
  const hashedPass = bcrypt.hashSync("admin", 10);
  User.destroy({ where: { role: "admin" } });
  User.create({
    name: "admin",
    email: "admin@admin.com",
    phone: 0,
    password: hashedPass,
    role: "admin",
  });
  server.listen(process.env.PORT || 3000, () => console.log("Server running on port 3000"));
});
