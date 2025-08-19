import React, { useState } from "react";

export default function Dalle() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // const HUGGING_FACE_API_TOKEN = "";

  const generateImage = async () => {
    if (!prompt.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(
        "https://router.huggingface.co/nscale/v1/images/generations",
        {
          method: "POST",
          headers: {
            // Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            response_format: "b64_json",
            prompt: prompt,
            model: "black-forest-labs/FLUX.1-schnell",
          }),
        }
      );

      const data = await response.json();
      const base64Image = data?.data?.[0]?.b64_json;

      if (base64Image) {
        const imageUrl = `data:image/png;base64,${base64Image}`;
        setImages((prev) => [imageUrl, ...prev]);
      } else {
        throw new Error("No image data found in response");
      }
    } catch (error) {
      alert("Error generating image. Check console.");
      console.error("API error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") generateImage();
  };

  return (
    <>
      {/* Bootstrap CSS */}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
        rel="stylesheet"
      />

      {/* Inline Custom Styles */}
      <style>{`
        body {
        width: 100%;
          background-color: #FAF5EF;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .btn-orange {
          background-color: #ED5B2B;
          border-color: #ED5B2B;
          color: white;
        }
        .btn-orange:hover {
          background-color: #d94e20;
          border-color: #d94e20;
        }
        .form-control:focus {
          border-color: #ED5B2B;
          box-shadow: 0 0 0 0.2rem rgba(237, 91, 43, 0.25);
        }
        .image-card:hover {
          transform: scale(1.02);
          transition: transform 0.2s;
        }
      `}</style>

      <div className="">
        <div className="container py-5">
          <h1 className="display-5 text-center mb-5 text-danger">
            Create Designs with Looksy
          </h1>

          <div className="row mb-4">
            <div className="col-md-10 mx-auto">
              <div className="input-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Type your image prompt here..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="btn btn-orange btn-lg"
                  onClick={generateImage}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Generating...
                    </>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </div>
          </div>

          {images.length > 0 ? (
            <div className="row g-4">
              {images.map((img, idx) => (
                <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="card image-card shadow-sm">
                    <img
                      src={img}
                      alt={`Generated ${idx}`}
                      className="card-img-top"
                      style={{ objectFit: "cover" }}
                    />
                    <div className="card-body d-flex justify-content-between">
                      <a
                        href={img}
                        download={`image_${idx}.png`}
                        className="btn btn-sm btn-outline-primary"
                      >
                        ⬇️ Download
                      </a>
                      <button
                        onClick={() => deleteImage(idx)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        ❌ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center mt-5 text-muted">
              <h4>No images generated yet</h4>
              <p>
                Enter a prompt above and click Generate to create your first
                image!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bootstrap JS */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    </>
  );
}
