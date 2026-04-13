import User from "../Database/models/user.js";
import bcrypt from "bcrypt";

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

//get single user by id
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundUser = await User.findByPk(id);
        if (!foundUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(foundUser);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

//create user 
export const createUser = async (req, res) => {
    try {
        const { username, fullname, email, phone, password, role, department } = req.body;
        const finalFullname = fullname || username;

        if (!finalFullname || !password) {
            return res.status(400).json({ error: "username/fullname and password are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username: username || null,
            fullname: finalFullname,
            email: email || null,
            phone: phone || null,
            role: role || null,
            department: department || null,
            password: hashedPassword
        });
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

//update user
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, fullname, email, phone, password, role, department } = req.body;
        const userToUpdate = await User.findByPk(id);
        if (!userToUpdate) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const updateData = {};
        if (username) updateData.username = username;
        if (fullname) updateData.fullname = fullname;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (role) updateData.role = role;
        if (department) updateData.department = department;
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        
        await userToUpdate.update(updateData);
        res.status(200).json({ message: "User updated successfully", user: userToUpdate });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

//delete user 
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToDelete = await User.findByPk(id);
        if (!userToDelete) {
            return res.status(404).json({ error: "User not found" });
        }
        await userToDelete.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};