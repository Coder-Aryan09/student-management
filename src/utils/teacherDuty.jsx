import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, GraduationCap, ChevronDown, Sparkles } from 'lucide-react';
import TeacherSidebar from '../components/TeacherSidebar.jsx';

const TeacherDuty = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [typewriterText, setTypewriterText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Manage your weekly class schedule efficiently.";

  // Typewriter effect
  React.useEffect(() => {
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

  // Cursor blink effect
  React.useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  // Sample schedule data - replace with actual data from your backend
  const weeklySchedule = {
    Monday: [
      { time: '9:00 AM - 10:30 AM', subject: 'Data Structures', class: 'CS-3A', room: 'Lab 301', students: 45 },
      { time: '11:00 AM - 12:30 PM', subject: 'Algorithm Design', class: 'CS-4B', room: 'Room 205', students: 40 },
      { time: '2:00 PM - 3:30 PM', subject: 'Python Programming', class: 'CS-2A', room: 'Lab 102', students: 50 }
    ],
    Tuesday: [
      { time: '10:00 AM - 11:30 AM', subject: 'Database Systems', class: 'CS-3B', room: 'Lab 304', students: 42 },
      { time: '1:00 PM - 2:30 PM', subject: 'Web Development', class: 'CS-4A', room: 'Lab 201', students: 38 }
    ],
    Wednesday: [
      { time: '9:00 AM - 10:30 AM', subject: 'Data Structures', class: 'CS-3A', room: 'Lab 301', students: 45 },
      { time: '11:00 AM - 12:30 PM', subject: 'Machine Learning', class: 'CS-4C', room: 'Lab 305', students: 35 }
    ],
    Thursday: [
      { time: '9:30 AM - 11:00 AM', subject: 'Algorithm Design', class: 'CS-4B', room: 'Room 205', students: 40 },
      { time: '2:00 PM - 3:30 PM', subject: 'Python Programming', class: 'CS-2A', room: 'Lab 102', students: 50 }
    ],
    Friday: [
      { time: '10:00 AM - 11:30 AM', subject: 'Database Systems', class: 'CS-3B', room: 'Lab 304', students: 42 },
      { time: '1:00 PM - 2:30 PM', subject: 'Web Development', class: 'CS-4A', room: 'Lab 201', students: 38 }
    ]
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const floatingObjects = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 40 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 20,
  }));

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
      <div
        className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"
        style={{ animationDelay: '1s' }}
      />

      <TeacherSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section with Typewriter */}
            <div className="text-center mb-12">
              <div className="inline-block mb-6 relative">
                <div className="absolute inset-0 bg-linear-to-r from-indigo-400 to-purple-400 blur-2xl opacity-50 animate-pulse-slow" />
                <Sparkles className="relative w-12 h-12 text-white animate-spin-slow" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                {typewriterText}
                <span
                  className={`inline-block w-1 h-12 bg-purple-400 ml-1 align-middle ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                ></span>
              </h1>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h2 className="text-3xl font-semibold text-white flex items-center gap-2">
                <Calendar className="w-8 h-8 text-purple-400" />
                Daily Schedule
              </h2>

              {/* Day Selection Dropdown */}
              <div className="relative">
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="appearance-none bg-white/10 text-white px-4 py-2 pr-10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  {days.map((day) => (
                    <option key={day} value={day} className="bg-gray-800 text-white">
                      {day}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-white/70 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Schedule Cards */}
            <div className="grid gap-6">
              {weeklySchedule[selectedDay].map((schedule, index) => (
                <div key={index} className="relative group overflow-hidden">
                  {/* Gradient background */}
                  <div className="absolute inset-0 bg-linear-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur opacity-30 group-hover:opacity-40 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20 hover:border-white/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-linear-to-r from-indigo-500 to-purple-500 text-white">
                          <Clock className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{schedule.subject}</h3>
                          <div className="space-y-2">
                            <p className="text-purple-200/70 flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {schedule.time}
                            </p>
                            <p className="text-purple-200/70 flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {`Class ${schedule.class} (${schedule.students} students)`}
                            </p>
                            <p className="text-purple-200/70 flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {schedule.room}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 hover:text-indigo-200 transition-all duration-300 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          View Class
                        </button>
                        <button className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-purple-200 transition-all duration-300 flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          Take Attendance
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {weeklySchedule[selectedDay].length === 0 && (
              <div className="text-center py-12">
                <div className="inline-block p-4 rounded-full bg-indigo-500/20 mb-4">
                  <Calendar className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Classes Scheduled</h3>
                <p className="text-purple-200/70">You have no classes scheduled for {selectedDay}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDuty;
