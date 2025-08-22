/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import showImage from "./ShowImage";

const ImageUploader = ({ image, onFileChange, title }) => {
  const [preview, setPreview] = useState(image);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    if (typeof image === "string") {
      setPreview(image); // Mantener la URL del backend
    } else if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      onFileChange(file);
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  return (
    <div>
      {/* Botón para subir archivo */}
      <label
        htmlFor="file-upload"
        className="inline-block cursor-pointer rounded-lg bg-[#ff9494] dark:bg-[#6d6d6d] px-4 py-2 text-white text-center hover:bg-red-400 dark:hover:bg-gray-700  transition-colors"
      >
        {title}
      </label>

      {/* Input escondido */}
      <input
        id="file-upload"
        name="installationPhoto"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Preview */}
      {preview && (
        <div className="mt-4 min-w-12  flex flex-wrap gap-3">
          <img
            src={preview}
            alt="preview"
            className="w-48 h-48 object-cover rounded-lg border border-gray-300 transition duration-300 hover:opacity-60 hover:shadow-lg hover:backdrop-blur-sm cursor-pointer"
            onClick={() => {
              showImage(preview);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
