const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");
const { reportIncident, getMyIncidents } = require("../controllers/incidentController");

router.use(protect);

router.post(
  "/",
  [
    body("incidentType")
      .isIn(["harassment", "theft", "assault", "stalking", "other"])
      .withMessage("Invalid incident type"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required")
      .isLength({ max: 1000 })
      .withMessage("Description cannot exceed 1000 characters"),
    body("locationDescription")
      .trim()
      .notEmpty()
      .withMessage("Location description is required"),
    body("incidentDate")
      .notEmpty()
      .withMessage("Incident date is required")
      .isISO8601()
      .withMessage("Invalid date format"),
  ],
  reportIncident
);

router.get("/my", getMyIncidents);

module.exports = router;