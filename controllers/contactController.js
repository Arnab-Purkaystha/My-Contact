const asyncHandler = require("express-async-handler"); // we dont have to write each try-catch block for the functions as async require each try-catch block
const Contact  = require("../models/contactModel")

//desc Get all contacts
//get /api/contacts
//access private
const getContacts = asyncHandler(async (req, res) =>{
    const contacts = await Contact.find({ user_id: req.user.id});
    res.status(201).json(contacts)
});

//desc Create new contact
//post /api/contacts
//access private
const createContact = asyncHandler(async (req, res) =>{
    console.log("the request body is :" , req.body)
    const {name, email, phone } = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!!")
    }
    const contact  =await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact)

});

//desc Get  contact
//get /api/contacts
//access private
const getContact = asyncHandler(async (req, res) =>{
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404);
        throw new error("Contact not found");
    }
    res.status(201).json(contact)
});

//desc Update  contact
//put /api/contacts
//access private
const updateContact = asyncHandler(async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new error("Contact not found");
    }

    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
      }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    res.status(201).json(updatedContact)
});
//desc delete  contact
//delete /api/contacts
//access private
const deleteContact = asyncHandler(async (req, res) =>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User don't have permission to update other user contacts");
      }
    await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});
module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};