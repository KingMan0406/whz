import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Bell, 
  CheckCircle2, 
  Calendar, 
  MessageSquare, 
  Users, 
  AlertCircle,
  Trash2
} from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  type: 'success' | 'info' | 'reminder' | 'message';
  isRead: boolean;
  icon: typeof CheckCircle2;
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'New event approved',
      message: 'Your event "React Workshop" has been approved and is now live! 🎉',
      timestamp: '5 minutes ago',
      type: 'success',
      isRead: false,
      icon: CheckCircle2,
    },
    {
      id: 2,
      title: 'Survey Request',
      message: 'Please rate your experience with the Web Development course',
      timestamp: '1 hour ago',
      type: 'info',
      isRead: false,
      icon: MessageSquare,
    },
    {
      id: 3,
      title: 'Exam Reminder',
      message: 'Data Structures exam tomorrow at 10:00 AM in Room 204',
      timestamp: '2 hours ago',
      type: 'reminder',
      isRead: false,
      icon: AlertCircle,
    },
    {
      id: 4,
      title: 'Event Starting Soon',
      message: 'Career Fair starts in 30 minutes at Main Hall',
      timestamp: '3 hours ago',
      type: 'reminder',
      isRead: true,
      icon: Calendar,
    },
    {
      id: 5,
      title: 'New Social Post',
      message: 'Sarah Chen mentioned you in a post on the Social Wall',
      timestamp: '5 hours ago',
      type: 'message',
      isRead: true,
      icon: Users,
    },
    {
      id: 6,
      title: 'Mensa Menu Updated',
      message: "Today's special: Free desserts with any main course! 🍰",
      timestamp: '1 day ago',
      type: 'info',
      isRead: true,
      icon: CheckCircle2,
    },
  ]);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'from-green-400 to-green-500';
      case 'info':
        return 'from-blue-400 to-blue-500';
      case 'reminder':
        return 'from-orange-400 to-orange-500';
      case 'message':
        return 'from-purple-400 to-purple-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7B5CFA]/5 to-[#48E0E4]/5 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7B5CFA] to-[#48E0E4] text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-white">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="bg-white/20 text-white">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <p className="text-sm opacity-90">Stay updated with campus activities</p>
      </div>

      <div className="px-6 -mt-4">
        {/* Mark All as Read */}
        {unreadCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white shadow-md p-4 mb-6">
              <Button
                variant="outline"
                size="sm"
                onClick={markAllAsRead}
                className="w-full"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark all as read
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-gray-900 mb-2">No notifications</h3>
              <p className="text-gray-600">
                You're all caught up! We'll notify you when something new happens.
              </p>
            </Card>
          ) : (
            notifications.map((notification, index) => {
              const Icon = notification.icon;
              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card
                    className={`overflow-hidden cursor-pointer transition-all ${
                      notification.isRead
                        ? 'opacity-60 hover:opacity-80'
                        : 'shadow-md hover:shadow-lg'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-0">
                      {/* Color Indicator */}
                      <div className={`w-1 h-full bg-gradient-to-b ${getTypeColor(notification.type)} flex-shrink-0`} />

                      <div className="flex-1 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-3 flex-1">
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getTypeColor(notification.type)} flex items-center justify-center flex-shrink-0`}>
                              <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-gray-900">{notification.title}</h4>
                                {!notification.isRead && (
                                  <div className="w-2 h-2 rounded-full bg-[#7B5CFA]" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500">
                                {notification.timestamp}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
