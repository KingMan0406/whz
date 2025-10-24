import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageSquare, Home, Sparkles, ChevronLeft, ChevronRight, UtensilsCrossed, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface StudentDashboardProps {
  onNavigate: (screen: string) => void;
}

export default function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselItems = [
    {
      title: 'Mensa Menu',
      description: 'Free desserts today! 🍰',
      gradient: 'from-orange-400 to-pink-500',
      icon: UtensilsCrossed,
    },
    {
      title: 'Career Fair',
      description: 'Today at 5 PM in Main Hall',
      gradient: 'from-blue-400 to-purple-500',
      icon: Users,
    },
    {
      title: 'Campus News',
      description: 'New EV lab inaugurated',
      gradient: 'from-green-400 to-cyan-500',
      icon: Sparkles,
    },
  ];

  const quickActions = [
  { icon: Calendar, label: 'Timetable', screen: 'mensa-timetable' },
  { icon: Users, label: 'Social Wall', externalLink: 'https://app.slack.com/client/T09P1CYEF4G/C09N47EK70T' },
  { icon: MessageSquare, label: 'Ask Pixi', screen: 'pixi' },
  { icon: Home, label: 'My Space', screen: 'events' },
];


  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7B5CFA]/5 to-[#48E0E4]/5 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7B5CFA] to-[#48E0E4] text-white p-6 rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-sm opacity-90 mb-1">Good Morning,</p>
          <h1 className="text-white mb-2">Antman 👋</h1>
          <p className="text-sm opacity-90">Friday, October 24, 2025</p>
        </motion.div>
      </div>

      <div className="px-6 -mt-8">
        {/* Carousel */}
        <Card className="bg-white shadow-lg mb-6 overflow-hidden">
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
              >
                {carouselItems.map((item, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className={`bg-gradient-to-br ${item.gradient} p-6 text-white`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-white mb-2">{item.title}</h3>
                          <p className="text-sm opacity-90">{item.description}</p>
                        </div>
                        <item.icon className="w-8 h-8 opacity-80" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Controls */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-4 flex gap-1.5">
              {carouselItems.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    index === carouselIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="mb-4 text-gray-900">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.button
                key={action.label}
                onClick={() => {
  if (action.externalLink) {
    window.open(action.externalLink, '_blank');
  } else {
    onNavigate(action.screen);
  }
}}

                className="flex flex-col items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-shadow">
                  <action.icon className="w-7 h-7 text-[#7B5CFA]" />
                </div>
                <span className="text-xs text-gray-600 text-center">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900">Recent Updates</h3>
            <Badge variant="secondary" className="bg-[#7B5CFA]/10 text-[#7B5CFA]">
              3 New
            </Badge>
          </div>

          <div className="space-y-3">
            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('events')}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7B5CFA] to-[#48E0E4] flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">Tech Workshop Tomorrow</h4>
                  <p className="text-sm text-gray-600">
                    React & AI Development - 2:00 PM
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-700">New</Badge>
              </div>
            </Card>

<Card
  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
  onClick={() => window.open('https://app.slack.com/client/T09P1CYEF4G/C09N47EK70T', '_blank')}
>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">15 New Posts</h4>
                  <p className="text-sm text-gray-600">
                    Check out the latest from your community
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow" onClick={() => onNavigate('mensa-timetable')}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <UtensilsCrossed className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-gray-900 mb-1">Today's Special Menu</h4>
                  <p className="text-sm text-gray-600">
                    Vegetarian options available
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
