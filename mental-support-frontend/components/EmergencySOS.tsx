'use client';

import { useState } from 'react';

export default function EmergencySOS() {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyContacts = [
    { name: '988 Suicide & Crisis Lifeline', number: '988', action: 'tel:988', color: 'bg-red-600' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', action: 'sms:741741&body=HOME', color: 'bg-blue-600' },
    { name: 'Emergency Services', number: '911', action: 'tel:911', color: 'bg-red-700' },
  ];

  return (
    <>
      {/* Emergency Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-slideIn">
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Need Immediate Help?</h2>
              <p className="text-gray-600">You're not alone. Help is available right now.</p>
            </div>

            <div className="space-y-3 mb-6">
              {emergencyContacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.action}
                  className={`block ${contact.color} text-white rounded-xl p-4 hover:opacity-90 transition-all transform hover:scale-105`}
                >
                  <div className="font-bold text-lg">{contact.name}</div>
                  <div className="text-sm opacity-90">{contact.number}</div>
                </a>
              ))}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-blue-900">
                <strong>Remember:</strong> If you're in immediate danger, call 911. These services are free, confidential, and available 24/7.
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Floating SOS Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 animate-pulse"
        aria-label="Emergency SOS"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </button>
    </>
  );
}
