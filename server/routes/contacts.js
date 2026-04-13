const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");
const {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const contactValidation = [
  body("name").trim().notEmpty().withMessage("Contact name is required"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 7, max: 15 })
    .withMessage("Enter a valid phone number"),
  body("relationship")
    .isIn(["parent", "sibling", "spouse", "friend", "colleague", "other"])
    .withMessage("Invalid relationship type"),
];

router.use(protect);

router.get("/", getContacts);
router.post("/", contactValidation, addContact);
router.put("/:id", contactValidation, updateContact);
router.delete("/:id", deleteContact);

module.exports = router;