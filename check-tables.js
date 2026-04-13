import sequelize from "./src/config/db.js";

async function checkTables() {
  try {
    const result = await sequelize.query(
      "SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'internership'"
    );
    console.log("Tables in database:");
    console.log(result[0]);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    process.exit(0);
  }
}

checkTables();
