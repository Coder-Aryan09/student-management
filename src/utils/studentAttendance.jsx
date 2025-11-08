import React, { useState } from 'react';
import StudentSidebar from '../components/StudentSidebar.jsx';

export default function StudentAttendance() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [records, setRecords] = useState([
    { id: 1, date: '2025-11-01', subject: 'Data Structures', status: 'Present' },
    { id: 2, date: '2025-11-02', subject: 'Web Development', status: 'Absent' },
    { id: 3, date: '2025-11-03', subject: 'Database Systems', status: 'Present' }
  ]);
  const [form, setForm] = useState({ date: '', subject: '', status: 'Present' });
  const [editing, setEditing] = useState(null);

  const addRecord = () => {
    if (!form.date || !form.subject) return;
    const newRec = { id: Date.now(), date: form.date, subject: form.subject, status: form.status };
    setRecords([newRec, ...records]);
    setForm({ date: '', subject: '', status: 'Present' });
  };

  const deleteRecord = (id) => setRecords(records.filter(r => r.id !== id));

  const startEdit = (rec) => {
    setEditing(rec.id);
    setForm({ date: rec.date, subject: rec.subject, status: rec.status });
  };

  const saveEdit = () => {
    setRecords(records.map(r => r.id === editing ? { ...r, ...form } : r));
    setEditing(null);
    setForm({ date: '', subject: '', status: 'Present' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4 animate-fade-up">My Attendance</h2>

          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input className="p-3 rounded-lg bg-white/5 placeholder:text-slate-300 text-white" placeholder="Date (YYYY-MM-DD)" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
            <input className="p-3 rounded-lg bg-white/5 placeholder:text-slate-300 text-white" placeholder="Subject" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
            <select className="p-3 rounded-lg bg-white/5 text-white" value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option>Present</option>
              <option>Absent</option>
            </select>
          </div>

          <div className="flex gap-2 mb-6">
            {editing ? (
              <>
                <button onClick={saveEdit} className="px-4 py-2 bg-emerald-500 text-white rounded shadow hover:scale-105 transition-transform">Save</button>
                <button onClick={() => { setEditing(null); setForm({ date: '', subject: '', status: 'Present' }); }} className="px-4 py-2 bg-gray-700 text-white rounded">Cancel</button>
              </>
            ) : (
              <button onClick={addRecord} className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:scale-105 transition-transform">Add Attendance</button>
            )}
          </div>

          <div className="space-y-3">
            {records.map((rec, idx) => (
              <div key={rec.id} className="p-4 rounded-2xl bg-white/6 flex items-center justify-between backdrop-blur-xl border border-white/10 hover:scale-[1.02] transition-transform shadow-card animate-fade-up" style={{ animationDelay: `${idx * 40}ms` }}>
                <div>
                  <div className="text-white font-semibold">{rec.subject}</div>
                  <div className="text-sm text-blue-200/70">{rec.date}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-sm ${rec.status === 'Present' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>{rec.status}</div>
                  <button onClick={() => startEdit(rec)} className="px-3 py-1 bg-yellow-600 text-white rounded">Edit</button>
                  <button onClick={() => deleteRecord(rec.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-up { animation: fade-up 420ms ease both; }
        .shadow-card { box-shadow: 0 10px 30px rgba(30,41,59,0.2); }
      `}</style>
    </div>
  );
}
