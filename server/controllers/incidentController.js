const { validationResult } = require("express-validator");
const IncidentReport = require("../models/Incident");

// @route  POST /api/incidents
const reportIncident = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { incidentType, description, locationDescription, incidentDate } =
      req.body;

    const incident = await IncidentReport.create({
      userId: req.user._id,
      incidentType,
      description,
      locationDescription,
      incidentDate: new Date(incidentDate),
    });

    res
      .status(201)
      .json({ message: "Incident reported successfully", incident });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/incidents/my
const getMyIncidents = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await IncidentReport.countDocuments({ userId: req.user._id });
    const incidents = await IncidentReport.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      incidents,
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

module.exports = { reportIncident, getMyIncidents };