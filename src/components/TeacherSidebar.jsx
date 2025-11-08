import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, ClipboardList, BookOpen, Users, PieChart, LogOut, Menu, X } from 'lucide-react';

export default function TeacherSidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const items = [
  { icon: BarChart3, label: 'Dashboard', to: '/teacher/dashboard' },
  { icon: ClipboardList, label: 'Mark Attendance', to: '/teacher/mark-attendance' },
  { icon: BookOpen, label: 'My Classes', to: '/teacher/classes' },
  { icon: Users, label: 'Students', to: '/teacher/students' },
  { icon: PieChart, label: 'Reports', to: '/teacher/reports' }
  ];

  return (
    <div className={`fixed top-0 left-0 h-full bg-white/10 backdrop-blur-xl border-r border-white/20 transition-all duration-500 z-50 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
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
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group text-purple-200/70 hover:bg-white/5 hover:text-white"
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
    </div>
  );
}
