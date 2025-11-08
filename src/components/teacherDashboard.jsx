import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TeacherSidebar from './TeacherSidebar.jsx';


import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Clock, 
  BookOpen,
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
  FileCheck,
  ClipboardList,
  UserCheck,
  PieChart
} from "lucide-react";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [typewriterText, setTypewriterText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Empowering educators to manage classes efficiently and effectively.";

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
    { icon: Users, label: "Total Students", value: "247", change: "+15", color: "from-indigo-500 to-purple-500" },
    { icon: BookOpen, label: "Active Classes", value: "8", change: "+2", color: "from-blue-500 to-cyan-500" },
    { icon: CheckCircle, label: "Avg Attendance", value: "87%", change: "+5%", color: "from-green-500 to-emerald-500" },
    { icon: FileCheck, label: "Pending Reviews", value: "23", change: "-8", color: "from-orange-500 to-yellow-500" }
  ];

  const todayClasses = [
    { subject: "Data Structures", time: "09:00 AM", room: "Lab 301", students: 45, attendance: "Not Marked" },
    { subject: "Web Development", time: "11:00 AM", room: "Room 205", students: 38, attendance: "Completed" },
    { subject: "Database Systems", time: "02:00 PM", room: "Lab 104", students: 42, attendance: "Not Marked" }
  ];

  const classPerformance = [
    { class: "Data Structures", avgAttendance: 92, students: 45, trend: "up" },
    { class: "Web Development", avgAttendance: 88, students: 38, trend: "up" },
    { class: "Database Systems", avgAttendance: 84, students: 42, trend: "down" },
    { class: "Algorithm Design", avgAttendance: 90, students: 40, trend: "up" }
  ];

  const recentActivity = [
    { action: "Marked attendance", class: "Web Development", time: "2 hours ago", type: "success" },
    { action: "Updated grades", class: "Database Systems", time: "5 hours ago", type: "success" },
    { action: "Created assignment", class: "Data Structures", time: "1 day ago", type: "info" },
    { action: "Posted announcement", class: "Algorithm Design", time: "2 days ago", type: "info" }
  ];

  const lowAttendanceStudents = [
    { name: "Alex Johnson", rollNo: "CS2021045", attendance: 65, class: "Data Structures" },
    { name: "Sarah Williams", rollNo: "CS2021078", attendance: 68, class: "Web Development" },
    { name: "Mike Brown", rollNo: "CS2021092", attendance: 62, class: "Database Systems" }
  ];
  
    const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
    };
  const floatingObjects = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 20,
  }));
  // Note: Route components belong in the top-level router (App.jsx).
  // If you want to show MarkAttendance inside this dashboard, render it directly where needed.

  return (
    
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
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
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <TeacherSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className={`transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Bar */}
        <div className="relative backdrop-blur-xl bg-white/5 border-b border-white/10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-indigo-900"></div>
              </div>
              <div>
                <h3 className="text-white font-semibold">Welcome back, Prof. Smith!</h3>
                <p className="text-purple-200/70 text-sm">Computer Science Department</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
                <Bell className="w-5 h-5 text-purple-200 group-hover:text-white transition-colors" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group">
                <Settings className="w-5 h-5 text-purple-200 group-hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        </div>

        {/* Hero Section with Typewriter */}
        <div className="relative px-8 py-12">
          <div className="text-center mb-12">
            <div className="inline-block mb-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 blur-2xl opacity-50 animate-pulse-slow" />
              <Sparkles className="relative w-12 h-12 text-white animate-spin-slow" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 min-h-[120px]">
              {typewriterText}
              <span className={`inline-block w-1 h-12 bg-purple-400 ml-1 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
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
                  <p className="text-purple-200/70 text-sm mb-1">{stat.label}</p>
                  <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Today's Classes */}
            <div className="lg:col-span-2 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Today's Classes
                  </h2>
                  <button className="text-purple-300 hover:text-white text-sm transition-colors">View Schedule</button>
                </div>
                <div className="space-y-4">
                  {todayClasses.map((cls, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-indigo-500/20">
                          <BookOpen className="w-5 h-5 text-indigo-300" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{cls.subject}</p>
                          <div className="flex items-center gap-3 text-purple-200/70 text-sm mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {cls.time}
                            </span>
                            <span>•</span>
                            <span>{cls.room}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {cls.students}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        cls.attendance === 'Completed' 
                          ? 'bg-green-500/20 text-green-300' 
                          : 'bg-orange-500/20 text-orange-300'
                      }`}>
                        {cls.attendance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg mt-1 ${
                          activity.type === 'success' ? 'bg-green-500/20' : 'bg-blue-500/20'
                        }`}>
                          {activity.type === 'success' ? 
                            <CheckCircle className="w-4 h-4 text-green-400" /> : 
                            <AlertCircle className="w-4 h-4 text-blue-400" />
                          }
                        </div>
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">{activity.action}</p>
                          <p className="text-purple-200/70 text-xs mt-1">{activity.class}</p>
                          <p className="text-purple-200/50 text-xs mt-1">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Class Performance */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Class Performance
                  </h2>
                  <button className="text-purple-300 hover:text-white text-sm transition-colors">View Report</button>
                </div>
                <div className="space-y-4">
                  {classPerformance.map((cls, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-white font-medium">{cls.class}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-bold">{cls.avgAttendance}%</span>
                          {cls.trend === 'up' ? 
                            <TrendingUp className="w-4 h-4 text-green-400" /> :
                            <XCircle className="w-4 h-4 text-red-400" />
                          }
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-purple-200/70 text-sm">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {cls.students} students
                        </span>
                        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${
                              cls.avgAttendance >= 90 ? 'from-green-500 to-emerald-500' :
                              cls.avgAttendance >= 75 ? 'from-yellow-500 to-orange-500' :
                              'from-red-500 to-pink-500'
                            }`}
                            style={{ width: `${cls.avgAttendance}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Students Requiring Attention */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative backdrop-blur-xl bg-white/10 p-6 rounded-2xl border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <UserCheck className="w-5 h-5" />
                    Low Attendance Alert
                  </h2>
                </div>
                <div className="space-y-4">
                  {lowAttendanceStudents.map((student, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-red-500/20"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-white font-medium">{student.name}</p>
                          <p className="text-purple-200/70 text-xs">{student.rollNo}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-300">
                          {student.attendance}%
                        </span>
                      </div>
                      <p className="text-purple-200/70 text-sm">{student.class}</p>
                    </div>
                  ))}
                </div>
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