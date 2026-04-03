import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected has been successfully to the database");
    return { success: true, message: "connected to the database" };
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return { success: false, message: "Failed to connect to the database" };
  }
};

export default sequelize;