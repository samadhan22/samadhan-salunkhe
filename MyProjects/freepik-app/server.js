import dotenv from "dotenv";
dotenv.config(); // This must come BEFORE you access process.env

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

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const response = await axios.get(
      `https://api.freepik.com/v1/resources`, // Updated endpoint
      {
        headers: {
          "x-freepik-api-key": process.env.FREEPIK_API_KEY, // Correct header
        },
        params: {
          query: query, // Assuming the API supports this parameter
          page: 1,
          limit: 1,
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

// Proxy route to fetch images
app.get("/proxy", async (req, res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    res.set("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Failed to fetch image");
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);

// Client-side function to search Freepik
async function searchFreepik() {
  const query = document.getElementById("search").value.trim();

  if (!query) {
    alert("Please enter a search query.");
    return;
  }

  const container = document.getElementById("results");
  container.innerHTML = "<p>Loading...</p>"; // Show loading indicator

  try {
    const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }

    const data = await res.json();
    console.log("API Response:", data); // Log the API response for debugging

    container.innerHTML = ""; // Clear loading indicator

    (data.data || []).forEach((item) => {
      console.log("Image URL:", item.thumbnails?.small); // Log image URLs
      const img = document.createElement("img");
      const proxiedUrl = `/proxy?url=${encodeURIComponent(item.thumbnails?.small)}`;
      img.src = proxiedUrl;
      img.alt = item.title || "Image"; // Add alt text for better accessibility
      img.style.margin = "10px";
      container.appendChild(img);
    });

    if ((data.data || []).length === 0) {
      container.innerHTML = "<p>No results found.</p>";
    }
  } catch (error) {
    console.error("Error fetching Freepik data:", error);
    container.innerHTML =
      "<p>Failed to fetch results. Please try again later.</p>";
  }
}
