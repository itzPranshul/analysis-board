// CommunityList.jsx
import { useEffect, useState } from "react";

function CommunityList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("/api/community")
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {members.map((user) => (
        <div key={user._id} className="p-4 border rounded shadow">
          <img src={user.imageUrl} alt="profile" className="w-24 h-24 rounded-full" />
          <h3>{user.name}</h3>
          <a href={`https://www.chess.com/member/${user.chessUID}`} target="_blank">
            View Chess.com Profile
          </a>
        </div>
      ))}
    </div>
  );
}

export default CommunityList;
