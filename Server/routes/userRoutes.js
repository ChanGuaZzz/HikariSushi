import express from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/getsession", (req, res) => {
  res.json(req.session);
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",logoutUser);

export default router;
