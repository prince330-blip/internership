import sequelize from "./src/config/db.js";

(async () => {
  try {
    const [results] = await sequelize.query('SHOW TABLES');
    console.log('Current tables in database:');
    results.forEach(row => console.log('- ' + Object.values(row)[0]));
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    process.exit(0);
  }
})();
