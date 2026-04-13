const { validationResult } = require("express-validator");
const EmergencyContact = require("../models/Contact");

// @route  GET /api/contacts
const getContacts = async (req, res, next) => {
  try {
    const contacts = await EmergencyContact.find({ userId: req.user._id }).sort(
      { createdAt: -1 }
    );
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

// @route  POST /api/contacts
const addContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const count = await EmergencyContact.countDocuments({
      userId: req.user._id,
    });
    if (count >= 5) {
      return res
        .status(400)
        .json({ message: "Maximum 5 emergency contacts allowed" });
    }

    const { name, phone, relationship } = req.body;

    const contact = await EmergencyContact.create({
      userId: req.user._id,
      name,
      phone,
      relationship,
    });

    res.status(201).json({ message: "Contact added successfully", contact });
  } catch (error) {
    next(error);
  }
};

// @route  PUT /api/contacts/:id
const updateContact = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const contact = await EmergencyContact.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const { name, phone, relationship } = req.body;
    contact.name = name || contact.name;
    contact.phone = phone || contact.phone;
    contact.relationship = relationship || contact.relationship;

    await contact.save();
    res.json({ message: "Contact updated successfully", contact });
  } catch (error) {
    next(error);
  }
};

// @route  DELETE /api/contacts/:id
const deleteContact = async (req, res, next) => {
  try {
    const contact = await EmergencyContact.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact removed successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getContacts, addContact, updateContact, deleteContact };