import { motion } from 'motion/react';
import zwicklyLogo from 'figma:asset/2641cf5e0513a31b20e9f571fa0883960b74a220.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#7B5CFA] via-[#9B7BFA] to-[#48E0E4] px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        src={zwicklyLogo}
        alt="Zwickly Logo"
        className="w-48 h-48 mb-8"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />
      
      <motion.h1
        className="text-white text-center mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Simplify Campus Life.<br />Amplify Engagement.
      </motion.h1>
      
      <motion.button
        onClick={onComplete}
        className="mt-12 bg-white text-[#7B5CFA] px-8 py-3 rounded-full shadow-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        whileTap={{ scale: 0.95 }}
      >
        Get Started
      </motion.button>
    </motion.div>
  );
}
