'use client';

import { motion } from 'framer-motion';

export default function Message() {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto text-center px-4"
    >
      {/* Title */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-5xl md:text-7xl font-bold gradient-text dancing-script mb-4">
          Chúc Mừng Ngày 20/10
        </h1>
        <div className="text-5xl">💖🌹</div>
      </motion.div>

      {/* Main Message Card */}
      <motion.div
        variants={itemVariants}
        className="glass-effect rounded-3xl p-8 md:p-12 shadow-2xl mb-8 max-w-2xl mx-auto"
      >
        <p className="text-2xl md:text-3xl dancing-script text-gray-800 leading-relaxed mb-6">
          Gửi đến em yêu của anh 💕
        </p>

        <div className="space-y-6 text-lg md:text-xl text-gray-700">
          <p className="leading-relaxed">
            Trong ngày đặc biệt này, anh muốn gửi đến em những lời chúc tốt đẹp nhất.
            Em là ánh sáng trong cuộc đời anh, là niềm vui mỗi ngày, là động lực để anh cố gắng hơn.
          </p>
          
          <div className="text-4xl text-center my-6">
            💕 💖 💗 💝 🌸
          </div>

          <p className="leading-relaxed">
            Chúc em luôn xinh đẹp, rạng rỡ, và hạnh phúc. 
            Cảm ơn em đã luôn ở bên anh, cảm ơn em vì mọi khoảnh khắc tuyệt vời.
          </p>

          <p className="text-3xl md:text-4xl dancing-script gradient-text font-bold mt-8 text-center">
            Anh yêu em nhiều lắm! 💖🌹
          </p>
        </div>
      </motion.div>

      {/* Additional cute message */}
      <motion.div
        variants={itemVariants}
        className="glass-effect rounded-2xl p-6 shadow-xl max-w-2xl mx-auto"
      >
        <p className="text-xl md:text-2xl dancing-script text-gray-800">
          P/S: Em là người phụ nữ tuyệt vời nhất mà anh từng gặp 🌹✨
        </p>
      </motion.div>
    </motion.div>
  );
}

