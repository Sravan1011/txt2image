import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await axios.post(
      "https://api.getimg.ai/v1/generate",
      {
        prompt,
        width: 512,
        height: 512,
        num_images: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GETIMG_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Pass the generated image(s) back to the frontend
    res.status(200).json({ images: response.data.images });
  } catch (error) {
    console.error("Error generating image:", error.message);
    res.status(500).json({ error: "Failed to generate image", details: error.message });
  }
}
