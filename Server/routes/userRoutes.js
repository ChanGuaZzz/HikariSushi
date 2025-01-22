import express from "express";
import { registerUser, loginUser, logoutUser, changePassword } from "../controllers/userController.js";
import { reserveTable, getAvailableHours, getReservations, reservationManage } from "../controllers/reserveController.js";

const router = express.Router();

router.get("/getsession", (req, res) => {
  res.json(req.session);
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",logoutUser);
router.post("/reserve", reserveTable);
router.post("/getreservations", getReservations);
router.get("/gethours", getAvailableHours);
router.post("/reservationManage", reservationManage);
router.post("/changepassword",  changePassword);


export default router;
