import exrpress from "express";
import { getAllContact, getContact, createContact, updateContact, deleteContact } from "../Controllers/contactControllers.js";
import validateToken from "../middleware/validateTokenHandler.js";

const contactRoutes = exrpress.Router();

contactRoutes.use(validateToken);

contactRoutes.route("/")
.get(getAllContact)
.post(createContact)

contactRoutes.route("/:id")
.get(getContact)
.put(updateContact)
.delete(deleteContact) 

export default contactRoutes;