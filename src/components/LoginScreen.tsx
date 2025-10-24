import { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, UserCog, Bot, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import zwicklyLogo from 'figma:asset/2641cf5e0513a31b20e9f571fa0883960b74a220.png';

interface LoginScreenProps {
  onLogin: (role: 'student' | 'admin' | 'pixi') => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setShowRoleSelection(true);
    }
  };

  const roles = [
    {
      id: 'student' as const,
      icon: GraduationCap,
      title: 'Student',
      description: 'Access your campus life',
    },
    {
      id: 'admin' as const,
      icon: UserCog,
      title: 'Admin',
      description: 'Manage campus content',
    },
    {
      id: 'pixi' as const,
      icon: Bot,
      title: 'Pixi',
      description: 'AI Assistant Mode',
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[#7B5CFA]/5 to-[#48E0E4]/5 px-6 py-12">
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.img
          src={zwicklyLogo}
          alt="Zwickly"
          className="w-32 h-32 mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />

        <h1 className="text-gray-900 mb-2 text-center">Welcome to Zwickly</h1>
        <p className="text-gray-600 mb-8 text-center">
          Von Studierenden. Für Studierende. Für alle.
        </p>

        {!showRoleSelection ? (
          <motion.form
            onSubmit={handleEmailSubmit}
            className="w-full max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="mb-4">
              <Input
                type="email"
                placeholder="university@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#7B5CFA] hover:bg-[#6A4BE9] mb-4"
            >
              <Mail className="mr-2 w-4 h-4" />
              Continue with Email
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleEmailSubmit}
            >
              <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
          </motion.form>
        ) : (
          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="mb-6 text-center text-gray-900">Select Your Role</h3>
            <div className="space-y-4">
              {roles.map((role) => (
                <Card
                  key={role.id}
                  className="p-4 cursor-pointer hover:border-[#7B5CFA] hover:shadow-md transition-all"
                  onClick={() => onLogin(role.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7B5CFA] to-[#48E0E4] flex items-center justify-center">
                      <role.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-gray-900">{role.title}</h4>
                      <p className="text-sm text-gray-600">{role.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <p className="text-xs text-center text-gray-500 mt-8">
        Denn die beste Technologie bleibt menschlich.
      </p>
    </div>
  );
}
