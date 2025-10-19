'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Letter {
  id: number;
  title: string;
  content: string;
  emoji: string;
  color: string;
  position: { x: number; y: number };
  rotation: number;
  duration: number;
  path: { x: number[]; y: number[] }; // Quỹ đạo riêng
}

export default function Message() {
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: ['💕', '💖', '💗', '💝', '🌸', '🌹', '✨', '💫', '🎀', '🌺'][i % 10],
      delay: i * 0.3,
      duration: 8 + Math.random() * 5,
      x: Math.random() * 100,
    }))
  );

  // Các lá thư với quỹ đạo và tốc độ riêng biệt - Tốc độ vừa phải
  const letters: Letter[] = [
    {
      id: 1,
      title: "Lá Thư Đầu Tiên 💌",
      emoji: "💌",
      color: "from-pink-400 to-rose-500",
      content: "Gửi đến em yêu của anh,\n\nTrong ngày đặc biệt này, anh muốn nói rằng em là điều tuyệt vời nhất đã đến với cuộc đời anh. Em là ánh sáng soi đường cho anh mỗi ngày.\n\nChúc em luôn xinh đẹp và hạnh phúc!\n\nYêu em! 💕",
      position: { x: 15, y: 20 },
      rotation: -8,
      duration: 13, // Vừa phải
      path: { x: [0, 35, -30, 38, -20, 0], y: [0, -50, -25, -55, -28, 0] },
    },
    {
      id: 2,
      title: "Gửi em 🌹",
      emoji: "🌹",
      color: "from-red-400 to-pink-500",
      content: "Gửi em chút lạc quan,\nkhông chờ ngày lấy lại.\nDù ngày mai ngang trái,\nmong em ít thở dài.💕",
      position: { x: 75, y: 25 },
      rotation: 12,
      duration: 16, // Chậm hơn
      path: { x: [0, -40, 28, -35, 32, 0], y: [0, -38, -52, -35, -48, 0] },
    },
    {
      id: 3,
      title: "Gửi em 💝",
      emoji: "💝",
      color: "from-purple-400 to-pink-500",
      content: "Nguyện cho em mỗi ngày đều giản đơn,\nNgẩng đầu lên đều là dịu dàng, ấm áp. 💖",
      position: { x: 40, y: 60 },
      rotation: -15,
      duration: 14, // Vừa
      path: { x: [0, 42, -28, 45, -22, 0], y: [0, -58, -32, -62, -35, 0] },
    },
    {
      id: 4,
      title: "Gửi em 🤝",
      emoji: "🤝",
      color: "from-indigo-400 to-purple-500",
      content: "Không chúc em giàu có\nChỉ chúc em bình yên.\nKhông chúc em lộng lẫy\nChỉ mong em không muộn phiền.",
      position: { x: 65, y: 65 },
      rotation: 10,
      duration: 17, // Chậm
      path: { x: [0, -48, 32, -42, 36, 0], y: [0, -42, -58, -38, -54, 0] },
    },
    {
      id: 5,
      title: "Lời Chúc 20/10 🎉",
      emoji: "🎉",
      color: "from-yellow-400 to-orange-500",
      content: "Chúc cho cô gái của anh có một ngày lễ 20/10 thật vui vẻ và hạnh phúc.\nChúc em luôn rạng rỡ như ánh mặt trời, xinh đẹp như hoa xuân nở.\n Chúc em mạnh khỏe, thành công và hạnh phúc.\n\nMãi mãi là công chúa của anh! 👑🌸",
      position: { x: 20, y: 75 },
      rotation: -5,
      duration: 15, // Vừa phải
      path: { x: [0, 38, -32, 40, -25, 0], y: [0, -52, -30, -56, -33, 0] },
    },
    {
      id: 6,
      title: "Gửi em 😍",
      emoji: "😍",
      color: "from-rose-400 to-red-500",
      content: "Anh yêu nụ cười của em,\nAnh yêu ánh mắt trong veo,\nAnh yêu giọng nói dịu dàng,\nAnh yêu trái tim nhân hậu.\n\nNói chung là... anh yêu tất cả về em! 💖💯",
      position: { x: 50, y: 35 },
      rotation: 8,
      duration: 14.5, // Vừa
      path: { x: [0, -45, 35, -48, 38, 0], y: [0, -45, -60, -42, -58, 0] },
    },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Animated floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute text-2xl md:text-3xl pointer-events-none"
          initial={{
            x: `${particle.x}vw`,
            y: '110vh',
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 1, 0],
            rotate: 360,
            x: `${particle.x + (Math.random() - 0.5) * 20}vw`,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {particle.emoji}
        </motion.div>
      ))}

      {/* Title */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="absolute top-4 md:top-8 left-0 right-0 z-30 text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold gradient-text dancing-script drop-shadow-lg">
          {selectedLetter === null ? 'Chúc mừng 20/10 em bé yêu' : letters.find(l => l.id === selectedLetter)?.title}
        </h1>
      </motion.div>

      {/* Floating Letters */}
      <AnimatePresence mode="wait">
        {selectedLetter === null ? (
          <motion.div
            key="letters-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full"
          >
            {letters.map((letter, index) => (
              <motion.div
                key={letter.id}
                className="absolute cursor-pointer"
                style={{
                  left: isMobile ? `${letter.position.x - 10}%` : `${letter.position.x}%`,
                  top: isMobile ? `${letter.position.y - 5}%` : `${letter.position.y}%`,
                }}
                initial={{
                  scale: 0,
                  rotate: letter.rotation,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: letter.path.y,
                  x: letter.path.x,
                  rotate: [
                    letter.rotation,
                    letter.rotation + 18,
                    letter.rotation - 18,
                    letter.rotation + 15,
                    letter.rotation - 12,
                    letter.rotation
                  ],
                }}
                transition={{
                  scale: {
                    delay: index * 0.15,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                  },
                  opacity: {
                    delay: index * 0.15,
                    duration: 0.6,
                  },
                  y: {
                    delay: index * 0.15 + 0.8,
                    duration: letter.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  x: {
                    delay: index * 0.15 + 0.8,
                    duration: letter.duration * 0.9,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                  rotate: {
                    delay: index * 0.15 + 0.8,
                    duration: letter.duration / 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                }}
                whileHover={{
                  scale: 1.25,
                  rotate: 0,
                  zIndex: 100,
                  y: -15,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedLetter(letter.id)}
              >
                {/* Envelope */}
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  {/* Envelope body */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${letter.color} rounded-lg shadow-2xl`}
                    style={{
                      clipPath: 'polygon(0% 0%, 100% 0%, 100% 70%, 50% 100%, 0% 70%)',
                    }}
                  >
                    {/* Envelope flap line */}
                    <div className="absolute top-0 left-0 right-0 h-[70%] border-b-2 border-white/30"
                      style={{ clipPath: 'polygon(0% 100%, 50% 70%, 100% 100%)' }}
                    />
                  </motion.div>

                  {/* Letter peeking out */}
                  <motion.div
                    className="absolute top-2 left-2 right-2 bg-white rounded-sm h-20 md:h-24 shadow-inner"
                    animate={{
                      y: [-2, 3, -2],
                      rotate: [-0.5, 0.5, -0.5],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="p-2 md:p-3 text-xs md:text-sm text-gray-400 leading-tight">
                      Emm em nè... 
                      <br />
                      Open em đi 🤷‍♂️
                    </div>
                  </motion.div>

                  {/* Emoji on envelope */}
                  <motion.div
                    className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl"
                    animate={{
                      scale: [1, 1.2, 1, 1.1, 1],
                      rotate: [0, -8, 8, -4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {letter.emoji}
                  </motion.div>

                  {/* Glow effect */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${letter.color} rounded-lg blur-xl opacity-50 -z-10`}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // Letter content view
          <motion.div
            key="letter-content"
            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="absolute inset-0 flex items-center justify-center p-4 z-40"
            onClick={() => setSelectedLetter(null)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Letter content card */}
            <motion.div
              className={`relative max-w-2xl w-full bg-gradient-to-br ${letters.find(l => l.id === selectedLetter)?.color} rounded-3xl shadow-2xl p-8 md:p-12 text-white`}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 50 }}
              animate={{ y: 0 }}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedLetter(null)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all"
              >
                <span className="text-2xl">✕</span>
              </button>

              {/* Emoji header */}
              <motion.div
                className="text-6xl md:text-7xl text-center mb-6"
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {letters.find(l => l.id === selectedLetter)?.emoji}
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center space-y-6"
              >
                <p className="text-lg md:text-xl leading-relaxed whitespace-pre-line dancing-script">
                  {letters.find(l => l.id === selectedLetter)?.content}
                </p>
              </motion.div>

              {/* Decorative hearts */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    className="text-2xl"
                    animate={{
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  >
                    💕
                  </motion.span>
                ))}
              </div>

              {/* Bottom decoration */}
              {/* <motion.div
                className="mt-8 text-center text-sm opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.6 }}
              >
                Click bên ngoài để đóng và xem các lá thư khác 💌
              </motion.div> */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
