'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Brain, 
  Heart, 
  Shield, 
  MessageCircle, 
  Calendar, 
  Award, 
  Users, 
  Star, 
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  Smile,
  Video,
  Headphones,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Quote,
  ThumbsUp,
  Activity,
  Globe,
  Lightbulb
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function Home() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [counters, setCounters] = useState({
    users: 0,
    sessions: 0,
    rating: 0,
    satisfaction: 0
  });
  
  // Testimonials Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const quotes = [
    { text: "You are stronger than you think", icon: "💪" },
    { text: "It's okay to not be okay. We're here for you", icon: "🤗" },
    { text: "Every step forward is progress", icon: "🌱" },
    { text: "Your mental health matters", icon: "💚" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "College Student",
      avatar: "👩",
      rating: 5,
      text: "This platform changed my life. The AI chatbot provides instant support, and booking therapy sessions is so easy. The counselors are truly compassionate and professional!",
      gradient: "from-emerald-400 to-cyan-400"
    },
    {
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "👨",
      rating: 5,
      text: "The professional counselors are amazing. I feel heard and supported. The video sessions work flawlessly, and the 24/7 AI support is a game-changer for my anxiety management.",
      gradient: "from-cyan-400 to-blue-400"
    },
    {
      name: "Emily Rodriguez",
      role: "High School Teacher",
      avatar: "👧",
      rating: 5,
      text: "As an educator dealing with burnout, this platform gave me the tools and support I needed. The mood tracking and journaling features are incredibly helpful. Forever grateful!",
      gradient: "from-blue-400 to-emerald-400"
    },
    {
      name: "David Kumar",
      role: "Business Owner",
      avatar: "👨‍💼",
      rating: 5,
      text: "Managing stress and work-life balance has never been easier. The booking system is seamless, and the counselors provide practical strategies that actually work in real life.",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      name: "Lisa Thompson",
      role: "Nurse",
      avatar: "👩‍⚕️",
      rating: 5,
      text: "Working in healthcare during challenging times, I needed support. This platform's confidentiality and professional approach made me feel safe to share and heal. Highly recommend!",
      gradient: "from-pink-400 to-rose-400"
    }
  ];

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [quotes.length]);

  // Animate counters
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = { users: 1200, sessions: 3500, rating: 4.9, satisfaction: 98 };
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setCounters({
        users: Math.floor(targets.users * progress),
        sessions: Math.floor(targets.sessions * progress),
        rating: Number((targets.rating * progress).toFixed(1)),
        satisfaction: Math.floor(targets.satisfaction * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section with Floating Elements */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, -30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/3 right-1/4 w-64 h-64 bg-teal-200/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Floating Sparkles */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl mb-6 shadow-2xl"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            {/* Main Heading with Stagger Animation */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-6"
            >
              Your Mental Health
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="block bg-gradient-to-r from-emerald-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mt-2"
              >
                Matters Most
              </motion.span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto"
            >
              A safe space for support, understanding, and healing. 
              Connect with professional counselors and AI-powered tools that care about your well-being.
            </motion.p>

            {/* CTA Buttons with Hover Effects */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/book-session">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl font-semibold text-lg shadow-xl flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book a Session
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/ai-chat">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-emerald-600 rounded-2xl font-semibold text-lg shadow-xl border-2 border-emerald-500 hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Try AI Chat
                </motion.button>
              </Link>
            </motion.div>

            {/* Rotating Quote Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="inline-block"
            >
              <motion.div
                key={currentQuoteIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-emerald-100"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">{quotes[currentQuoteIndex].icon}</span>
                  <p className="text-lg font-medium text-gray-700">
                    {quotes[currentQuoteIndex].text}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.3 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <span>Licensed Professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-500" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-emerald-500" />
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-emerald-500 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-emerald-500 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            How We Can Help You
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🗓️</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Easy Booking</h3>
              <p className="text-gray-600 leading-relaxed">
                Schedule counseling sessions at your convenience with our simple booking system and Google Meet integration.
              </p>
            </div>

            <div className="feature-card p-8 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Professional Counselors</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with experienced, licensed mental health professionals who understand and care.
              </p>
            </div>

            <div className="feature-card p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Confidential & Safe</h3>
              <p className="text-gray-600 leading-relaxed">
                Your privacy is our priority. All sessions and information are completely confidential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-5xl mb-3">👥</div>
              <h3 className="text-4xl font-bold text-emerald-600 mb-2">1,200+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="p-6">
              <div className="text-5xl mb-3">⭐</div>
              <h3 className="text-4xl font-bold text-emerald-600 mb-2">4.9/5</h3>
              <p className="text-gray-600">User Rating</p>
            </div>
            <div className="p-6">
              <div className="text-5xl mb-3">💬</div>
              <h3 className="text-4xl font-bold text-emerald-600 mb-2">3,500+</h3>
              <p className="text-gray-600">Sessions Completed</p>
            </div>
            <div className="p-6">
              <div className="text-5xl mb-3">🎯</div>
              <h3 className="text-4xl font-bold text-emerald-600 mb-2">98%</h3>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16">
            <div className="inline-flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-8 h-8 text-emerald-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                Our Services
              </h2>
            </div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive mental health support tailored to your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Video className="w-8 h-8" />,
                title: "Virtual Counseling",
                description: "One-on-one video sessions with licensed therapists via Google Meet",
                color: "from-emerald-500 to-cyan-500",
                bgColor: "from-emerald-50 to-cyan-50"
              },
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "AI Chat Support",
                description: "24/7 instant support from our compassionate AI assistant",
                color: "from-cyan-500 to-blue-500",
                bgColor: "from-cyan-50 to-blue-50"
              },
              {
                icon: <Activity className="w-8 h-8" />,
                title: "Mood Tracking",
                description: "Monitor your emotional well-being with daily mood logs",
                color: "from-blue-500 to-purple-500",
                bgColor: "from-blue-50 to-purple-50"
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Resource Library",
                description: "Access articles, guides, and tools for mental wellness",
                color: "from-purple-500 to-pink-500",
                bgColor: "from-purple-50 to-pink-50"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`bg-gradient-to-br ${service.bgColor} rounded-2xl p-6 border-2 border-transparent hover:border-emerald-200 transition-all shadow-lg hover:shadow-2xl group cursor-pointer`}
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className={`h-1 bg-gradient-to-r ${service.color} rounded-full mt-4`}
                />
              </motion.div>
            ))}
          </div>

          {/* Additional Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <Shield className="w-6 h-6" />,
                title: "100% Confidential",
                description: "Your privacy is our priority"
              },
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Accessible Anywhere",
                description: "Get help from any location"
              },
              {
                icon: <Headphones className="w-6 h-6" />,
                title: "24/7 Support",
                description: "We're always here for you"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center space-x-2 mb-4">
              <Quote className="w-8 h-8 text-emerald-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
                What Our Users Say
              </h2>
            </div>
            <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
              Real stories from people we've helped on their mental health journey
            </p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex-[0_0_100%] min-w-0 px-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl"
                    >
                      {/* Quote Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-full flex items-center justify-center">
                          <Quote className="w-8 h-8 text-emerald-600" />
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-gray-700 text-lg md:text-xl leading-relaxed text-center italic mb-8">
                        "{testimonial.text}"
                      </p>

                      {/* User Info */}
                      <div className="flex flex-col items-center">
                        <div className={`w-16 h-16 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-3xl mb-4 shadow-lg`}>
                          {testimonial.avatar}
                        </div>
                        <h4 className="font-bold text-gray-900 text-xl mb-1">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm mb-3">{testimonial.role}</p>
                        <div className="flex text-yellow-400 text-xl">
                          {Array(testimonial.rating).fill('⭐').join('')}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-emerald-50 transition-colors group"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600 group-hover:text-emerald-600" />
            </button>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center hover:bg-emerald-50 transition-colors group"
            >
              <ChevronRight className="w-6 h-6 text-gray-600 group-hover:text-emerald-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === selectedIndex
                      ? 'bg-emerald-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <div className="bg-white rounded-full px-8 py-4 shadow-lg flex items-center space-x-3">
              <ThumbsUp className="w-6 h-6 text-emerald-600" />
              <span className="text-gray-700 font-semibold">Trusted by 1,200+ users worldwide</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Highlight Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  🤖
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered Support</h3>
                  <p className="text-gray-600">Get instant help from our advanced AI chatbot, available 24/7 for immediate support.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  👨‍⚕️
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Licensed Professionals</h3>
                  <p className="text-gray-600">Connect with certified therapists and counselors who truly care about your wellbeing.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  🔒
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">100% Confidential</h3>
                  <p className="text-gray-600">Your privacy is our top priority. All sessions and data are completely secure and confidential.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                  💰
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Affordable Care</h3>
                  <p className="text-gray-600">Mental health support shouldn't break the bank. We offer flexible pricing options.</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-100 to-cyan-100 rounded-3xl p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">💚</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Mental Health Matters</h3>
                <p className="text-gray-600">Join thousands who've taken the first step</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Take the First Step?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            You don't have to face this alone. We're here to support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" 
              className="inline-block px-10 py-4 bg-white text-emerald-600 rounded-full font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              Get Started Today
            </Link>
            <Link href="/ai-chat" 
              className="inline-block px-10 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300">
              Try AI Chat
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
