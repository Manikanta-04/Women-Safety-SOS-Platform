const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");
const { updateProfile, changePassword } = require("../controllers/userController");

router.use(protect);

router.put(
  "/profile",
  [
    body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
    body("phone")
      .optional()
      .trim()
      .isLength({ min: 7, max: 15 })
      .withMessage("Enter a valid phone number"),
  ],
  updateProfile
);

router.put(
  "/change-password",
  [
    body("currentPassword").notEmpty().withMessage("Current password is required"),
    body("newPassword")
      .isLength({ min: 8 })
      .withMessage("New password must be at least 8 characters"),
  ],
  changePassword
);

module.exports = router;