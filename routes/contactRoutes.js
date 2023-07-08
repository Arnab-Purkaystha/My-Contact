const express  =require("express");
const router = express.Router();
const {getContacts, getContact, createContact, updateContact, deleteContact} = require("../controllers/contactController")

router.route("/").get(getContacts);

// router.route("/").post((req, res) =>{
//     res.send("Create  contact")
// });  if we dont use controllers we have to do it manually
router.route("/").post(createContact)

router.route("/:id").get(getContact);


router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);



module.exports = router;