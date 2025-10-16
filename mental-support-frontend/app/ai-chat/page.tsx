'use client';

import { useState, useEffect, useRef } from 'react';
import { chatWithAI, detectCrisis } from '@/lib/gemini';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Bot, User, Sparkles, AlertTriangle, Phone, 
  MessageSquare, Shield, Info, X, Check, Loader2
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm here to support you. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Check for crisis keywords
    const isCrisis = await detectCrisis(inputMessage);
    if (isCrisis) {
      setShowCrisisAlert(true);
    }

    try {
      const aiResponse = await chatWithAI(inputMessage);
      
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I'm here to help. Please try again or reach out to a mental health professional for immediate support.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    "I'm feeling anxious",
    "I need help with stress",
    "I'm feeling overwhelmed",
    "I need motivation"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border-2 border-emerald-200 p-6 mb-6 relative overflow-hidden"
        >
          {/* Background decoration */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl"
          />
          
          <div className="relative z-10 flex items-center space-x-4">
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
            >
              <Bot className="w-8 h-8 text-white" />
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-3xl font-bold text-gray-900">AI Mental Health Support</h1>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-6 h-6 text-emerald-500" />
                </motion.div>
              </div>
              <p className="text-gray-600 flex items-center mt-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat with our compassionate AI assistant
              </p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-emerald-100 rounded-full"
            >
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-emerald-700">Online</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Crisis Alert */}
        <AnimatePresence>
          {showCrisisAlert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-500 rounded-2xl p-6 mb-6 shadow-xl"
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex-shrink-0"
                >
                  <AlertTriangle className="w-10 h-10 text-red-600" />
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-bold text-red-900 text-xl mb-2 flex items-center">
                    Immediate Support Available
                  </h3>
                  <p className="text-red-800 mb-4 leading-relaxed">
                    If you're in crisis or thinking about harming yourself, please reach out for immediate help:
                  </p>
                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-white rounded-lg p-3 flex items-center space-x-3"
                    >
                      <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-red-900">988</p>
                        <p className="text-sm text-red-700">National Suicide Prevention Lifeline</p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-white rounded-lg p-3 flex items-center space-x-3"
                    >
                      <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-blue-900">741741</p>
                        <p className="text-sm text-blue-700">Crisis Text Line - Text HOME</p>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white rounded-lg p-3 flex items-center space-x-3"
                    >
                      <Info className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-emerald-900">befrienders.org</p>
                        <p className="text-sm text-emerald-700">International Support</p>
                      </div>
                    </motion.div>
                  </div>
                  <div className="flex items-center space-x-3 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowCrisisAlert(false)}
                      className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all shadow-lg"
                    >
                      <Check className="w-5 h-5" />
                      <span className="font-semibold">I Understand</span>
                    </motion.button>
                    <button
                      onClick={() => setShowCrisisAlert(false)}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border-2 border-emerald-200 overflow-hidden"
        >
          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-end space-x-2`}
              >
                {message.sender === 'ai' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <Bot className="w-5 h-5 text-white" />
                  </motion.div>
                )}
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`max-w-[70%] rounded-2xl p-4 shadow-md ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-br-sm'
                      : 'bg-white text-gray-900 border-2 border-emerald-100 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 flex items-center ${
                    message.sender === 'user' ? 'text-emerald-100 justify-end' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </motion.div>
                
                {message.sender === 'user' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <User className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </motion.div>
            ))}
            
            {/* Typing Indicator */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-start items-end space-x-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border-2 border-emerald-100 rounded-2xl rounded-bl-sm p-4 shadow-md">
                    <div className="flex space-x-2">
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        className="w-2 h-2 bg-emerald-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-emerald-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-emerald-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-cyan-50 border-t-2 border-emerald-200">
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <p className="text-sm font-semibold text-gray-700">Quick Prompts:</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setInputMessage(prompt)}
                  className="px-4 py-2 bg-white border-2 border-emerald-300 text-emerald-700 rounded-full text-sm font-medium hover:bg-emerald-50 hover:shadow-md transition-all"
                >
                  {prompt}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t-2 border-emerald-200">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 pr-12 border-2 border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                  disabled={isLoading}
                />
                <MessageSquare className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span className="hidden sm:inline">Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span className="hidden sm:inline">Send</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-gradient-to-r from-emerald-50 to-cyan-50 border-2 border-emerald-200 rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-start space-x-4">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="flex-shrink-0"
            >
              <Shield className="w-8 h-8 text-emerald-600" />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-bold text-emerald-900 mb-3 text-lg flex items-center">
                <Info className="w-5 h-5 mr-2" />
                Privacy & Support
              </h3>
              <div className="space-y-2 text-emerald-800 text-sm leading-relaxed">
                <p className="flex items-start">
                  <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>This AI assistant provides supportive guidance but is not a substitute for professional mental health care.</span>
                </p>
                <p className="flex items-start">
                  <Check className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>All conversations are completely private and confidential.</span>
                </p>
                <p className="flex items-start">
                  <Phone className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>For emergencies, please call <strong>988</strong> or your local emergency services.</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
