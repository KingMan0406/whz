import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Button } from './ui/button';

interface Post {
  id: number;
  author: string;
  avatar: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

export default function SocialWall() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      timestamp: '2 hours ago',
      content: 'Just finished an amazing React workshop! 🚀 Can\'t wait to build my first AI-powered app. Thanks to everyone who participated!',
      likes: 24,
      comments: 5,
      isLiked: false,
    },
    {
      id: 2,
      author: 'Marcus Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      timestamp: '4 hours ago',
      content: 'Does anyone know if the library study rooms are available this weekend? Need a quiet place for finals prep 📚',
      likes: 12,
      comments: 8,
      isLiked: true,
    },
    {
      id: 3,
      author: 'Lisa Weber',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      timestamp: '6 hours ago',
      content: 'The Mensa vegetarian curry today is amazing! Highly recommend 🍛 Also free desserts until 3 PM!',
      likes: 45,
      comments: 12,
      isLiked: false,
    },
    {
      id: 4,
      author: 'David Kim',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      timestamp: '1 day ago',
      content: 'Looking for teammates for the Startup Pitch Competition! We\'re building an eco-friendly campus solution. DM me if interested! 🌱',
      likes: 31,
      comments: 15,
      isLiked: true,
    },
    {
      id: 5,
      author: 'Emma Schmidt',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      timestamp: '1 day ago',
      content: 'PSA: The Career Fair starts at 5 PM today in Main Hall. Don\'t miss it! Lots of great companies attending. Good luck everyone! 💼',
      likes: 67,
      comments: 9,
      isLiked: false,
    },
  ]);

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7B5CFA]/5 to-[#48E0E4]/5 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7B5CFA] to-[#48E0E4] text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <h1 className="text-white mb-2">Social Wall</h1>
        <p className="text-sm opacity-90">Connect with your campus community</p>
      </div>

      <div className="px-6 -mt-4">
        {/* Create Post Card */}
        <Card className="bg-white shadow-md p-4 mb-6 cursor-pointer hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-gradient-to-br from-[#7B5CFA] to-[#48E0E4]">
              <span className="text-white">A</span>
            </Avatar>
            <div className="flex-1 text-gray-500">
              What's on your mind, Antman?
            </div>
            <Button size="sm" className="bg-[#7B5CFA] hover:bg-[#6A4BE9]">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white shadow-md overflow-hidden">
                {/* Post Header */}
                <div className="p-4 pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <img src={post.avatar} alt={post.author} />
                      </Avatar>
                      <div>
                        <h4 className="text-gray-900">{post.author}</h4>
                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-700 leading-relaxed">{post.content}</p>
                </div>

                {/* Post Actions */}
                <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-2 transition-colors ${
                        post.isLiked
                          ? 'text-red-500'
                          : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart
                        className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`}
                      />
                      <span className="text-sm">{post.likes}</span>
                    </button>

                    <button className="flex items-center gap-2 text-gray-500 hover:text-[#7B5CFA] transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>

                  <button className="text-gray-500 hover:text-[#7B5CFA] transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <motion.button
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-[#7B5CFA] to-[#48E0E4] text-white shadow-lg flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
}
