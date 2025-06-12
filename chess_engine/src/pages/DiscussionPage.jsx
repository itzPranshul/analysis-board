import React, { useState, useEffect } from "react";
import socket from "../socket";
import axios from "axios";

const DiscussionPage = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Lock scroll on mount
    document.body.style.overflow = "hidden";

    // Unlock scroll on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/chat/messages")
      .then((res) => setChat(res.data))
      .catch((err) => console.error("Failed to fetch messages:", err));
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("send_message", {
        sender: user?.name || "Anonymous",
        text: message,
      });
      setMessage("");
    }
  };

  return (
    <div className="w-full h-screen bg-gray-900 text-white flex justify-center items-center overflow-hidden">
      <div className="flex flex-col w-full max-w-4xl h-[90vh] bg-gray-900 p-4">
        <div className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
          💬 Group Discussion (please be nice in the chat 🙏🏻🙏🏻)
        </div>

        {/* Scrollable Chat Area */}
        <div className="flex-1 overflow-y-auto px-2 py-3 rounded-md bg-gray-800 shadow-inner flex flex-col gap-4">
          {chat.map((msg, idx) => {
            const isMe = msg.sender === user?.name;

            return (
              <div
                key={idx}
                className={`flex flex-col max-w-[75%] break-words ${
                  isMe ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <div className="text-sm text-gray-400">{msg.sender}</div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    isMe ? "bg-blue-600 text-white" : "bg-gray-700 text-white"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="mt-4 flex flex-col sm:flex-row gap-2 border-t border-gray-700 pt-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-gray-700 text-white border border-gray-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPage;
