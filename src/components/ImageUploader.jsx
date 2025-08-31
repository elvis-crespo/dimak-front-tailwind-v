/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import showImage from "./ShowImage";
import Icon from "./Icons/Icon";

const ImageUploader = ({ id, image, onFileChange }) => {
  const [preview, setPreview] = useState(image);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    if (typeof image === "string") {
      setPreview(image); // URL del backend
    } else if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleFileChange = (file) => {
    if (file && file.type.startsWith("image/")) {
      onFileChange(file);
    } else {
      alert("Por favor, selecciona un archivo de imagen válido.");
    }
  };

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];
    handleFileChange(file);
  };

  // Drag & Drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFileChange(file);
  };

  return (
    <>
      {!preview ? (
        <div
          className={`w-full max-w-[306px] flex flex-col items-center justify-center mt-4 text-[13px] text-black dark:text-white border-dashed ${
            dragActive ? "border-blue-500 bg-blue-100/20" : "border-gray-500"
          } border-2 rounded-lg p-6 gap-2 cursor-pointer transition`}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <Icon name="icon-add-img" className="w-12 h-12" />
          <div>
            <label
              htmlFor={id}
              className="font-medium underline rounded-md bg-gray-300 px-1 py-1 text-black cursor-pointer"
            >
              Upload a file
            </label>
            <span className="bg-transparent"> or drag and drop</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            name={id}
            id={id}
            className="hidden"
            accept="image/*"
            onChange={handleInputChange}
          />
          <span className="text-gray-400">PNG, JPG, WEBP up to 1MB</span>
        </div>
      ) : (
        <div className="relative mt-4 w-48 h-48">
          <img
            src={preview}
            alt="preview"
            className="w-full h-full object-cover rounded-lg border border-gray-300"
            onClick={() => showImage(preview)}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center gap-4 rounded-lg transition">
            <button
              title="Change image"
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-200"
            >
              <Icon name="icon-edit-img" className="light" />
            </button>
            <button
              title="Show image"
              type="button"
              onClick={() => showImage(preview)}
              className="bg-white p-2 rounded-full shadow hover:bg-gray-200"
            >
              <Icon name="icon-open-img" className="light" />
            </button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            name={id}
            id={id}
            className="hidden"
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>
      )}
    </>
  );
};

export default ImageUploader;