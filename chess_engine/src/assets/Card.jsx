import { useState } from "react";

const Card = ({ title, description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-[100%] mx-auto my-4 bg-white rounded-2xl shadow-md border p-4 mr-[42%]" >
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-3xl font-semibold text-gray-700">{title}</h2>
        <span className="text-gray-700">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <p className="mt-3 text-gray-600 text-2xl">
          {description}
        </p>
      )}
    </div>
  );
};

export default Card;
