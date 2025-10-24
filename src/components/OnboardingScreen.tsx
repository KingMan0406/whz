import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Calendar, MessageCircle, Users } from 'lucide-react';
import { Button } from './ui/button';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides = [
  {
    icon: Calendar,
    title: 'One app for your campus life',
    description: 'Access your timetable, events, mensa menu, and campus news all in one place.',
  },
  {
    icon: MessageCircle,
    title: 'Ask Pixi anything',
    description: 'Your AI-powered campus assistant is here to help with schedules, locations, and more.',
  },
  {
    icon: Users,
    title: 'Stay connected. Stay updated.',
    description: 'Join the social wall, discover events, and connect with your campus community.',
  },
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[#7B5CFA]/10 to-[#48E0E4]/10">
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#7B5CFA] to-[#48E0E4] flex items-center justify-center mb-8">
              {(() => {
                const Icon = slides[currentSlide].icon;
                return <Icon className="w-12 h-12 text-white" />;
              })()}
            </div>
            
            <h2 className="mb-4 text-gray-900">
              {slides[currentSlide].title}
            </h2>
            
            <p className="text-gray-600 max-w-sm">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="pb-12 px-8">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-[#7B5CFA]'
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={skipOnboarding}
          >
            Skip
          </Button>
          <Button
            className="flex-1 bg-[#7B5CFA] hover:bg-[#6A4BE9]"
            onClick={nextSlide}
          >
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
