import express from "express";
import { registerUser, loginUser, logoutUser, changeData } from "../controllers/userController.js";
import { reserveTable, getAvailableHours, getReservations, reservationManage} from "../controllers/reserveController.js";
import { getSettings, setSettings } from "../controllers/settingController.js";

const router = express.Router();

router.get("/getsession", (req, res) => {
  res.json(req.session);
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",logoutUser);
router.post("/changeData",  changeData);
router.post("/reserve", reserveTable);
router.post("/getreservations", getReservations);
router.get("/gethours", getAvailableHours);
router.post("/reservationManage", reservationManage);
router.get("/getSettings", getSettingsings);
router.post("/setSettings", setSettings);



export default router;
