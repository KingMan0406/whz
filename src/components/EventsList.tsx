import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, Users, Clock, Filter } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
  category: string;
  isJoined: boolean;
}

interface EventsListProps {
  onSelectEvent: (eventId: number) => void;
}

export default function EventsList({ onSelectEvent }: EventsListProps) {
  const [filter, setFilter] = useState<'all' | 'joined' | 'upcoming' | 'past'>('all');
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'Career Fair 2025',
      date: 'Oct 24, 2025',
      time: '5:00 PM',
      location: 'Main Hall',
      attendees: 145,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop',
      category: 'Career',
      isJoined: false,
    },
    {
      id: 2,
      title: 'React & AI Workshop',
      date: 'Oct 25, 2025',
      time: '2:00 PM',
      location: 'Lab Building, Room 301',
      attendees: 67,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
      category: 'Workshop',
      isJoined: true,
    },
    {
      id: 3,
      title: 'Campus Music Festival',
      date: 'Oct 28, 2025',
      time: '6:00 PM',
      location: 'Outdoor Stadium',
      attendees: 523,
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=200&fit=crop',
      category: 'Social',
      isJoined: false,
    },
    {
      id: 4,
      title: 'Startup Pitch Competition',
      date: 'Oct 30, 2025',
      time: '10:00 AM',
      location: 'Innovation Hub',
      attendees: 89,
      image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop',
      category: 'Competition',
      isJoined: false,
    },
    {
      id: 5,
      title: 'Sustainability Seminar',
      date: 'Nov 2, 2025',
      time: '3:00 PM',
      location: 'Conference Room A',
      attendees: 42,
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=200&fit=crop',
      category: 'Seminar',
      isJoined: true,
    },
  ]);

  const filters = [
    { id: 'all' as const, label: 'All' },
    { id: 'joined' as const, label: 'Joined' },
    { id: 'upcoming' as const, label: 'Upcoming' },
    { id: 'past' as const, label: 'Past' },
  ];

  const filteredEvents = events.filter((event) => {
    if (filter === 'joined') return event.isJoined;
    if (filter === 'upcoming') return !event.isJoined;
    // For 'all' and 'past', show all events (in a real app, past would filter by date)
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7B5CFA]/5 to-[#48E0E4]/5 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7B5CFA] to-[#48E0E4] text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <h1 className="text-white mb-2">Campus Events</h1>
        <p className="text-sm opacity-90">Discover and join exciting events</p>
      </div>

      <div className="px-6 -mt-4">
        {/* Filters */}
        <Card className="bg-white shadow-md p-4 mb-6">
          <div className="flex items-center gap-2 overflow-x-auto">
            <Filter className="w-4 h-4 text-gray-600 flex-shrink-0" />
            {filters.map((f) => (
              <Button
                key={f.id}
                variant={filter === f.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(f.id)}
                className={filter === f.id ? 'bg-[#7B5CFA] hover:bg-[#6A4BE9]' : ''}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </Card>

        {/* Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => onSelectEvent(event.id)}
              >
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-gray-800">
                      {event.category}
                    </Badge>
                  </div>
                  {event.isJoined && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-green-500 text-white">
                        Joined
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-gray-900 mb-3">{event.title}</h3>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#7B5CFA]" />
                      <span>{event.date}</span>
                      <Clock className="w-4 h-4 text-[#7B5CFA] ml-2" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#7B5CFA]" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#7B5CFA]" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4 bg-[#7B5CFA] hover:bg-[#6A4BE9]"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEvent(event.id);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
