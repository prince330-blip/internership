import express from "express";
import cors from "cors";
import sequelize from "./src/config/db.js";
import userRoutes from "./src/routes/user.js";
import "dotenv/config";
import authRouter from"./src/routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authRouter);

// Routes
app.use("/", userRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

sequelize.authenticate()
  .then(() => sequelize.sync({ alter: true }))
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
      console.log("Your database is running");
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database", error);
    process.exit(1);
  });
