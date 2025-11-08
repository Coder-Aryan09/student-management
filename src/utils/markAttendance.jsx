// src/components/markAttendance.jsx
import React, { useState } from "react";
// no router hook needed here; sidebar handles navigation
import { BookOpen, Check, X, Plus } from "lucide-react";
import TeacherSidebar from "../components/TeacherSidebar.jsx";
import CardStudent from "./cardStudent.jsx";

const MarkAttendance = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Aarav Mehta", roll: "CS2021001", status: null },
    { id: 2, name: "Priya Sharma", roll: "CS2021002", status: null },
    { id: 3, name: "Rohan Patel", roll: "CS2021003", status: null },
    { id: 4, name: "Simran Kaur", roll: "CS2021004", status: null },
    { id: 5, name: "Aditya Verma", roll: "CS2021005", status: null },
  ]);

  // note: markAttendance handler is defined below with the updated name/signature

  // handlers for marking/reset/edit/add
  const markAttendance = (id, newStatus) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)));
  };

  const resetStatus = (id) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, status: null } : s)));
  };

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [editing, setEditing] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);

  const onEditSave = (updated) => {
    setStudents((prev) => prev.map((s) => (s.id === updated.id ? { ...s, ...updated } : s)));
    setEditing(null);
  };

  const addStudent = () => {
    const newStudent = {
      id: Date.now(),
      name: 'New Student',
      roll: '',
      status: null,
    };
    setStudents((prev) => [...prev, newStudent]);
    // open editor for new student
    setEditing(newStudent);
  };

  // logout is handled by TeacherSidebar

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      <TeacherSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
      {/* Floating background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-5 blur-xl animate-float"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 40 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 20}s`,
            }}
          />
        ))}
      </div>

      {/* Title */}
      <div className="relative mb-6 flex items-center justify-around gap-4">
        <div>
          <div className="inline-block mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 blur-2xl opacity-50 animate-pulse-slow" />
            <BookOpen className="relative w-12 h-12 text-white animate-spin-slow" />
          </div>
          <h1 className="text-3xl font-bold text-white">Mark Attendance</h1>
          <p className="text-purple-200 mt-2">Select <span className="text-green-400 font-semibold">P</span> or <span className="text-red-400 font-semibold">A</span> for each student.</p>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={addStudent} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-white hover:bg-white/10">
            <Plus className="w-4 h-4" /> Add Student
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                // Prevent double submit
                if (submitted) return;

                // Ensure all students are marked
                const unmarked = students.filter(s => s.status === null);
                if (unmarked.length > 0) {
                  alert('Please mark attendance for all students before submitting.');
                  return;
                }

                const date = new Date().toISOString().slice(0,10);
                const records = students.map(s => ({ roll: s.roll, status: s.status === 'P' ? 'Present' : 'Absent' }));
                const payload = { date, records, submitted_by: localStorage.getItem('user') || localStorage.getItem('role') };

                try {
                  const res = await fetch('http://localhost:5000/api/students/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.message || 'Submission failed');
                  setSubmitted(true);
                  setSubmissionId(data.submissionId);
                  alert('Attendance submitted successfully. Submission ID: ' + data.submissionId);
                } catch (err) {
                  console.error(err);
                  alert('Failed to submit attendance: ' + err.message);
                }
              }}
              className={`px-4 py-2 rounded-lg text-white ${submitted ? 'bg-gray-600 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600'}`}
              disabled={submitted}
            >
              Submit Attendance
            </button>
            {submitted && <span className="text-green-200 ml-3">Submitted ✓</span>}
          </div>
        </div>
      </div>

      {/* Cards list */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {students.map((student) => (
          <CardStudent
            key={student.id}
            student={student}
            onMark={markAttendance}
            onReset={resetStatus}
            onEdit={(s) => setEditing(s)}
            locked={submitted}
          />
        ))}
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setEditing(null)} />
          <div className="relative bg-white/5 backdrop-blur-xl p-6 rounded-2xl w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-4">Edit Student</h2>
            <div className="space-y-3">
              <label className="block text-sm text-purple-200">Name</label>
              <input
                value={editing.name}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full p-2 rounded-md bg-white/10 text-white border border-white/10"
              />

              <label className="block text-sm text-purple-200">Roll</label>
              <input
                value={editing.roll}
                onChange={(e) => setEditing({ ...editing, roll: e.target.value })}
                className="w-full p-2 rounded-md bg-white/10 text-white border border-white/10"
              />

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-md bg-white/5 text-white">Cancel</button>
                <button
                  onClick={() => onEditSave(editing)}
                  className="px-4 py-2 rounded-md bg-indigo-600 text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        @keyframes pulse-slow { 0%,100%{opacity:0.2}50%{opacity:0.3} }
        @keyframes spin-slow {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}
        .animate-float{ animation: float linear infinite; }
        .animate-pulse-slow{ animation: pulse-slow 4s ease-in-out infinite; }
        .animate-spin-slow{ animation: spin-slow 8s linear infinite; }
      `}</style>
        </div>
      </div>
    </div>
  );
};

export default MarkAttendance;
