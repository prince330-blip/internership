import sequelize from '../config/db.js';
import User from '../database/models/users.js';

const createUserTable = async () => {
    try {
       
        await sequelize.authenticate();
        console.log("Database connected successfully.");

        
        await User.sync({ alter: true });
        console.log("User table created/updated successfully.");

    } catch (error) {
        console.error("Error creating User table:", error);
    }
};

export default createUserTable;