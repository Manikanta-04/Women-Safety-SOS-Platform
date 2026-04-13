const IncidentReport = require("../models/Incident");
const SOSAlert = require("../models/SOSAlert");
const User = require("../models/User");

// @route  POST /api/admin/ai-report
const generateAIReport = async (req, res, next) => {
  try {
    // Fetch last 50 incidents
    const incidents = await IncidentReport.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("userId", "name");

    if (incidents.length === 0) {
      return res
        .status(400)
        .json({ message: "No incidents found to analyze" });
    }

    // Format incidents for AI prompt
    const incidentData = incidents.map((inc) => ({
      type: inc.incidentType,
      location: inc.locationDescription,
      date: inc.incidentDate,
      description: inc.description,
    }));

    const prompt = `
You are a safety analyst for a women's safety platform. 
Analyze the following ${incidentData.length} incident reports and provide a concise safety intelligence report.

Incident Data:
${JSON.stringify(incidentData, null, 2)}

Respond ONLY with a valid JSON object (no markdown, no backticks) in this exact format:
{
  "summary": "2-3 sentence overall pattern summary",
  "highRiskZones": ["zone1", "zone2", "zone3"],
  "peakTimes": ["time pattern 1", "time pattern 2"],
  "topIncidentTypes": [
    {"type": "harassment", "count": 12, "percentage": "40%"},
    {"type": "theft", "count": 8, "percentage": "26%"}
  ],
  "recommendations": [
    "Actionable recommendation 1",
    "Actionable recommendation 2",
    "Actionable recommendation 3"
  ],
  "riskLevel": "High | Medium | Low",
  "analyzedCount": ${incidentData.length}
}`;

    // Call Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1000,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errData = await geminiResponse.json();
      return res.status(502).json({
        message: "Gemini API error",
        detail: errData?.error?.message || "Unknown error",
      });
    }

    const geminiData = await geminiResponse.json();
    const rawText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Strip any markdown fences just in case
    const cleanText = rawText.replace(/```json|```/g, "").trim();

    let report;
    try {
      report = JSON.parse(cleanText);
    } catch {
      return res.status(502).json({
        message: "Failed to parse AI response",
        raw: rawText,
      });
    }

    res.json({
      success: true,
      generatedAt: new Date(),
      report,
    });
  } catch (error) {
    next(error);
  }
};

// @route  GET /api/admin/stats
const getAdminStats = async (req, res, next) => {
  try {
    const [totalUsers, totalIncidents, totalSOS, activeAlerts] =
      await Promise.all([
        User.countDocuments({ role: "user" }),
        IncidentReport.countDocuments(),
        SOSAlert.countDocuments(),
        SOSAlert.countDocuments({ status: "active" }),
      ]);

    // Incidents by type
    const incidentsByType = await IncidentReport.aggregate([
      { $group: { _id: "$incidentType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Recent 5 incidents
    const recentIncidents = await IncidentReport.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("userId", "name email");

    // Recent 5 SOS alerts
    const recentSOS = await SOSAlert.find()
      .sort({ triggeredAt: -1 })
      .limit(5)
      .populate("userId", "name email");

    res.json({
      stats: {
        totalUsers,
        totalIncidents,
        totalSOS,
        activeAlerts,
      },
      incidentsByType,
      recentIncidents,
      recentSOS,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { generateAIReport, getAdminStats };