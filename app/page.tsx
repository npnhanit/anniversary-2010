'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import Message from './components/Message';

export default function Home() {
  const [heartLevel, setHeartLevel] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const maxClicks = 10;

  const messages = [
    "Click để bơm đầy tình yêu vào trái tim! 💝",
    "Đã đã! Tiếp tục nha em! 🥰",
    "Em đang làm đúng gòi! 💕",
    "Trái tim đang ấm lên rồi! 🌸",
    "Yêu emmmm! 💗",
    "Cố lên, cố lên sắp tới gòi! 💖",
    "Đã đã! 🌹",
    "Gần xong rồi! ✨",
    "Ấm áp quá! 💫",
    "Tuyệt quá em ơi! 💌"
  ];

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleHeartClick = () => {
    if (heartLevel < maxClicks) {
      const newLevel = heartLevel + 1;
      setHeartLevel(newLevel);
      
      if (newLevel === maxClicks) {
        // Full heart - show message
        setTimeout(() => {
          setShowConfetti(true);
          setShowMessage(true);
        }, 800);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  };

  const heartPercentage = (heartLevel / maxClicks) * 100;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-rose-200">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          colors={['#ff6b9d', '#c44569', '#9b59b6', '#ff1744', '#e91e63']}
          numberOfPieces={200}
          recycle={false}
        />
      )}

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <AnimatePresence mode="wait">
          {!showMessage ? (
            <motion.div
              key="heart"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              {/* Heart Container */}
              <div className="relative flex flex-col items-center space-y-8">
                {/* Empty Heart Outline */}
                <div className="relative w-72 h-72 md:w-96 md:h-96 mb-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl" style={{ overflow: 'visible' }}>
                    <defs>
                      <clipPath id="heartClip">
                        <path d="M50,90 C50,90 10,60 10,35 C10,20 20,10 32.5,10 C40,10 45,15 50,22 C55,15 60,10 67.5,10 C80,10 90,20 90,35 C90,60 50,90 50,90 Z" />
                      </clipPath>
                      <linearGradient id="heartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#ff1744" />
                        <stop offset="50%" stopColor="#f06292" />
                        <stop offset="100%" stopColor="#ff6b9d" />
                      </linearGradient>
                    </defs>
                    
                    {/* Background (empty) heart */}
                    <path
                      d="M50,90 C50,90 10,60 10,35 C10,20 20,10 32.5,10 C40,10 45,15 50,22 C55,15 60,10 67.5,10 C80,10 90,20 90,35 C90,60 50,90 50,90 Z"
                      fill="#ffc0cb"
                      opacity="0.3"
                      stroke="#ff69b4"
                      strokeWidth="2"
                    />
                    
                    {/* Filled heart (grows with clicks) - using rect with clip */}
                    <g clipPath="url(#heartClip)">
                      <motion.rect
                        x="0"
                        y="0"
                        width="100"
                        height="100"
                        fill="url(#heartGradient)"
                        initial={false}
                        animate={{ 
                          y: 100 - heartPercentage,
                          height: heartPercentage 
                        }}
                        transition={{ 
                          type: "spring",
                          stiffness: 100,
                          damping: 15
                        }}
                      />
                    </g>
                  </svg>
                  
                  {/* Glow effect when filling */}
                  {heartLevel > 0 && (
                    <motion.div
                      className="absolute inset-0 -z-10"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0.4, 0.7, 0.4],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      style={{
                        filter: 'blur(40px)',
                        background: 'radial-gradient(circle, rgba(255,107,157,0.8) 0%, rgba(244,63,94,0.6) 50%, transparent 70%)',
                      }}
                    />
                  )}
                </div>

                {/* Click Button */}
                <motion.button
                  onClick={handleHeartClick}
                  disabled={heartLevel >= maxClicks}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  animate={heartLevel < maxClicks ? {
                    scale: [1, 1.02, 1],
                  } : {}}
                  transition={{
                    scale: {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="px-10 py-5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white text-2xl font-semibold rounded-full shadow-2xl hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {heartLevel < maxClicks ? (
                    <> Nút bơm 💕 nè</>
                  ) : (
                    <>💖 Đầy tràn yêu thương!</>
                  )}
                </motion.button>

                {/* Instructions */}
                <motion.div
                  key={heartLevel}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  className="text-xl md:text-2xl dancing-script gradient-text font-semibold px-4 text-center"
                >
                  {messages[heartLevel]}
                </motion.div>
              </div>

              {/* Click effect particles */}
              <AnimatePresence mode="wait">
                {heartLevel > 0 && heartLevel <= maxClicks && (
                  <motion.div
                    key={`particles-${heartLevel}`}
                    className="absolute inset-0 pointer-events-none flex items-center justify-center"
                  >
                    {[...Array(8)].map((_, i) => {
                      const angle = (i / 8) * Math.PI * 2;
                      const distance = 150;
                      return (
                        <motion.div
                          key={`particle-${heartLevel}-${i}`}
                          className="absolute text-3xl"
                          initial={{
                            x: 0,
                            y: 0,
                            scale: 0,
                            opacity: 1,
                          }}
                          animate={{
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            scale: [0, 1.2, 0],
                            opacity: [1, 1, 0],
                            rotate: [0, 360],
                          }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                          }}
                        >
                          {['💕', '💖', '💗', '💝', '🌸', '✨', '💫', '🌹'][i]}
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <Message />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

