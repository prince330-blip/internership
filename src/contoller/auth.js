import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Database/models/user.js";

export const Register = async (req, res) => {
    try {
        const { password, ...userData } = req.body;
        const existing = await User.findOne({ where: { email: userData.email } });
        if (existing) {
            return res.status(401).json({ message: "User/Account already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userAccount = await User.create({ ...userData, password: hashedPassword });
        res.status(201).json({ message: 'User account created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found in the system' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // create token
        const token = jwt.sign(
            { id: user.id, role: user.role, fullName: user.fullname },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id; // assuming middleware sets req.user
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await user.update({ password: hashedNewPassword });
        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};