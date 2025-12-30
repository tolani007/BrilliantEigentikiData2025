import React from 'react';
import { motion } from 'framer-motion';

interface CelebrationProps {
  message: string;
  onComplete?: () => void;
}

const Celebration: React.FC<CelebrationProps> = ({ message, onComplete }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 0.5, repeat: 2 }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        {onComplete && (
          <button
            onClick={onComplete}
            className="px-6 py-3 bg-brilliant-blue text-white rounded-lg font-semibold hover:bg-brilliant-darkBlue transition-colors"
          >
            Continue
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default Celebration;


