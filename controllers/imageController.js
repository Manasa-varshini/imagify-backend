import userModel from "../models/userModel.js";
import FormData from 'form-data';
import axios from 'axios';

export const generateImage = async (req, res) => {
    try {
        const { prompt } = req.body;
        const userId = req.userId;

        if (!userId || !prompt) {
            return res.status(400).json({ success: false, message: 'Missing Details' });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        
        const formData = new FormData();
        formData.append('prompt', prompt);

        const response = await axios.post(
            'https://clipdrop-api.co/text-to-image/v1',
            formData,
            {
                headers: {
                    ...formData.getHeaders(),
                    'x-api-key': process.env.CLIPDROP_API,
                },
                responseType: 'arraybuffer'
            }
        );

        const base64Image = Buffer.from(response.data, 'binary').toString('base64');
        const resultImage = `data:image/png;base64,${base64Image}`;

      
        return res.status(200).json({
            success: true,
            message: "Image generated successfully",
            resultImage
        });

    } catch (error) {
        console.error("Image generation error:", error?.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: error?.response?.data?.message || "Something went wrong"
        });
    }
};
