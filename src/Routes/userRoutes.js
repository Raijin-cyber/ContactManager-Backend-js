import express from "express";
import { getCurrentUser, loginUser, registerUser } from "../Controllers/userController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);

userRoutes.post("/login", loginUser);

userRoutes.get("/current", validateToken, getCurrentUser);

export default userRoutes;