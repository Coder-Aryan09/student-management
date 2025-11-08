import { useState, useEffect } from "react";
import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Clock, 
  Award,
  BookOpen,
  GraduationCap,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  User,
  FileText,
  Target
} from "lucide-react";
import StudentSidebar from './StudentSidebar.jsx';

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [typewriterText, setTypewriterText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Your one stop solution to all attendance and academic hustle.";

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // Cursor blink
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  const stats = [
    { icon: Calendar, label: "Total Classes", value: "156", change: "+12%", color: "from-purple-500 to-blue-500" },
    { icon: CheckCircle, label: "Present", value: "142", change: "+8%", color: "from-green-500 to-emerald-500" },
    { icon: XCircle, label: "Absent", value: "14", change: "-5%", color: "from-red-500 to-pink-500" },
    { icon: TrendingUp, label: "Attendance Rate", value: "91%", change: "+3%", color: "from-orange-500 to-yellow-500" }
  ];

  const recentActivity = [
    { subject: "Data Structures", status: "present", time: "2 hours ago", type: "success" },
    { subject: "Web Development", status: "present", time: "5 hours ago", type: "success" },
    { subject: "Database Systems", status: "absent", time: "1 day ago", type: "error" },
    { subject: "Algorithm Design", status: "present", time: "2 days ago", type: "success" }
  ];

  const upcomingClasses = [
    { subject: "Machine Learning", time: "10:00 AM", room: "Lab 301", status: "In 2 hours" },
    { subject: "Cloud Computing", time: "02:00 PM", room: "Room 205", status: "In 6 hours" },
    { subject: "Cybersecurity", time: "04:30 PM", room: "Lab 104", status: "In 8 hours" }
  ];

  const assignments = [
    { title: "ML Assignment 3", subject: "Machine Learning", dueDate: "2 days left", priority: "high" },
    { title: "Web Project Phase 2", subject: "Web Development", dueDate: "5 days left", priority: "medium" },
    { title: "Database Report", subject: "Database Systems", dueDate: "1 week left", priority: "low" }
  ];

  const floatingObjects = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 20,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingObjects.map((obj) => (
          <div
            key={obj.id}
            className="absolute rounded-full bg-white opacity-5 blur-xl animate-float"
            style={{
              width: `${obj.size}px`,
              height: `${obj.size}px`,
              left: `${obj.left}%`,
              top: `-${obj.size}px`,
              animationDelay: `${obj.delay}s`,
              animationDuration: `${obj.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />

  <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className={`transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <div className="relative backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-blue-900"></div>
              </div>
              <div>
                <h3 className="text-white font-semibold">Welcome back, John Doe!</h3>
                <p className="text-blue-200/70 text-sm">Computer Science - Semester 6</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
                <Bell className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
                <Settings className="w-5 h-5 text-blue-200 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section with Typewriter */}
        <div className="relative px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 blur-2xl opacity-50 animate-pulse-slow" />
              <Sparkles className="relative w-12 h-12 text-white animate-spin-slow" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 min-h-[120px]">
              {typewriterText}
              <span className={`inline-block w-1 h-12 bg-blue-400 ml-1 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
            </h1>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />
                <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
                  </div>
                  <p className="text-blue-200/70 text-sm mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Activity
                  </h2>
                  <button className="text-blue-300 hover:text-white text-sm transition-colors">View All</button>
                </div>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group/item"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${activity.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                          {activity.type === 'success' ? 
                            <CheckCircle className="w-5 h-5 text-green-400" /> : 
                            <XCircle className="w-5 h-5 text-red-400" />
                          }
                        </div>
                        <div>
                          <p className="text-white font-medium">{activity.subject}</p>
                          <p className="text-blue-200/70 text-sm">{activity.time}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        activity.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Classes */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Upcoming Classes
                </h2>
                <div className="space-y-4">
                  {upcomingClasses.map((cls, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-white font-semibold">{cls.subject}</h3>
                        <span className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300">{cls.status}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-200/70 text-sm">
                        <Clock className="w-4 h-4" />
                        {cls.time}
                      </div>
                      <p className="text-blue-200/70 text-sm mt-1">{cls.room}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pending Assignments */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Pending Assignments
                </h2>
                <button className="text-blue-300 hover:text-white text-sm transition-colors">View All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {assignments.map((assignment, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-white font-semibold">{assignment.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        assignment.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                        assignment.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {assignment.priority}
                      </span>
                    </div>
                    <p className="text-blue-200/70 text-sm mb-2">{assignment.subject}</p>
                    <div className="flex items-center gap-2 text-blue-200/70 text-xs">
                      <Clock className="w-3 h-3" />
                      {assignment.dueDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}