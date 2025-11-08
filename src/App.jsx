import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/loginPage.jsx';
import StudentDashboard from './components/studentDashboard.jsx';
import TeacherDashboard from './components/teacherDashboard.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import MarkAttendance from './utils/markAttendance.jsx';
import StudentList from './utils/studentList.jsx';
import ReportPage from './components/reportPage.jsx';
import StudentAttendance from './utils/studentAttendance.jsx';
import Holidays from './utils/holidays.jsx';
import Events from './utils/events.jsx';
import Notices from './utils/notices.jsx';
import Notes from './utils/notes.jsx';
import TeacherDuty from './utils/teacherDuty.jsx';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  
  if (!token || !role) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && role !== allowedRole) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }
  
  return children;
};

// Public Route (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  
  if (token && role) {
    return <Navigate to={`/${role}/dashboard`} replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        
        {/* Student Routes */}
        <Route 
          path="/student/dashboard" 
          element={
            <ProtectedRoute allowedRole="student">
              <ErrorBoundary>
                <StudentDashboard />
              </ErrorBoundary>
            </ProtectedRoute>
          } 
        />
        <Route
          path="/student/attendance"
          element={
            <ProtectedRoute allowedRole="student">
              <ErrorBoundary>
                <StudentAttendance />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/holidays"
          element={
            <ProtectedRoute allowedRole="student">
              <ErrorBoundary>
                <Holidays />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/events"
          element={
            <ProtectedRoute allowedRole="student">
              <ErrorBoundary>
                <Events />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/notices"
          element={
            <ProtectedRoute allowedRole="student">
              <ErrorBoundary>
                <Notices />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/notes"
          element={
            <ProtectedRoute allowedRole="student">
              <ErrorBoundary>
                <Notes />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        {/* Teacher Routes */}
        <Route 
          path="/teacher/dashboard" 
          element={
            <ProtectedRoute allowedRole="teacher">
              <ErrorBoundary>
                <TeacherDashboard />
              </ErrorBoundary>
            </ProtectedRoute>
          } 
        />
        <Route
          path="/teacher/students"
          element={
            <ProtectedRoute allowedRole="teacher">
              <ErrorBoundary>
                <StudentList />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />

        {/* Teacher - Mark Attendance */}
        <Route
          path="/teacher/mark-attendance"
          element={
            <ProtectedRoute allowedRole="teacher">
              <ErrorBoundary>
                <MarkAttendance />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />

        {/* Teacher - Reports */}
        <Route
          path="/teacher/reports"
          element={
            <ProtectedRoute allowedRole="teacher">
              <ErrorBoundary>
                <ReportPage />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />

        {/* Teacher - My Classes */}
        <Route
          path="/teacher/classes"
          element={
            <ProtectedRoute allowedRole="teacher">
              <ErrorBoundary>
                <TeacherDuty />
              </ErrorBoundary>
            </ProtectedRoute>
          }
        />
        
        {/* Default Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
        <Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
        
        {/* 404 Catch-all */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;