const express  =require("express");
const router = express.Router();
const {getContacts, getContact, createContact, updateContact, deleteContact} = require("../controllers/contactController")



// router.route("/").post((req, res) =>{
//     res.send("Create  contact")
// });  if we dont use controllers we have to do it manually
const validateToken = require("../middlware/validateTokenHandler");


router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);




module.exports = router;