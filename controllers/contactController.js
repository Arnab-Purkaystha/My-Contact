const asyncHandler = require("express-async-handler") // we dont have to write each try-catch block for the functions as async require each try-catch block
//desc Get all contacts
//get /api/contacts
//access public
const getContacts = asyncHandler(async (req, res) =>{
    res.send("Get all contacts")
});

//desc Create new contact
//post /api/contacts
//access public
const createContact = asyncHandler(async (req, res) =>{
    console.log("the request body is :" , req.body)
    const {name, email, phone } = req.body;
    if(!name || ! email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory!!")
    }
    res.status(201).json({message:"Create  contact"})

});

//desc Get  contact
//get /api/contacts
//access public
const getContact = asyncHandler(async (req, res) =>{
    res.send(`Get Contact for ${req.params.id}`);
});

//desc Update  contact
//put /api/contacts
//access public
const updateContact = asyncHandler(async (req, res) =>{
    res.send(`Update Contact for ${req.params.id}`);
});
//desc delete  contact
//delete /api/contacts
//access public
const deleteContact =asyncHandler(async (req, res) =>{
    res.send(`Delete Contact for ${req.params.id}`);
});
module.exports = {getContacts, getContact, createContact, updateContact, deleteContact};