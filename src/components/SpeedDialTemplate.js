import React, { useState } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const SpeedDialTemplate = ({ 
  actions,
  mainButtonColor = 'bg-green-800 hover:bg-green-700',
  actionButtonColor = 'bg-green-700 hover:bg-green-600',
  direction = 'left',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Directions configuration
  const directionClasses = {
    left: 'items-end',
    right: 'items-start',
    up: 'items-center justify-end flex-col-reverse',
    down: 'items-center justify-start flex-col'
  };

  const actionPosition = {
    left: 'mr-2',
    right: 'ml-2',
    up: 'mb-2',
    down: 'mt-2'
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex ${directionClasses[direction]} ${className}`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`flex ${direction === 'left' || direction === 'right' ? 'flex-row' : 'flex-col'} gap-2 mb-2`}
          >
            {actions.map((action) => (
              <motion.button
                key={action.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  action.action();
                }}
                className={`${actionButtonColor} text-white p-3 rounded-full shadow-lg transition-all duration-200 ${actionPosition[direction]}`}
                aria-label={action.name}
              >
                {action.icon}
                <span className="sr-only">{action.name}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${mainButtonColor} text-white p-4 rounded-full shadow-lg transition-all duration-200`}
        aria-expanded={isOpen}
        aria-label="Actions menu"
      >
        <Cog6ToothIcon className="h-6 w-6" />
      </motion.button>
    </div>
  );
};

export default SpeedDialTemplate;