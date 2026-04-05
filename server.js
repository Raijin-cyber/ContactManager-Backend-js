import express from "express";
import dotenv from "dotenv";
import contactRoutes from "./src/Routes/contactRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contact", contactRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT:http://localhost:${PORT}`);
})