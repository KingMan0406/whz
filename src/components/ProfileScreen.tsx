import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Mail, 
  Bell, 
  Moon, 
  LogOut, 
  Settings,
  Shield,
  HelpCircle,
  ChevronRight,
  Sun
} from 'lucide-react';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Avatar } from './ui/avatar';
import zwicklyLogo from 'figma:asset/2641cf5e0513a31b20e9f571fa0883960b74a220.png';

interface ProfileScreenProps {
  onLogout: () => void;
}

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const user = {
    name: 'Antman',
    email: 'antman@student.whz.de',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Antman',
    role: 'Student',
    studentId: '252035',
  };

  const menuItems = [
    {
      icon: Settings,
      label: 'Account Settings',
      action: () => {},
    },
    {
      icon: Shield,
      label: 'Privacy & Security',
      action: () => {},
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      action: () => {},
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7B5CFA]/5 to-[#48E0E4]/5 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7B5CFA] to-[#48E0E4] text-white p-6 pb-20 rounded-b-3xl shadow-lg">
        <h1 className="text-white mb-2">Profile</h1>
        <p className="text-sm opacity-90">Manage your account settings</p>
      </div>

      <div className="px-6 -mt-12">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-white shadow-lg p-6 mb-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4 ring-4 ring-white shadow-lg">
                <img src={user.avatar} alt={user.name} />
              </Avatar>
              
              <h2 className="text-gray-900 mb-1">{user.name}</h2>
              <p className="text-gray-600 mb-1">{user.email}</p>
              <p className="text-sm text-gray-500 mb-4">ID: {user.studentId}</p>
              
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#7B5CFA]/10 to-[#48E0E4]/10 text-[#7B5CFA]">
                <User className="w-4 h-4 mr-2" />
                <span className="text-sm">{user.role}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Settings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-gray-900 mb-3 px-1">Preferences</h3>
          
          <Card className="bg-white shadow-md mb-6">
            <div className="divide-y divide-gray-100">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B5CFA]/10 to-[#48E0E4]/10 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-[#7B5CFA]" />
                  </div>
                  <div>
                    <h4 className="text-gray-900">Push Notifications</h4>
                    <p className="text-sm text-gray-600">Receive updates and alerts</p>
                  </div>
                </div>
                <Switch
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B5CFA]/10 to-[#48E0E4]/10 flex items-center justify-center">
                    {darkMode ? (
                      <Moon className="w-5 h-5 text-[#7B5CFA]" />
                    ) : (
                      <Sun className="w-5 h-5 text-[#7B5CFA]" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-gray-900">Dark Mode</h4>
                    <p className="text-sm text-gray-600">Switch to dark theme</p>
                  </div>
                </div>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-gray-900 mb-3 px-1">General</h3>
          
          <Card className="bg-white shadow-md mb-6">
            <div className="divide-y divide-gray-100">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={item.action}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7B5CFA]/10 to-[#48E0E4]/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-[#7B5CFA]" />
                    </div>
                    <span className="text-gray-900">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 mb-6"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-6"
        >
          <img src={zwicklyLogo} alt="Zwickly" className="w-16 h-16 mx-auto mb-3 opacity-80" />
          <p className="text-sm text-gray-600 mb-2">Zwickly v1.0.0</p>
          <p className="text-xs text-gray-500 px-4 leading-relaxed">
            Von Studierenden. Für Studierende. Für alle.<br />
            Denn die beste Technologie bleibt menschlich.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
