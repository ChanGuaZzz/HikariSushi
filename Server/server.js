import dotenv from "dotenv";
import sequelize from "./config/db.js";
import { server } from "./app.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import Settings from "./models/Settings.js";
// import "./routes/socketRoutes.js"
// import "./config/mailer.js"
dotenv.config();
sequelize.sync({ alter: true }).then(async() => {
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
  const settings = await Settings.findOne();
  if (!settings) {
    await Settings.create({
      typeOfTables: [{ qty: 4, capacity: 2 }, { qty: 20, capacity: 4 }, { qty: 5, capacity: 8 }],
      allHours: ["9:00", "12:00", "14:00", "16:00", "21:00"],
    });
  }
  
  server.listen(process.env.PORT || 3000, () => console.log("Server running on port 3000"));
});
