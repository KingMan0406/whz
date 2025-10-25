import { useState } from 'react';
import { motion } from 'motion/react';
import { UtensilsCrossed, Calendar, Clock, MapPin, Leaf, Wheat, Fish } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

export default function MensaTimetable() {
  const [selectedDay, setSelectedDay] = useState('friday');

  const mensaMenu = [
    {
      id: 1,
      dish: 'Pasta Zwickau',
      price: 'S: 2,30 € / M: 5,30 € / G: 6,60 €',
      allergens: ['Wheat', 'Celery'],
      type: 'Vegetarian',
      icon: Leaf,
    },
    {
      id: 2,
      dish: 'Campusteller Zwickau',
      price: 'S: 4,40 € / M: 6,90 € / G: 8,50 €',
      allergens: ['Wheat', 'Eggs'],
      type: 'Meat',
      icon: UtensilsCrossed,
    },
    {
      id: 3,
      dish: 'Heiße Theke Zwickau',
      price: 'S: 3,90 € / M: 6,30 € / G: 7,60 €',
      allergens: ['Fish'],
      type: 'Fish',
      icon: Fish,
    },
    {
      id: 4,
      dish: 'Vegan Buddha Bowl',
      price: '€5.20',
      allergens: ['Sesame', 'Soy'],
      type: 'Vegan',
      icon: Leaf,
    },
  ];

  const timetable = [
    {
      id: 1,
      subject: 'Computer Networks',
      time: ',9:15 - 10:45 AM',
      room: ',305 (Main Building)',
      professor: ',Prof. Fischer, T.',
      type: 'Lecture',
    },
    {
      id: 2,
      subject: 'Database Systems,',
      time: '11:00 AM - 12:30 PM',
      room: '201 (Main Building)',
      professor: ',Prof. Weber, A.',
      type: 'Lab',
    },
    {
      id: 3,
      subject: 'PTI90220 Advanced Computer Graphics,',
      time: '11:20 - 12:50 PM',
      room: 'Graphics,GAB216',
      professor: 'Prof. Hellbach Dr. Baum,',
      type: 'Lecture',
    },
    {
      id: 4,
      subject: 'WIW64000 Business Information Systems Gr 2,',
      time: '7:30 - 10:50 AM',
      room: 'S6103',
      professor: 'Prof. Schumann,C.-A.,',
      type: 'Lab',
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Lecture':
        return 'bg-blue-100 text-blue-700';
      case 'Lab':
        return 'bg-purple-100 text-purple-700';
      case 'Workshop':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getDietIcon = (type: string) => {
    switch (type) {
      case 'Vegetarian':
      case 'Vegan':
        return Leaf;
      case 'Fish':
        return Fish;
      default:
        return UtensilsCrossed;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7B5CFA]/5 to-[#48E0E4]/5 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7B5CFA] to-[#48E0E4] text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <h1 className="text-white mb-2">Mensa & Schedule</h1>
        <p className="text-sm opacity-90">Your daily campus essentials</p>
      </div>

      <div className="px-6 -mt-4">
        <Tabs defaultValue="mensa" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white shadow-md mb-6">
            <TabsTrigger value="mensa">Mensa Menu</TabsTrigger>
            <TabsTrigger value="timetable">Timetable</TabsTrigger>
          </TabsList>

          <TabsContent value="mensa" className="space-y-4">
            {/* Special Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-gradient-to-r from-orange-400 to-pink-500 text-white p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white mb-1">Special Offer!</h3>
                    <p className="text-sm opacity-90">Free desserts today! 🍰</p>
                  </div>
                  <UtensilsCrossed className="w-10 h-10 opacity-80" />
                </div>
              </Card>
            </motion.div>

            {/* Menu Items */}
            {mensaMenu.map((item, index) => {
              const Icon = getDietIcon(item.type);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-4 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">{item.dish}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-gray-600">{item.type}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="text-[#7B5CFA]">{item.price}</p>
                      </div>
                    </div>

                    {item.allergens.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.allergens.map((allergen) => (
                          <Badge
                            key={allergen}
                            variant="outline"
                            className="text-xs"
                          >
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}

            {/* Mensa Info */}
            <Card className="p-4 bg-gray-50">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-4 h-4 text-[#7B5CFA]" />
                  <span>Open: 11:30 AM - 3:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-[#7B5CFA]" />
                  <span>Main Building, Ground Floor</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="timetable" className="space-y-4">
            {/* Day Selector */}
            <Card className="p-4 mb-4 bg-white shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-[#7B5CFA]" />
                <h3 className="text-gray-900">Friday, October 24, 2025</h3>
              </div>
              <p className="text-sm text-gray-600">4 classes scheduled</p>
            </Card>

            {/* Classes */}
            {timetable.map((classItem, index) => (
              <motion.div
                key={classItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="text-gray-900 mb-1">{classItem.subject}</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {classItem.professor}
                      </p>
                    </div>
                    <Badge className={getTypeColor(classItem.type)}>
                      {classItem.type}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#7B5CFA]" />
                      <span>{classItem.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#7B5CFA]" />
                      <span>{classItem.room}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
