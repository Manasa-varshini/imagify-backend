import express from 'express'
import { generateImage } from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'

const imageRouter = express.Router()

imageRouter.post('/generate-image', userAuth, async (req, res) => {
  try {
    console.log(" Reached /generate-image route");
    console.log(" Authenticated user ID:", req.userId);
    console.log(" Request body:", req.body);

   
    await generateImage(req, res);
  } catch (error) {
    console.error(" Error inside /generate-image route:", error.message);
    res.status(500).json({ message: "Something went wrong in route" });
  }
});

export default imageRouter;
