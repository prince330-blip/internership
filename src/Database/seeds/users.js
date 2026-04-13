
import bcrypt from 'bcrypt';
import User from "../models/users";

export const seedUsers = async () => {
    const hashpassword = await bcrypt.hash('defaultPassword123', 10);
    const users = [
        {
            fullName: 'SHEMA',
            email: 'shema@gmail.com',
            phoneNumber: '0781234599',
            gender: 'male',
            role: 'patient',
            status: 'active',
            date_of_birth: '12-12-2012',
            location: 'kigali',
            emergency_contact: '0781527289',
            password: hashpassword,
        },
        {
            fullName: 'gigg',
            email: 'gigg@gmail.com',
            phoneNumber: '0781234599',
            gender: 'female',
            role: 'patient',
            status: 'active',
            date_of_birth: '12-12-2012',
            location: 'kigali',
            emergency_contact: '0781527289',
            password: hashpassword,
        },
    ];
    await User.insertMany(users);
}