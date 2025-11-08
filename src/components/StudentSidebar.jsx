import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Calendar, Sparkles, Clock, Bell, FileText, LogOut, Menu, X } from 'lucide-react';

export default function StudentSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const items = [
    { icon: BarChart3, label: 'Dashboard', to: '/student/dashboard' },
    { icon: Calendar, label: 'View Attendance', to: '/student/attendance' },
    { icon: Sparkles, label: 'View Holidays', to: '/student/holidays' },
    { icon: Clock, label: 'Events', to: '/student/events' },
    { icon: Bell, label: 'Notices', to: '/student/notices' },
    { icon: FileText, label: 'Notes', to: '/student/notes' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={`fixed top-0 left-0 h-full bg-white/6 backdrop-blur-xl border-r border-white/10 transition-all duration-500 z-50 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="bg-linear-to-r from-purple-500 to-blue-500 p-2 rounded-xl shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <span className="text-white font-bold text-xl">AttendEase</span>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white hover:text-purple-300 transition-colors">
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <nav className="space-y-2">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => item.to ? navigate(item.to) : null}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group text-white/90 hover:bg-white/6 hover:text-white transform hover:translate-x-1"
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all duration-300">
            <LogOut className="w-5 h-5 shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>
      <style jsx>{`
        .shadow-lg { box-shadow: 0 8px 30px rgba(99,102,241,0.12); }
        .transform { transition: transform 180ms ease; }
        .hover\\:translate-x-1:hover { transform: translateX(0.25rem); }
      `}</style>
    </div>
  );
}
