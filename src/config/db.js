import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
    
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
    }
)
export const connectToDatabase = async () => {
    try{
        await sequelize.authenticate();
        console.log('Connection to database has been successfully established.');
        return { success: true, message: 'connection to database has been successfully established'
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return { success: false, message: 'connection to database not been successfully established'
        }
    }
};

export default sequelize;