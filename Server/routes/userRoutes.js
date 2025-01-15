import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js";
import { reserveTable, getAvailableHours, getReservations } from "../controllers/reserveController.js";

const router = express.Router();

router.get("/getsession", (req, res) => {
  res.json(req.session);
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",logoutUser);
router.post("/reserve", reserveTable);
router.get("/getreservations", getReservations);
router.get("/gethours", getAvailableHours);


export default router;
