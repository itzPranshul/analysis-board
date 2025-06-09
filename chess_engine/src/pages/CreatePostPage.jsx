import React, { useState } from "react";
import axios from "axios";

const CreatePostPage = () => {
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description || !photo) {
      alert("Please fill all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);

    try {
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Post created successfully!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pt-24 text-white">
      <div className="w-full bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Create New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Write your thoughts..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-200"
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
