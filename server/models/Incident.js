const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    incidentType: {
      type: String,
      required: [true, "Incident type is required"],
      enum: ["harassment", "theft", "assault", "stalking", "other"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    locationDescription: {
      type: String,
      required: [true, "Location description is required"],
      trim: true,
    },
    incidentDate: {
      type: Date,
      required: [true, "Incident date is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("IncidentReport", incidentSchema);