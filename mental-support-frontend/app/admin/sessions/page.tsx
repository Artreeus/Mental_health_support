'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Session {
  id: string;
  userName: string;
  userEmail: string;
  date: string;
  time: string;
  type: 'individual' | 'group' | 'family';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  therapist?: string;
}

export default function AdminSessions() {
  const router = useRouter();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | Session['status']>('all');

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      router.push('/admin/login');
      return;
    }

    loadSessions();
  }, [router]);

  const loadSessions = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockSessions: Session[] = [
        {
          id: '1',
          userName: 'John Doe',
          userEmail: 'john@example.com',
          date: '2025-10-15',
          time: '10:00 AM',
          type: 'individual',
          status: 'confirmed',
          therapist: 'Dr. Sarah Wilson',
        },
        {
          id: '2',
          userName: 'Emily Chen',
          userEmail: 'emily@example.com',
          date: '2025-10-16',
          time: '2:00 PM',
          type: 'group',
          status: 'pending',
        },
        {
          id: '3',
          userName: 'Mike Johnson',
          userEmail: 'mike@example.com',
          date: '2025-10-12',
          time: '11:00 AM',
          type: 'family',
          status: 'completed',
          therapist: 'Dr. Michael Lee',
        },
        {
          id: '4',
          userName: 'Sarah Miller',
          userEmail: 'sarah@example.com',
          date: '2025-10-18',
          time: '3:30 PM',
          type: 'individual',
          status: 'pending',
        },
      ];

      setSessions(mockSessions);
    } catch (error) {
      console.error('Error loading sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSessions = sessions.filter(session => 
    filterStatus === 'all' || session.status === filterStatus
  );

  const getStatusColor = (status: Session['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-teal-50">
      <header className="bg-white shadow-md border-b-2 border-emerald-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-2 font-medium transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Session Management
              </h1>
              <p className="text-gray-600 mt-1">Manage counseling sessions and appointments</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
            <p className="text-gray-600 text-sm font-medium">Pending</p>
            <p className="text-3xl font-bold text-yellow-700 mt-2">
              {sessions.filter(s => s.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium">Confirmed</p>
            <p className="text-3xl font-bold text-blue-700 mt-2">
              {sessions.filter(s => s.status === 'confirmed').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-medium">Completed</p>
            <p className="text-3xl font-bold text-green-700 mt-2">
              {sessions.filter(s => s.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-emerald-500">
            <p className="text-gray-600 text-sm font-medium">Total Sessions</p>
            <p className="text-3xl font-bold text-emerald-700 mt-2">{sessions.length}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'all' | Session['status'])}
            className="w-full md:w-64 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">All Sessions</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Sessions List */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
              <p className="text-gray-600 mt-4">Loading sessions...</p>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-600">No sessions found.</p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        {session.userName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{session.userName}</h3>
                        <p className="text-sm text-gray-600">{session.userEmail}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-gray-700">{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700">{session.time}</span>
                      </div>
                      <div>
                        <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs font-semibold rounded-full">
                          {session.type}
                        </span>
                      </div>
                      {session.therapist && (
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-gray-700">{session.therapist}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-3">
                    <span className={`px-4 py-2 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
                      {session.status.toUpperCase()}
                    </span>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      {session.status === 'pending' && (
                        <button className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium">
                          Confirm
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
