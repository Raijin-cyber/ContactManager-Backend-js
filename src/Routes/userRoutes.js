import express from "express";
import { getCurrentUser, loginUser, registerUser } from "../Controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);

userRoutes.post("/login", loginUser);

userRoutes.get("/current", getCurrentUser);

export default userRoutes;