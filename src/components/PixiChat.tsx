import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, Bot } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function PixiChat() {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean; timestamp: Date }>>([
    {
      text: "Hi! I'm Pixi, your campus buddy! 🤖 Ask me about your schedule, events, or where to find things on campus.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getMockResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('zentrum') || lowerMessage.includes('center') || lowerMessage.includes('far')) {
      return 'Zentrum ist 1.2 km entfernt – etwa 15 Minuten zu Fuß. 🚶‍♂️';
    } else if (lowerMessage.includes('schedule') || lowerMessage.includes('timetable') || lowerMessage.includes('class')) {
      return 'You have 3 classes today: Data Structures at 9 AM, Web Development at 11 AM, and AI Fundamentals at 2 PM. 📚';
    } else if (lowerMessage.includes('mensa') || lowerMessage.includes('food') || lowerMessage.includes('lunch')) {
      return "Today's Mensa menu includes Vegetable Curry, Schnitzel with fries, and a special dessert! Open until 3 PM. 🍽️";
    } else if (lowerMessage.includes('event') || lowerMessage.includes('happening')) {
      return "There's a Career Fair today at 5 PM in the Main Hall, and a Tech Workshop tomorrow at 2 PM! 🎉";
    } else if (lowerMessage.includes('library') || lowerMessage.includes('study')) {
      return 'The library is located in Building A, 2nd floor. Open until 10 PM today. Study rooms can be booked via the app! 📖';
    } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
      return 'I can help you with:\n• Your class schedule\n• Campus locations & directions\n• Mensa menu\n• Upcoming events\n• Study room bookings\n\nJust ask me anything! 💡';
    } else {
      return "I'm here to help! You can ask me about your schedule, campus locations, events, or the mensa menu. What would you like to know? 😊";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = getMockResponse(inputValue);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text: response,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickQuestions = [
    "What's my schedule today?",
    "How far is Zentrum?",
    "What's for lunch?",
    "Any events today?",
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-[#7B5CFA]/5 to-[#48E0E4]/5">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#7B5CFA] to-[#48E0E4] text-white p-6 pb-8 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-white mb-0.5">Pixi</h2>
            <p className="text-sm opacity-90">Your Campus Buddy 🤖</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.length === 1 && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <motion.button
                  key={index}
                  onClick={() => setInputValue(question)}
                  className="text-left p-3 rounded-lg bg-white border border-gray-200 hover:border-[#7B5CFA] hover:shadow-md transition-all text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {question}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.isUser
                    ? 'bg-[#7B5CFA] text-white rounded-tr-sm'
                    : 'bg-white shadow-sm rounded-tl-sm'
                }`}
              >
                <p className={`text-sm whitespace-pre-line ${message.isUser ? 'text-white' : 'text-gray-800'}`}>
                  {message.text}
                </p>
                <p
                  className={`text-xs mt-1 ${
                    message.isUser ? 'text-white/70' : 'text-gray-400'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="max-w-[80%] rounded-2xl rounded-tl-sm px-4 py-3 bg-white shadow-sm">
              <div className="flex gap-1">
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about your schedule, events, or where the library is..."
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            className="bg-[#7B5CFA] hover:bg-[#6A4BE9] px-4"
            disabled={!inputValue.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="px-4"
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
