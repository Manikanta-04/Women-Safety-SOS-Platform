const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const { generateAIReport, getAdminStats } = require("../controllers/adminController");

// All admin routes require valid JWT + admin role
router.use(protect, adminOnly);

router.get("/stats", getAdminStats);
router.post("/ai-report", generateAIReport);

module.exports = router;