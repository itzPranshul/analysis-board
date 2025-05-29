import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown, Users, Sword } from 'lucide-react'; // for chessy icons!

function CommunityComponent() {
  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="bg-gradient-to-br from-indigo-800 to-purple-900 dark:from-gray-900 dark:to-gray-800 text-white p-10 rounded-3xl shadow-2xl"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-6 text-5xl">
          <Crown className="text-yellow-400" />
        </div>
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Welcome to Our Chess Community ♟️
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl leading-relaxed text-gray-200 dark:text-gray-300 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          This is more than a game room — it's your second home where strategies spark friendships. Whether you're an opening wizard or just vibing with pawns, you belong here.
        </motion.p>

        <motion.p
          className="text-lg sm:text-xl leading-relaxed text-gray-300 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          We host weekly events, late-night blitzes, meme battles, study groups, and deep dives into legendary matches.
        </motion.p>

        <motion.p
          className="text-lg sm:text-xl leading-relaxed text-gray-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          Chess sharpens your mind, boosts patience, builds focus — and yeah, it's wildly fun too. Why just scroll when you can make your move?
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link to="/SignUpPage">
            <button className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full hover:bg-yellow-500 transition text-lg shadow-md">
              🚀 Join Us Now
            </button>
          </Link>
          <div className="flex gap-4 mt-4 sm:mt-0 text-2xl text-indigo-300">
            <Sword className="hover:text-yellow-300 transition" />
            <Users className="hover:text-yellow-300 transition" />
            <Crown className="hover:text-yellow-300 transition" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CommunityComponent;
