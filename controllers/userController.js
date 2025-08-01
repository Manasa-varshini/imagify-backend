// import userModel from "../models/userModel.js";
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';

// const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         if (!name || !email || !password) {
//             return res.status(400).json({ success: false, message: 'Missing Details' });
//         }

//         const existingUser = await userModel.findOne({ email: email.trim().toLowerCase() });
//         if (existingUser) {
//             return res.status(409).json({ success: false, message: 'User already exists' });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new userModel({
//             name: name.trim(),
//             email: email.trim().toLowerCase(),
//             password: hashedPassword,
//         });

//         const user = await newUser.save();

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: '1d'
//         });

//         res.status(201).json({
//             success: true,
//             token,
//             user: { name: user.name }
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };

// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: 'Missing Credentials' });
//         }

//         const user = await userModel.findOne({ email: email.trim().toLowerCase() });
//         if (!user) {
//             return res.status(401).json({ success: false, message: 'User does not exist' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(401).json({ success: false, message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//             expiresIn: '1d'
//         });

//         res.status(200).json({
//             success: true,
//             token,
//             user: { name: user.name }
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };

// const userCredits = async (req, res) => {
    
//     console.log("User ID extracted in controller:", req.userId);

//     try {
//         const user = await userModel.findById(req.userId);
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         res.status(200).json({
//             success: true,
//             credits: user.creditBalance,
//             user: { name: user.name }
//         });

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };

// export { registerUser, loginUser, userCredits };
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Missing Details' });
        }

        const existingUser = await userModel.findOne({ email: email.trim().toLowerCase() });
        if (existingUser) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(201).json({
            success: true,
            token,
            user: { name: user.name }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Missing Credentials' });
        }

        const user = await userModel.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(401).json({ success: false, message: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        res.status(200).json({
            success: true,
            token,
            user: { name: user.name }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};


const forgotPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        if (!email || !newPassword) {
            return res.status(400).json({ success: false, message: 'Missing email or new password' });
        }

        const user = await userModel.findOne({ email: email.trim().toLowerCase() });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password updated successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export { registerUser, loginUser,  forgotPassword };

