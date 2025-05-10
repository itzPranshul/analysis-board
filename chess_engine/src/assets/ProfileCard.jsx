import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileCard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/profiles/${id}`);
      setUsers(users.filter(user => user._id !== id));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {users.map((user) => (
        <div
          key={user._id}
          className="bg-white shadow-lg rounded-2xl w-50 h-50 flex flex-col items-center justify-center p-4 cursor-pointer transition-transform hover:scale-105"
          onClick={() => handleDelete(user._id)}
          title="Click to delete"
        >
          <img
            src={user.imageUrl}
            alt={user.name}
            className="w-30 h-30 rounded-full object-cover mb-3"
          />
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">UID: {user.chessUID}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileCard;
