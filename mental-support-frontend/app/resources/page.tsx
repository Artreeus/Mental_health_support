'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Heart, 
  Brain, 
  Shield, 
  Users, 
  TrendingUp, 
  Phone, 
  MessageSquare, 
  AlertCircle,
  CheckCircle,
  ChevronDown,
  Sparkles,
  Target,
  Activity,
  Smile,
  Award,
  Calendar,
  Mail,
  ArrowRight
} from 'lucide-react';

export default function ResourcesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How does online counseling work?',
      answer: 'Our online counseling sessions are conducted via Google Meet. After booking, you\'ll receive a meeting link via email. Sessions are confidential and conducted by licensed mental health professionals.'
    },
    {
      question: 'Is my information confidential?',
      answer: 'Yes, absolutely. All sessions and personal information are kept strictly confidential in accordance with HIPAA regulations and professional ethics standards.'
    },
    {
      question: 'What if I need to cancel or reschedule?',
      answer: 'You can cancel or reschedule from your dashboard up to 24 hours before your session. We understand that life happens and flexibility is important.'
    },
    {
      question: 'How do I prepare for my first session?',
      answer: 'Find a quiet, private space where you feel comfortable. Have a stable internet connection ready. It\'s helpful to think about what you want to discuss, but your counselor will guide the conversation.'
    },
    {
      question: 'What if I\'m in crisis?',
      answer: 'If you\'re experiencing a mental health crisis, please call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 immediately. Our counseling services are not for emergency situations.'
    },
    {
      question: 'Are counseling sessions recorded?',
      answer: 'No, sessions are never recorded. What you share stays between you and your counselor.'
    },
  ];

  const resources = [
    {
      title: '5 Ways to Manage Anxiety',
      desc: 'Practical techniques you can use today',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      tips: ['Deep breathing exercises', 'Progressive muscle relaxation', 'Mindfulness meditation', 'Regular exercise', 'Adequate sleep']
    },
    {
      title: 'Understanding Depression',
      desc: 'Recognizing signs and seeking help',
      icon: Heart,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      tips: ['Persistent sad mood', 'Loss of interest', 'Changes in appetite/sleep', 'Fatigue', 'Professional help is available']
    },
    {
      title: 'Stress Management',
      desc: 'Healthy coping strategies',
      icon: Activity,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      tips: ['Time management', 'Set boundaries', 'Practice self-care', 'Connect with others', 'Seek support when needed']
    },
    {
      title: 'Building Resilience',
      desc: 'Strengthen your mental well-being',
      icon: Target,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      tips: ['Develop problem-solving skills', 'Build strong relationships', 'Maintain perspective', 'Take decisive actions', 'Practice self-compassion']
    },
  ];

  const crisisResources = [
    {
      name: '988 Suicide & Crisis Lifeline',
      description: '24/7 free and confidential support',
      contact: 'Call or Text 988',
      icon: AlertCircle,
      color: 'bg-red-500'
    },
    {
      name: 'Crisis Text Line',
      description: 'Text-based crisis support',
      contact: 'Text HOME to 741741',
      icon: MessageSquare,
      color: 'bg-blue-500'
    },
    {
      name: 'SAMHSA National Helpline',
      description: 'Treatment referral and information',
      contact: '1-800-662-4357',
      icon: Phone,
      color: 'bg-emerald-500'
    },
    {
      name: 'Veterans Crisis Line',
      description: 'Support for veterans and families',
      contact: 'Call 988 then press 1',
      icon: Shield,
      color: 'bg-purple-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50">
      {/* Hero Section with Animation */}
      <section className="relative bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-500 text-white py-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/4 w-96 h-96 border-4 border-white rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/2 -left-1/4 w-80 h-80 border-4 border-white rounded-full"
          />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-2xl"
          >
            <BookOpen className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            Mental Health Resources
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8"
          >
            Access helpful information, tips, and crisis support resources. 
            You're not alone in this journey.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 text-sm"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
              <span>Evidence-Based</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Shield className="w-5 h-5" />
              <span>Confidential</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Sparkles className="w-5 h-5" />
              <span>Expert Reviewed</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12 space-y-12">
        {/* Crisis Resources */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-red-100">
            <div className="flex items-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-xl"
              >
                <AlertCircle className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Crisis Support</h2>
                <p className="text-gray-600 text-lg">Immediate help is available 24/7</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {crisisResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                    className="group border-2 border-gray-200 rounded-2xl p-6 hover:border-emerald-500 transition-all cursor-pointer"
                  >
                    <div className="flex items-start">
                      <div className={`w-14 h-14 ${resource.color} rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-emerald-600 transition-colors">{resource.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                        <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                          <Phone className="w-4 h-4" />
                          <span>{resource.contact}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Emergency Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl"
            >
              <p className="text-red-800 text-center font-medium">
                <span className="font-bold">⚠️ If this is an emergency</span>, please call 911 or go to your nearest emergency room immediately.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Self-Help Resources */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Self-Help Resources
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg"
            >
              Evidence-based strategies for your mental wellness journey
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group"
                >
                  <div className={`bg-gradient-to-r ${resource.color} p-6 text-white relative overflow-hidden`}>
                    {/* Background Icon */}
                    <div className="absolute top-0 right-0 opacity-10 transform translate-x-6 -translate-y-2">
                      <Icon className="w-32 h-32" />
                    </div>
                    
                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-4"
                      >
                        <Icon className="w-8 h-8" />
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2">{resource.title}</h3>
                      <p className="text-white/90">{resource.desc}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <ul className="space-y-3">
                      {resource.tips.map((tip, tipIndex) => (
                        <motion.li
                          key={tipIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: tipIndex * 0.05 }}
                          className="flex items-start group/item"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                          <span className="text-gray-700 group-hover/item:text-gray-900 transition-colors">{tip}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring' }}
                className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl mb-4 shadow-xl"
              >
                <MessageSquare className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600">Find answers to common questions about our services</p>
            </div>

            <div className="space-y-4 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-emerald-500 transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full text-left p-6 hover:bg-emerald-50 transition-colors flex justify-between items-center group"
                  >
                    <span className="font-semibold text-gray-900 text-lg group-hover:text-emerald-600 transition-colors">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-gray-500 group-hover:text-emerald-600 transition-colors" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-200 pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-r from-emerald-500 via-cyan-500 to-teal-500 rounded-3xl shadow-2xl p-8 md:p-12 text-white text-center overflow-hidden"
        >
          {/* Background Animation */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-2xl"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Professional support is just a click away. Book your first session today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-session">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255,255,255,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-white text-emerald-600 rounded-2xl font-semibold text-lg shadow-xl flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book a Session
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border-2 border-white hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Contact Support
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Additional Support */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {[
            { icon: BookOpen, title: 'Articles & Guides', desc: 'Expert advice and educational content', color: 'blue' },
            { icon: Users, title: 'Community Support', desc: 'Connect with others on similar journeys', color: 'emerald' },
            { icon: Award, title: 'Progress Tracking', desc: 'Monitor your mental health journey', color: 'purple' }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-all cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 bg-${item.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow`}
                >
                  <Icon className={`w-8 h-8 text-${item.color}-600`} />
                </motion.div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg group-hover:text-emerald-600 transition-colors">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.section>
      </div>
    </div>
  );
}
