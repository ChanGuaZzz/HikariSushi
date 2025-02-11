import express from "express";
import { registerUser, loginUser, logoutUser, changeData } from "../controllers/userController.js";
import { reserveTable, getAvailableHours, getReservations, reservationManage } from "../controllers/reserveController.js";

const router = express.Router();

router.post("/api/getsession", (req, res) => {
  res.json(req.session);
});
router.post("/api/register", registerUser);
router.post("/api/login", loginUser);
router.post("/api/logout",logoutUser);
router.post("/api/changeData",  changeData);
router.post("/api/reserve", reserveTable);
router.post("/api/getreservations", getReservations);
router.post("/api/gethours", getAvailableHours);
router.post("/api/reservationManage", reservationManage);


export default router;
