import expressAsyncHandler from "express-async-handler";
import Contact from "../../models/contactModel.js";

//@desc Get all Contacts
//@route " GET /api/contact"
//@access private
const getAllContact = expressAsyncHandler(async(req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
})

//@desc Create a contact
//@route " POST /api/contact"
//@access private
const createContact = expressAsyncHandler(async(req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }

    const contact = await Contact.create({ name, email, phone, user_id: req.user.id });
    res.status(201).json({mesaage: `Contact ${req.body.name} created successfully!`, result: contact});

})

//@desc Get a contact
//@route " GET /api/contact/:id"
//@access private
const getContact = expressAsyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }
    res.status(200).json({message: "Contact fetched successfully!", result: contact});
})

//@desc Update a contact
//@route " PUT /api/contact/:id"
//@access private
const updateContact = expressAsyncHandler(async(req, res) => {

    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    ) 

    res.status(200).json(
        {
            mesaage: `Contact ${req.params.id} updated successfully!`,
            result: updatedContact,
        }
    );
})

//@desc Delete a contact
//@route " DELETE /api/contact/:id"
//@access private
const deleteContact = expressAsyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found!");
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({mesaage: `Contact ${req.params.id} deleted successfully!`, result: contact});
})

export {
    getAllContact,
    getContact,
    createContact,
    updateContact,
    deleteContact
}