'use client';

import { useState } from 'react';

export default function MoodTrackerPage() {
  const [selectedMood, setSelectedMood] = useState('');
  const [note, setNote] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const moods = [
    { value: 'amazing', emoji: '😄', label: 'Amazing', color: 'bg-green-500' },
    { value: 'good', emoji: '😊', label: 'Good', color: 'bg-emerald-400' },
    { value: 'okay', emoji: '😐', label: 'Okay', color: 'bg-yellow-400' },
    { value: 'bad', emoji: '😔', label: 'Bad', color: 'bg-orange-400' },
    { value: 'terrible', emoji: '😢', label: 'Terrible', color: 'bg-red-500' },
  ];

  const handleSubmit = () => {
    if (selectedMood) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedMood('');
        setNote('');
      }, 2000);
    }
  };

  // Mock data for calendar
  const generateCalendarDays = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const randomMood = moods[Math.floor(Math.random() * moods.length)];
      days.push({
        day: i,
        mood: i <= new Date().getDate() ? randomMood : null,
      });
    }
    return days;
  };

  const calendarDays = generateCalendarDays();

  const stats = {
    streak: 7,
    totalLogs: 45,
    averageMood: 'Good',
    mostCommon: '😊',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center animate-fadeIn">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Mood Tracker</h1>
          <p className="text-xl text-gray-600">Track your daily mood and see patterns over time</p>
        </div>

        {showSuccess && (
          <div className="fixed top-20 right-6 bg-emerald-500 text-white px-6 py-4 rounded-lg shadow-2xl z-50 animate-slideIn">
            <div className="flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Mood logged successfully!
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Mood */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How are you feeling today?</h2>
              
              <div className="grid grid-cols-5 gap-4 mb-6">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setSelectedMood(mood.value)}
                    className={`p-6 rounded-2xl border-4 transition-all transform hover:scale-105 ${
                      selectedMood === mood.value
                        ? `${mood.color} border-gray-900 shadow-xl scale-105`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-5xl mb-2">{mood.emoji}</div>
                    <div className={`text-sm font-semibold ${selectedMood === mood.value ? 'text-white' : 'text-gray-700'}`}>
                      {mood.label}
                    </div>
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 resize-none"
                  placeholder="What's on your mind? Any specific reasons for your mood?"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!selectedMood}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-semibold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Log Today's Mood
              </button>
            </div>

            {/* Mood Calendar */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn" style={{animationDelay: '0.2s'}}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">This Month</h2>
              
              <div className="grid grid-cols-7 gap-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center text-sm font-semibold text-gray-600 pb-2">
                    {day}
                  </div>
                ))}
                
                {calendarDays.map((day) => (
                  <div
                    key={day.day}
                    className={`aspect-square rounded-lg flex flex-col items-center justify-center text-sm ${
                      day.mood
                        ? `${day.mood.color} text-white font-semibold cursor-pointer hover:opacity-80`
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <div>{day.day}</div>
                    {day.mood && <div className="text-lg">{day.mood.emoji}</div>}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                {moods.map((mood) => (
                  <div key={mood.value} className="flex items-center gap-1">
                    <div className={`w-4 h-4 ${mood.color} rounded`}></div>
                    <span className="text-gray-600">{mood.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-6">
            {/* Current Streak */}
            <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl shadow-2xl p-6 text-white animate-fadeIn">
              <div className="text-center">
                <div className="text-6xl mb-2">🔥</div>
                <div className="text-5xl font-bold mb-2">{stats.streak}</div>
                <div className="text-lg opacity-90">Day Streak</div>
                <div className="text-sm opacity-75 mt-2">Keep it going!</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-fadeIn" style={{animationDelay: '0.2s'}}>
              <h3 className="font-bold text-gray-900 mb-4">Your Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Logs</span>
                  <span className="text-2xl font-bold text-emerald-600">{stats.totalLogs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Mood</span>
                  <span className="text-2xl font-bold text-emerald-600">{stats.averageMood}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Most Common</span>
                  <span className="text-3xl">{stats.mostCommon}</span>
                </div>
              </div>
            </div>

            {/* Insights */}
            <div className="bg-white rounded-2xl shadow-xl p-6 animate-fadeIn" style={{animationDelay: '0.4s'}}>
              <h3 className="font-bold text-gray-900 mb-4">💡 Insights</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-blue-900">
                    <strong>Pattern Detected:</strong> You tend to feel better in the mornings
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <p className="text-emerald-900">
                    <strong>Great Job!</strong> Your mood has improved 15% this week
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-purple-900">
                    <strong>Tip:</strong> Regular tracking helps identify triggers
                  </p>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl p-6 text-white animate-fadeIn" style={{animationDelay: '0.6s'}}>
              <h3 className="font-bold mb-2">Need Support?</h3>
              <p className="text-sm opacity-90 mb-4">
                Having a tough day? We're here to help.
              </p>
              <button className="w-full py-2 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-all">
                Talk to Someone
              </button>
            </div>
          </div>
        </div>

        {/* Mood History */}
        <div className="mt-8 bg-white rounded-3xl shadow-2xl p-8 animate-fadeIn" style={{animationDelay: '0.8s'}}>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Entries</h2>
          <div className="space-y-4">
            {[
              { date: 'Today, 9:30 AM', mood: moods[1], note: 'Had a great morning workout!' },
              { date: 'Yesterday, 8:15 PM', mood: moods[2], note: 'Long day at work but managed stress well' },
              { date: 'Jan 9, 2025', mood: moods[1], note: 'Feeling positive about therapy session' },
            ].map((entry, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <div className={`w-16 h-16 ${entry.mood.color} rounded-xl flex items-center justify-center text-3xl flex-shrink-0`}>
                  {entry.mood.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-gray-900">{entry.mood.label}</span>
                    <span className="text-sm text-gray-500">{entry.date}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{entry.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
