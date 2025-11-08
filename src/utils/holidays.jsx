import React, { useState } from 'react';
import StudentSidebar from '../components/StudentSidebar.jsx';

export default function Holidays() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [holidays, setHolidays] = useState([
    { id: 1, name: 'Founders Day', date: '2025-12-01', description: 'College foundation day' },
    { id: 2, name: 'Winter Break', date: '2025-12-24', description: 'Semester end break' }
  ]);
  const [form, setForm] = useState({ name: '', date: '', description: '' });
  const [editing, setEditing] = useState(null);

  const addHoliday = () => {
    if (!form.name || !form.date) return;
    setHolidays([{ id: Date.now(), ...form }, ...holidays]);
    setForm({ name: '', date: '', description: '' });
  };

  const deleteHoliday = id => setHolidays(holidays.filter(h => h.id !== id));

  const startEdit = h => { setEditing(h.id); setForm({ name: h.name, date: h.date, description: h.description }); };
  const saveEdit = () => { setHolidays(holidays.map(h => h.id === editing ? { ...h, ...form } : h)); setEditing(null); setForm({ name: '', date: '', description: '' }); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4 animate-fade-up">Holidays</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input placeholder="Name" className="p-3 rounded bg-white/5 text-white" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            <input placeholder="Date (YYYY-MM-DD)" className="p-3 rounded bg-white/5 text-white" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
            <input placeholder="Description" className="p-3 rounded bg-white/5 text-white" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>
          <div className="mb-6">
            {editing ? (
              <>
                <button onClick={saveEdit} className="px-4 py-2 bg-green-600 text-white rounded mr-2 shadow hover:scale-105 transition-transform">Save</button>
                <button onClick={() => { setEditing(null); setForm({ name: '', date: '', description: '' }); }} className="px-4 py-2 bg-gray-700 text-white rounded">Cancel</button>
              </>
            ) : (
              <button onClick={addHoliday} className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:scale-105 transition-transform">Add Holiday</button>
            )}
          </div>

          <div className="space-y-3">
            {holidays.map((h, idx) => (
              <div key={h.id} className="p-4 rounded-2xl bg-white/6 flex items-center justify-between backdrop-blur-xl border border-white/10 hover:scale-[1.02] transition-transform shadow-card animate-fade-up" style={{ animationDelay: `${idx * 40}ms` }}>
                <div>
                  <div className="text-white font-semibold">{h.name}</div>
                  <div className="text-sm text-blue-200/70">{h.date} • {h.description}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(h)} className="px-3 py-1 bg-yellow-600 text-white rounded">Edit</button>
                  <button onClick={() => deleteHoliday(h.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes fade-up { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
          .animate-fade-up { animation: fade-up 420ms ease both; }
          .shadow-card { box-shadow: 0 10px 30px rgba(30,41,59,0.2); }
        `}</style>
      </div>
    </div>
  );
}
