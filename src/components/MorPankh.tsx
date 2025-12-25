
import React from 'react';
import { motion } from 'framer-motion';

export const MorPankh = ({ className = "", style = {} }: { className?: string, style?: React.CSSProperties }) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={style}
      initial={{ rotate: -5, opacity: 0.8 }}
      animate={{ 
        rotate: 5, 
        opacity: [0.8, 1, 0.8] 
      }}
      transition={{ 
        rotate: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        },
        opacity: {
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      }}
    >
      <svg
        viewBox="0 0 200 400"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#1a237e" /> {/* Deep Blue */}
            <stop offset="40%" stopColor="#00bcd4" /> {/* Cyan */}
            <stop offset="70%" stopColor="#ffd700" /> {/* Gold */}
            <stop offset="100%" stopColor="#4caf50" /> {/* Green */}
          </radialGradient>
          <linearGradient id="stemGradient" x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="100%" stopColor="#aeea00" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Stem */}
        <path
          d="M100,400 Q100,200 100,20"
          stroke="url(#stemGradient)"
          strokeWidth="3"
          fill="none"
        />

        {/* Eye (The central colorful part) */}
        <g transform="translate(100, 80)">
          <ellipse cx="0" cy="0" rx="35" ry="50" fill="url(#eyeGradient)" filter="url(#glow)" />
          <ellipse cx="0" cy="15" rx="20" ry="30" fill="#1a237e" />
          <ellipse cx="0" cy="20" rx="10" ry="15" fill="#311b92" />
        </g>

        {/* Barbs (Green hairs) - Left Side */}
        <g stroke="#4caf50" strokeWidth="1" opacity="0.8">
           {[...Array(30)].map((_, i) => (
             <path 
               key={`l-${i}`} 
               d={`M100,${100 + i * 8} Q${50 - i * 1},${90 + i * 6} ${20 + i * 2},${80 + i * 5}`} 
             />
           ))}
        </g>

         {/* Barbs (Green hairs) - Right Side */}
        <g stroke="#4caf50" strokeWidth="1" opacity="0.8">
           {[...Array(30)].map((_, i) => (
             <path 
               key={`r-${i}`} 
               d={`M100,${100 + i * 8} Q${150 + i * 1},${90 + i * 6} ${180 - i * 2},${80 + i * 5}`} 
             />
           ))}
        </g>
        
        {/* Top tuft */}
        <g stroke="#8bc34a" strokeWidth="0.5" opacity="0.6">
             {[...Array(15)].map((_, i) => (
             <path 
               key={`t-${i}`} 
               d={`M100,20 Q${90 + i * 2},${5 + i} ${100 + (i-7)*10},${-10}`} 
             />
           ))}
        </g>

      </svg>
    </motion.div>
  );
};
