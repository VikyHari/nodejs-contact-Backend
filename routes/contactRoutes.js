const express = require("express");
const router = express.Router();
const { getContact, createContact, putContact, getIndividualContact, deleteContact } = require("../controllers/contactController");
const validateToken = require("../middleware/validateToken");

router.use(validateToken);

router.route("/").get(getContact).post(createContact);
router.route("/:id").get(getIndividualContact).put(putContact).delete(deleteContact)

module.exports = router;