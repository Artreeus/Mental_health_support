'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { bookingAPI } from '@/lib/api';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, MessageSquare, CheckCircle2, Info, 
  Phone, AlertCircle, Sparkles, ArrowRight, X, Shield,
  Video, Heart, AlertTriangle
} from 'lucide-react';

export default function BookSessionPage() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    sessionDate: '',
    sessionTime: '',
    topic: '',
    description: '',
    duration: '60',
    counselorEmail: 'counselor@mentalsupport.com',
  });
  
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (formData.sessionDate) {
      fetchAvailableSlots();
    }
  }, [formData.sessionDate]);

  const fetchAvailableSlots = async () => {
    try {
      const response = await bookingAPI.getAvailableSlots(formData.sessionDate);
      setAvailableSlots(response.data.slots);
    } catch (err) {
      console.error('Failed to fetch slots:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await bookingAPI.createBooking(formData);
      setSuccess(true);
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to book session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const topics = [
    { value: 'depression', label: '😔 Depression Support', desc: 'Professional help for depression' },
    { value: 'anxiety', label: '😰 Anxiety Management', desc: 'Techniques to manage anxiety' },
    { value: 'stress', label: '😓 Stress Relief', desc: 'Coping with daily stress' },
    { value: 'relationships', label: '💑 Relationship Issues', desc: 'Improve your relationships' },
    { value: 'grief', label: '😢 Grief Counseling', desc: 'Processing loss and grief' },
    { value: 'other', label: '🤝 Other Concerns', desc: 'Any other mental health support' },
  ];

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 flex items-center justify-center py-12 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-14 h-14 text-emerald-600" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Session Booked Successfully! 🎉
            </h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Your counseling session has been successfully scheduled. You'll receive a confirmation email with the <span className="font-semibold text-emerald-600">Google Meet link</span> shortly.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="bg-emerald-50 rounded-lg p-4 flex items-center text-left">
                <Video className="w-6 h-6 text-emerald-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-emerald-900">Virtual Session</p>
                  <p className="text-sm text-emerald-700">Google Meet link sent to your email</p>
                </div>
              </div>
              
              <div className="bg-cyan-50 rounded-lg p-4 flex items-center text-left">
                <Calendar className="w-6 h-6 text-cyan-600 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-cyan-900">Calendar Event</p>
                  <p className="text-sm text-cyan-700">Added to your Google Calendar</p>
                </div>
              </div>
            </div>
            
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center justify-center text-sm text-gray-500 mb-4"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Redirecting to dashboard...</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-8 text-white relative overflow-hidden">
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
              className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
            />
            
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-3">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Calendar className="w-10 h-10" />
                </motion.div>
                <h1 className="text-4xl font-bold">Book Your Counseling Session</h1>
              </div>
              <p className="text-emerald-50 text-lg flex items-center">
                <Heart className="w-5 h-5 mr-2" />
                Take the first step towards better mental health
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center space-x-3"
                >
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  <p className="text-red-700">{error}</p>
                  <button
                    type="button"
                    onClick={() => setError('')}
                    className="ml-auto text-red-600 hover:text-red-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Topic Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label className="flex items-center space-x-2 text-lg font-semibold text-gray-900 mb-4">
                <MessageSquare className="w-6 h-6 text-emerald-500" />
                <span>What would you like to discuss? *</span>
              </label>
              <div className="grid md:grid-cols-2 gap-4">
                {topics.map((topic, index) => (
                  <motion.div
                    key={topic.value}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData({ ...formData, topic: topic.value })}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                      formData.topic === topic.value
                        ? 'border-emerald-500 bg-emerald-50 shadow-lg'
                        : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-gray-900">{topic.label}</div>
                      {formData.topic === topic.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        </motion.div>
                      )}
                    </div>
                    <div className="text-sm text-gray-600">{topic.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Date & Time Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid md:grid-cols-2 gap-6"
            >
              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 text-emerald-500" />
                  <span>Preferred Date *</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.sessionDate}
                    onChange={(e) => setFormData({ ...formData, sessionDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span>Preferred Time *</span>
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.sessionTime}
                    onChange={(e) => setFormData({ ...formData, sessionTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={!formData.sessionDate}
                  >
                    <option value="">Select time...</option>
                    {availableSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {!formData.sessionDate && (
                    <p className="text-xs text-gray-500 mt-1">Please select a date first</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Duration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
                <Clock className="w-4 h-4 text-emerald-500" />
                <span>Session Duration</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {['30', '60', '90'].map((duration, index) => (
                  <motion.button
                    key={duration}
                    type="button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormData({ ...formData, duration })}
                    className={`py-4 px-4 rounded-lg font-medium transition-all ${
                      formData.duration === duration
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div className="text-lg font-bold">{duration}</div>
                    <div className="text-xs opacity-90">minutes</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>Additional Information <span className="text-gray-400">(Optional)</span></span>
              </label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Share any specific concerns or topics you'd like to discuss during the session..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition-all"
              />
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  Your information is confidential
                </span>
                <span>{formData.description.length} characters</span>
              </div>
            </motion.div>

            {/* Privacy Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-cyan-50 to-emerald-50 border-2 border-cyan-200 rounded-xl p-5"
            >
              <div className="flex items-start space-x-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex-shrink-0"
                >
                  <Info className="w-6 h-6 text-cyan-600" />
                </motion.div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-emerald-600" />
                    Your Privacy Matters
                  </p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>All sessions are 100% confidential</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>You'll receive a secure Google Meet link via email</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Our licensed counselors are here to support you</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Submit Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
              <Link
                href="/dashboard"
                className="flex-1 py-4 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all text-center flex items-center justify-center space-x-2"
              >
                <X className="w-5 h-5" />
                <span>Cancel</span>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="group flex-1 py-4 px-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Booking...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    <span>Book Session</span>
                    <motion.div
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Emergency Support */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center space-x-2 mb-5">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </motion.div>
            <h3 className="font-bold text-gray-900 text-lg">Need Immediate Help?</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 flex items-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">988</div>
                <div className="text-sm text-gray-600">Crisis Lifeline</div>
                <div className="text-xs text-gray-500">Call or Text 24/7</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 flex items-center shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">741741</div>
                <div className="text-sm text-gray-600">Crisis Text Line</div>
                <div className="text-xs text-gray-500">Text HOME anytime</div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl p-4 flex items-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <div className="font-bold text-gray-900">24/7</div>
                <div className="text-sm text-gray-600">Always Available</div>
                <div className="text-xs text-gray-500">We're here for you</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
