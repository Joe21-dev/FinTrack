import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  onClick,
  hoverable = false,
  icon
}) => {
  return (
    <motion.div
      className={`card ${className} ${hoverable ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      whileHover={hoverable ? { y: -5 } : {}}
      transition={{ duration: 0.2 }}
    >
      {(title || icon) && (
        <div className="flex justify-between items-center mb-4">
          <div>
            {title && <h2 className="text-subtitle font-semibold">{title}</h2>}
            {subtitle && <p className="text-small text-text-secondary dark:text-gray-400">{subtitle}</p>}
          </div>
          {icon && <div className="text-primary-500">{icon}</div>}
        </div>
      )}
      {children}
    </motion.div>
  );
};

export default Card;