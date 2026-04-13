import db from "./src/Database/models/index.js";

async function syncDatabase() {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("✅ All tables created/synced successfully!");
    console.log("\nTables created:");
    console.log("- users");
    console.log("- appointments");
    console.log("- doctors_availability");
    console.log("- notifications");
  } catch (error) {
    console.error("❌ Error syncing database:", error.message);
  } finally {
    process.exit(0);
  }
}

syncDatabase();
