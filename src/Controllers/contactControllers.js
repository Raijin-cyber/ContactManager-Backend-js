//@desc Get all Contacts
//@route " GET /api/contact"
//@access public
const getAllContact = (req, res) => {
    res.status(200).json({mesaage: "All contacts fetched!"});
};

//@desc Create a contact
//@route " POST /api/contact"
//@access public
const createContact = (req, res) => {
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    res.status(201).json({mesaage: `Contact ${req.body.name} created successfully!`});

}

//@desc Get a contact
//@route " GET /api/contact/:id"
//@access public
const getContact = (req, res) => {
    res.status(200).json({message: "Contact fetched successfully!"});
}

//@desc Update a contact
//@route " PUT /api/contact/:id"
//@access public
const updateContact = (req, res) => {
    res.status(200).json({mesaage: `Contact ${req.params.id} updated successfully!`});
}

//@desc Delete a contact
//@route " DELETE /api/contact/:id"
//@access public
const deleteContact = (req, res) => {
    res.status(200).json({mesaage: `Contact ${req.params.id} deleted successfully!`});
}

export {
    getAllContact,
    getContact,
    createContact,
    updateContact,
    deleteContact
}