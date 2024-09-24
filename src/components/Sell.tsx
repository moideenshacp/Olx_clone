import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { uploadImage } from "../firebase/UploadImage";
import olx from "../assets/olx.png";
import {  useNavigate } from "react-router-dom";

const Sell: React.FC = () => {
  const { addProduct } = useProducts();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedPrice = price.trim();

    if (!trimmedTitle) {
      alert("Title is required.");
      return;
    }
    if (!trimmedDescription) {
      alert("Description is required.");
      return;
    }
    if (
      !trimmedPrice ||
      isNaN(parseFloat(trimmedPrice)) ||
      parseFloat(trimmedPrice) <= 0
    ) {
      alert("Please enter a valid price.");
      return;
    }
    if (!imageFile) {
      alert("Image is required.");
      return;
    }

    let imageUrlValue = "";
    if (imageFile) {
      try {
        imageUrlValue = await uploadImage(imageFile);
      } catch (error) {
        console.error("Image upload failed:", error);
        alert("Failed to upload image. Please try again.");
        return;
      }
    }

    const newProduct = {
      title: trimmedTitle,
      description: trimmedDescription,
      price: parseFloat(trimmedPrice),
      imageUrl: imageUrlValue,
    };

    try {
        await addProduct(newProduct);
        alert('Product added successfully.');
        navigate('/');
      } catch (error) {
        console.error("Failed to add product:", error);
        alert("Failed to add product. Please try again.");
      }

    setTitle("");
    setDescription("");
    setPrice("");
    setImageFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <h1 className="text-center text-2xl font-semibold mb-4 mt-6">
          POST YOUR AD
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
        >
          <div className="flex justify-center mb-4">
            <img src={olx} alt="Logo" className="w-18 h-16" />
          </div>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="file"
            onChange={handleFileChange}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            type="submit"
          >
            Sell
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sell;
