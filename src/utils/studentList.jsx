import React, { useState } from 'react';
import TeacherSidebar from '../components/TeacherSidebar.jsx';
import { Plus, Trash2, Edit } from 'lucide-react';

export default function StudentList() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [students, setStudents] = useState([
    { id: 1, name: 'Aarav Mehta', roll: 'CS2021001', email: 'aarav@example.com' },
    { id: 2, name: 'Priya Sharma', roll: 'CS2021002', email: 'priya@example.com' },
    { id: 3, name: 'Rohan Patel', roll: 'CS2021003', email: 'rohan@example.com' },
    { id: 4, name: 'Simran Kaur', roll: 'CS2021004', email: 'simran@example.com' },
    { id: 5, name: 'Aditya Verma', roll: 'CS2021005', email: 'aditya@example.com' },
    { id: 6, name: 'Nisha Rao', roll: 'CS2021006', email: 'nisha@example.com' },
    { id: 7, name: 'Karan Singh', roll: 'CS2021007', email: 'karan@example.com' }
  ]);

  const [editing, setEditing] = useState(null);

  const addStudent = () => {
    const s = { id: Date.now(), name: 'New Student', roll: '', email: '' };
    setStudents((p) => [...p, s]);
    setEditing(s);
  };

  const deleteStudent = (id) => {
    setStudents((p) => p.filter((s) => s.id !== id));
  };

  const saveEdit = (data) => {
    setStudents((p) => p.map((s) => (s.id === data.id ? { ...s, ...data } : s)));
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      <TeacherSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl text-white font-bold">Students</h1>
              <p className="text-purple-200 mt-1">Manage the class list — add, edit or remove students.</p>
            </div>
            <div>
              <button onClick={addStudent} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-white hover:bg-white/10">
                <Plus className="w-4 h-4" /> Add Student
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {students.map((s) => (
              <div key={s.id} className="relative backdrop-blur-xl bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-white font-semibold">{s.name}</div>
                  <div className="text-purple-200/70 text-sm">{s.roll} • {s.email}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditing(s)} className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-yellow-200">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteStudent(s.id)} className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {editing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/60" onClick={() => setEditing(null)} />
              <div className="relative bg-white/5 backdrop-blur-xl p-6 rounded-2xl w-full max-w-md">
                <h2 className="text-xl font-bold text-white mb-4">Edit Student</h2>
                <div className="space-y-3">
                  <label className="block text-sm text-purple-200">Name</label>
                  <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full p-2 rounded-md bg-white/10 text-white border border-white/10" />
                  <label className="block text-sm text-purple-200">Roll</label>
                  <input value={editing.roll} onChange={(e) => setEditing({ ...editing, roll: e.target.value })} className="w-full p-2 rounded-md bg-white/10 text-white border border-white/10" />
                  <label className="block text-sm text-purple-200">Email</label>
                  <input value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} className="w-full p-2 rounded-md bg-white/10 text-white border border-white/10" />
                  <div className="flex justify-end gap-2 mt-4">
                    <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-md bg-white/5 text-white">Cancel</button>
                    <button onClick={() => saveEdit(editing)} className="px-4 py-2 rounded-md bg-indigo-600 text-white">Save</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
