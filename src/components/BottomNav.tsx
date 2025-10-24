import { Home, Calendar, Users, MessageSquare, User, Bell } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  notificationCount?: number;
}

export default function BottomNav({ currentScreen, onNavigate, notificationCount = 0 }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'events', icon: Calendar, label: 'Events' },
    { id: 'social', icon: Users, label: 'Social' },
    { id: 'pixi', icon: MessageSquare, label: 'Pixi' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative flex flex-col items-center gap-1 px-4 py-1"
              >
                <div className="relative">
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive ? 'text-[#7B5CFA]' : 'text-gray-400'
                    }`}
                  />
                  
                  {item.id === 'profile' && notificationCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-xs text-white">{notificationCount}</span>
                    </motion.div>
                  )}
                </div>
                
                <span
                  className={`text-xs transition-colors ${
                    isActive ? 'text-[#7B5CFA]' : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </span>

                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-[#7B5CFA] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
