import express from "express";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.static("public")); // Serve static HTML file from the 'public' folder

// Endpoint to handle image generation requests
app.post("/generate-images", async (req, res) => {
  const { prompt } = req.body;

  try {
    // Create an array of 4 variations of the same prompt
    const prompts = [`${prompt}`, `${prompt}`, `${prompt}`, `${prompt}`];

    // Generate images for all 4 prompts using Promise.all
    const imagePromises = prompts.map((p) => generateImage(p));

    const images = await Promise.all(imagePromises);

    // Send back the base64-encoded images
    res.json({ images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating images" });
  }
});

// Function to generate a single image and return the base64 data
async function generateImage(prompt) {
  const result = await ai.models.generateContent({
    model: "gemini-2.0-flash-exp-image-generation",
    contents: prompt,
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  // Extract the image data (base64-encoded) and return it
  const imageData = result.candidates[0].content.parts.find(
    (part) => part.inlineData
  ).inlineData.data;
  return imageData;
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
