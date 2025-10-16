'use client';

import { useState } from 'react';
import { supportAPI } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Mail, Phone, MessageSquare, Send, CheckCircle2, 
  AlertCircle, Clock, HeadphonesIcon, AlertTriangle, 
  FileQuestion, Sparkles, ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgency: 'medium',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await supportAPI.submitRequest(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        urgency: 'medium',
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 flex items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-600" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Message Sent Successfully! 💚
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Thank you for reaching out. Our support team has received your message and will get back to you within <span className="font-semibold text-emerald-600">24 hours</span>.
            </p>
            
            <div className="bg-emerald-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center text-emerald-700 text-sm">
                <Mail className="w-4 h-4 mr-2" />
                <span>Check your email for a confirmation</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSuccess(false)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-full font-semibold hover:shadow-xl transition-all flex items-center justify-center mx-auto space-x-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Send Another Message</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <Sparkles className="w-16 h-16 text-emerald-500 mx-auto" />
          </motion.div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're here to help. Reach out with any questions or concerns.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="w-8 h-8 text-emerald-500" />
                <h2 className="text-2xl font-bold text-gray-900">Send Us a Message</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center space-x-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <p className="text-red-700">{error}</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Phone Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </motion.div>

                {/* Subject Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="How can we help?"
                    />
                  </div>
                </motion.div>

                {/* Urgency Level */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Urgency Level
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['low', 'medium', 'high', 'urgent'].map((level, index) => (
                      <motion.button
                        key={level}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        onClick={() => setFormData({ ...formData, urgency: level })}
                        className={`py-3 px-4 rounded-lg font-medium capitalize transition-all ${
                          formData.urgency === level
                            ? level === 'urgent'
                              ? 'bg-red-500 text-white shadow-lg'
                              : level === 'high'
                              ? 'bg-orange-500 text-white shadow-lg'
                              : level === 'medium'
                              ? 'bg-yellow-500 text-white shadow-lg'
                              : 'bg-green-500 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {level}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all"
                    placeholder="Please describe your inquiry or concern in detail..."
                  />
                  <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Be as detailed as possible
                    </span>
                    <span>{formData.message.length} characters</span>
                  </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="group w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                        <motion.div
                          initial={{ x: 0 }}
                          className="group-hover:translate-x-1 transition-transform"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Resources */}
          <div className="space-y-6">
            {/* Contact Methods */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <HeadphonesIcon className="w-6 h-6 text-emerald-500" />
                <h3 className="font-bold text-gray-900 text-lg">Contact Information</h3>
              </div>
              <div className="space-y-4">
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start group cursor-pointer hover:bg-emerald-50 p-3 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-gray-600 text-sm">support@mentalsupport.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-start group p-3 rounded-lg"
                >
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <Clock className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Response Time</p>
                    <p className="text-gray-600 text-sm">Within 24 hours</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-start group p-3 rounded-lg"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                    <HeadphonesIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Available</p>
                    <p className="text-gray-600 text-sm">Monday - Sunday, 24/7</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Crisis Support */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-red-50 border-2 border-red-200 rounded-2xl p-6"
            >
              <div className="flex items-center mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3"
                >
                  <AlertTriangle className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="font-bold text-gray-900 text-lg">In Crisis?</h3>
              </div>
              <p className="text-gray-700 text-sm mb-4">
                If you're experiencing a mental health emergency, please call:
              </p>
              <div className="space-y-3">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-red-600" />
                    <p className="font-bold text-red-600">988 - Suicide & Crisis Lifeline</p>
                  </div>
                  <p className="text-gray-600 text-sm ml-7">Call or Text 24/7</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-blue-600" />
                    <p className="font-bold text-blue-600">741741 - Crisis Text Line</p>
                  </div>
                  <p className="text-gray-600 text-sm ml-7">Text HOME to connect</p>
                </motion.div>
              </div>
            </motion.div>

            {/* FAQ Link */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl p-6 text-white relative overflow-hidden"
            >
              {/* Background decoration */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"
              />
              
              <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-3">
                  <FileQuestion className="w-6 h-6" />
                  <h3 className="font-bold text-lg">Need Quick Answers?</h3>
                </div>
                <p className="text-emerald-50 text-sm mb-4 leading-relaxed">
                  Check out our comprehensive FAQ section for instant answers to common questions.
                </p>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/resources"
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-emerald-600 rounded-full font-semibold hover:shadow-lg transition-all"
                >
                  <span>View FAQs</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
