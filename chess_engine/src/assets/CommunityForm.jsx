// CommunityForm.jsx
import { useState } from "react";

function CommunityForm() {
  const [formData, setFormData] = useState({
    name: "",
    chessUID: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("chessUID", formData.chessUID);
    data.append("image", formData.image);

    const res = await fetch("http://localhost:5000/api/community", {
      method: "POST",
      body: data,
    });

    if (res.ok) alert("Profile submitted!");
  };

  return (
    <form className='mt-5'onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} />
      <input name="chessUID" placeholder="Chess.com UID" onChange={handleChange} />
      <input type="file" name="image" accept="image/*" onChange={handleChange} />

      <button type="submit">Submit</button>


    </form>
  );
}

export default CommunityForm;
