// ProfileCard.js
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

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {users.map((user) => (
        <div key={user._id} className="bg-white shadow-lg rounded-2xl w-64 h-64 flex flex-col items-center justify-center p-4">
          <img
            src={user.imageUrl}
            alt={user.name}
            className="w-24 h-24 rounded-full object-cover mb-3"
          />
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">UID: {user.chessUID}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileCard;
