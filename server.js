import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
await connectDB();

// Routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);


app.get('/', (req, res) => res.send('API Working'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));