import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion as Motion } from "framer-motion"; // Renamed for ESLint compliance

const HomeComponent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCommentsForPostId, setOpenCommentsForPostId] = useState(null);
  const [newComments, setNewComments] = useState({});

  useEffect(() => {
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

      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            comments: [...post.comments, res.data.post.comments.slice(-1)[0]],
          };
        }
        return post;
      });

      setPosts(updatedPosts);
      setNewComments((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <Motion.div
      className="max-w-3xl mx-auto p-4 pt-20"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl text-white font-bold mb-6 text-center">Welcome to ChessPlay 🙏🏻🙏🏻</h1>
      <p className="text-center text-white mb-10">Your ultimate chess journey starts here. 🎯 </p>
      <p className="text-center text-white mb-10">Feel free to share any chess-related content here.</p>

      {posts.length === 0 ? (
        <p className="text-center">No posts yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="mb-8 p-4 border rounded shadow-sm bg-white"
          >
            {post.photoUrl && (
              <img
                src={`http://localhost:5000${post.photoUrl}`}
                alt="Post"
                className="w-full max-h-120 object-cover mb-2 rounded"
              />
            )}

            <p className="mb-2">{post.description}</p>

            <button
              onClick={() => toggleComments(post._id)}
              className="text-blue-600 mb-2"
            >
              {openCommentsForPostId === post._id ? "Hide Comments" : "Show Comments"}
            </button>

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
    </Motion.div>
  );
};

export default HomeComponent;
