import dotenv from "dotenv";
dotenv.config(); // This must come BEFORE you access process.env
console.log("Using API Key:", process.env.FREEPIK_API_KEY); // Debug print

import express from "express";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = 3000;

// Helper to get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from public/
app.use(express.static(path.join(__dirname, "public")));

// API route to fetch Freepik data
app.get("/api/search", async (req, res) => {
  console.log("✅ /api/search route hit");
  const { query } = req.query;
  console.log("Query received:", query);

  try {
    const response = await axios.get(
      `https://api.freepik.com/v1/resources/search`,
      {
        headers: {
          "x-freepik-api-key": process.env.FREEPIK_API_KEY, // Updated header
        },
        params: {
          query: query,
          page: 1,
          limit: 10,
        },
      }
    );
    console.log("✅ Freepik API response success");
    res.json(response.data);
  } catch (error) {
    console.error(
      "❌ Freepik API error:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch Freepik data" });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
