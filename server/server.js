require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contacts");
const sosRoutes = require("./routes/sos");
const incidentRoutes = require("./routes/incidents");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");

// Connect to MongoDB
connectDB();

const app = express();

// Security headers
app.use(helmet());

// CORS — allow frontend origin
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Request logging
app.use(morgan("dev"));

// Body parser
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/sos", sosRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});