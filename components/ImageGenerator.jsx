"use client"
import { useState } from "react";
import axios from "axios";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/generate", { prompt });
      const imageUrl = response.data.images[0].url; // Update based on API response format
      setImage(imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-4">Text-to-Image Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        className="p-2 border rounded mb-4 w-full max-w-md"
        rows={4}
      ></textarea>
      <button
        onClick={generateImage}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>
      {image && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Generated Image:</h2>
          <img src={image} alt="Generated" className="max-w-full h-auto border" />
        </div>
      )}
    </div>
  );
}
