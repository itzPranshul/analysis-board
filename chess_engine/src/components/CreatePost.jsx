import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ token, onPostCreated }) => {
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !photo) return alert('Add description and photo');

    setLoading(true);

    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);

    try {
      const res = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Post created!');
      setDescription('');
      setPhoto(null);
      onPostCreated(res.data.post);
    } catch (err) {
      alert('Error creating post');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-4 border rounded">
      <input 
        type="file" 
        accept="image/*" 
        onChange={handlePhotoChange} 
        required 
      />
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Posting...' : 'Create Post'}
      </button>
    </form>
  );
};

export default CreatePost;
