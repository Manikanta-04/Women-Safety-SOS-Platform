const { validationResult } = require("express-validator");
const SOSAlert = require("../models/SOSAlert");

// @route  POST /api/sos/trigger
const triggerSOS = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message, latitude, longitude, locationLabel } = req.body;

    const alert = await SOSAlert.create({
      userId: req.user._id,
      message: message || "",
      latitude: latitude || null,
      longitude: longitude || null,
      locationLabel: locationLabel || "Location not available",
      triggeredAt: new Date(),
      status: "active",
    });

    res.status(201).json({
      message: "SOS alert triggered successfully",
      alert,
    });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/sos/my
const getMySOS = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await SOSAlert.countDocuments({ userId: req.user._id });
    const alerts = await SOSAlert.find({ userId: req.user._id })
      .sort({ triggeredAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      alerts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @route  PATCH /api/sos/:id/resolve
const resolveAlert = async (req, res, next) => {
  try {
    const alert = await SOSAlert.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!alert) {
      return res.status(404).json({ message: "SOS alert not found" });
    }

    alert.status = "resolved";
    await alert.save();

    res.json({ message: "SOS alert marked as resolved", alert });
  } catch (error) {
    next(error);
  }
};

module.exports = { triggerSOS, getMySOS, resolveAlert };