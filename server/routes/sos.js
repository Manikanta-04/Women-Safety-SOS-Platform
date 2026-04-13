const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { protect } = require("../middleware/authMiddleware");
const { triggerSOS, getMySOS, resolveAlert } = require("../controllers/sosController");

router.use(protect);

router.post(
  "/trigger",
  [
    body("message").optional().trim().isLength({ max: 500 }),
    body("latitude").optional().isFloat({ min: -90, max: 90 }),
    body("longitude").optional().isFloat({ min: -180, max: 180 }),
    body("locationLabel").optional().trim(),
  ],
  triggerSOS
);

router.get("/my", getMySOS);
router.patch("/:id/resolve", resolveAlert);

module.exports = router;