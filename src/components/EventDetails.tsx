import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, MapPin, Users, Clock, Share2, CalendarPlus, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface EventDetailsProps {
  eventId: number;
  onBack: () => void;
}

export default function EventDetails({ eventId, onBack }: EventDetailsProps) {
  const [isJoined, setIsJoined] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock event data
  const event = {
    id: eventId,
    title: 'React & AI Workshop',
    date: 'October 25, 2025',
    time: '2:00 PM - 5:00 PM',
    location: 'Lab Building, Room 301',
    attendees: 67,
    maxAttendees: 100,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    category: 'Workshop',
    language: 'English',
    organizer: 'Computer Science Department',
    description: `Join us for an exciting hands-on workshop where you'll learn how to build AI-powered applications using React and modern AI APIs.

What you'll learn:
• Integrating AI APIs into React applications
• Building conversational interfaces
• Best practices for AI-powered UX
• Real-world project examples

What to bring:
• Your laptop with Node.js installed
• Basic knowledge of React
• Enthusiasm to learn!

This workshop is perfect for students looking to combine web development with artificial intelligence. Limited seats available - register now!`,
  };

  const handleJoinEvent = () => {
    setIsJoined(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7B5CFA]/5 to-[#48E0E4]/5 pb-24">
      {/* Header Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-800" />
        </button>

        {/* Share Button */}
        <button
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <Share2 className="w-5 h-5 text-gray-800" />
        </button>

        {/* Category Badge */}
        <div className="absolute bottom-6 left-6">
          <Badge className="bg-[#7B5CFA] text-white">
            {event.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 -mt-8">
        <Card className="bg-white shadow-lg p-6 mb-6">
          <h1 className="text-gray-900 mb-4">{event.title}</h1>

          {/* Event Info */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#7B5CFA] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-900">{event.date}</p>
                <p className="text-sm text-gray-600">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-[#7B5CFA] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-900">{event.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-[#7B5CFA] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-900">
                  {event.attendees} / {event.maxAttendees} attendees
                </p>
                <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-full bg-[#7B5CFA] rounded-full"
                    style={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">Language</p>
              <p className="text-gray-900">{event.language}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Organizer</p>
              <p className="text-gray-900">{event.organizer}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-gray-900 mb-3">About this event</h3>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {event.description}
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="fixed bottom-20 left-0 right-0 p-6 bg-white border-t border-gray-200">
          <div className="max-w-md mx-auto flex gap-3">
            <Button
              variant="outline"
              className="flex-shrink-0"
            >
              <CalendarPlus className="w-4 h-4" />
            </Button>
            
            <Button
              onClick={handleJoinEvent}
              disabled={isJoined}
              className={`flex-1 ${
                isJoined
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-[#7B5CFA] hover:bg-[#6A4BE9]'
              }`}
            >
              {isJoined ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Joined
                </>
              ) : (
                'Join Event'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Success Toast */}
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50"
        >
          <Card className="bg-green-500 text-white px-6 py-3 shadow-lg flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span>Successfully joined the event! 🎉</span>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
