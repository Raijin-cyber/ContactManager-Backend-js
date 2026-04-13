import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbConnection.js";
import contactRoutes from "./src/Routes/contactRoutes.js";
import userRoutes from "./src/Routes/userRoutes.js";
import errorHandler from "./src/middleware/errorHandler.js";

dotenv.config();

connectDb(); // connecting database, if it fails then terminate the server
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT:http://localhost:${PORT}`);
})