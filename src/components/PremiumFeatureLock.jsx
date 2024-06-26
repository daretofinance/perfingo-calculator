import React from 'react';
import { Lock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const PremiumFeatureLock = ({ featureDescription}) => {
  const redirectToPerfingo = () => {
    window.open('https://www.perfingo.com/create-account', '_blank');
  }
  return (
    <motion.div 
      className="text-center py-12 px-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Lock className="mx-auto text-indigo-500 mb-6" size={64} />
      </motion.div>
      <h3 className="text-2xl font-bold text-gray-800 mb-3">Premium Feature</h3>
      <p className="text-gray-600 mb-6">{featureDescription}</p>
      <motion.button
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        onClick={redirectToPerfingo}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Sparkles className="mr-2" size={20} />
        Unlock Premium
      </motion.button>
      <p className="mt-4 text-sm text-gray-500">Unlock all premium features and get more insights!</p>
    </motion.div>
  );
};

export default PremiumFeatureLock;