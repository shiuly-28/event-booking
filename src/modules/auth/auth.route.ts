import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser); // 👈 Login route যুক্ত হলো

export const AuthRoutes = router;