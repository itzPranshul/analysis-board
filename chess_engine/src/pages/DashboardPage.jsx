import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardPage = () => {
  const [data, setData] = useState({ message: "", name: "", email: "" });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCommentsForPostId, setOpenCommentsForPostId] = useState(null);
  const [newComments, setNewComments] = useState({}); // To track comment input per post

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/protected", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
        setData({ message: "Access denied. Please login.", name: "", email: "" });
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProtected();
    fetchPosts();
  }, []);

  const toggleComments = (postId) => {
    setOpenCommentsForPostId((prev) => (prev === postId ? null : postId));
  };

  const handleCommentChange = (postId, value) => {
    setNewComments((prev) => ({ ...prev, [postId]: value }));
  };

  const submitComment = async (postId) => {
    const text = newComments[postId];
    if (!text || text.trim() === "") return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comments`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Update posts state with new comment
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            comments: [...post.comments, res.data.post.comments.slice(-1)[0]], // add latest comment returned by backend
          };
        }
        return post;
      });

      setPosts(updatedPosts);
      setNewComments((prev) => ({ ...prev, [postId]: "" })); // clear input
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 pt-20 text-white">
      {/* User info */}
      {data.name && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold">Welcome, {data.name}</h2>
          <p>{data.email}</p>
        </div>
      )}

    

      {/* Posts */}
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="mb-8 p-4 border rounded shadow-sm bg-white"
          >
            {/* Post photo */}
            {post.photoUrl && (
              <img
                src={`http://localhost:5000${post.photoUrl}`}
                alt="Post"
                className="w-full max-h-120 object-cover mb-2 rounded"
              />
            )}

            {/* Post description */}
            <p className="mb-2">{post.description}</p>

            {/* Comments toggle */}
            <button
              onClick={() => toggleComments(post._id)}
              className="text-blue-600  mb-2"
            >
              {openCommentsForPostId === post._id ? "Hide Comments" : "Show Comments"}
            </button>

            {/* Comments list + new comment input */}
            {openCommentsForPostId === post._id && (
              <div className="border-t pt-2 max-h-48 overflow-y-auto">
                {post.comments.length === 0 ? (
                  <p>No comments yet.</p>
                ) : (
                  post.comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="mb-2 p-2 bg-gray-100 rounded"
                    >
                      <strong>{comment.commentedBy?.name || "Unknown"}</strong>: {comment.text}
                    </div>
                  ))
                )}

                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={newComments[post._id] || ""}
                    onChange={(e) => handleCommentChange(post._id, e.target.value)}
                    className="border rounded px-2 py-1 flex-grow"
                  />
                  <button
                    onClick={() => submitComment(post._id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Comment
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DashboardPage;
