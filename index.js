import express from "express";
import sequelize from "./src/config/db.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => sequelize.sync())
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
        
