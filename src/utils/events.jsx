import React, { useState } from 'react';
import StudentSidebar from '../components/StudentSidebar.jsx';

export default function Events() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [events, setEvents] = useState([
    { id: 1, title: 'Tech Talk', date: '2025-11-20', location: 'Auditorium', description: 'AI in 2025' },
    { id: 2, title: 'Hackathon', date: '2025-12-05', location: 'Lab A', description: '48 hour coding sprint' }
  ]);
  const [form, setForm] = useState({ title: '', date: '', location: '', description: '' });
  const [editing, setEditing] = useState(null);

  const addEvent = () => {
    if (!form.title || !form.date) return;
    setEvents([{ id: Date.now(), ...form }, ...events]);
    setForm({ title: '', date: '', location: '', description: '' });
  };
  const deleteEvent = id => setEvents(events.filter(e => e.id !== id));
  const startEdit = e => { setEditing(e.id); setForm({ title: e.title, date: e.date, location: e.location, description: e.description }); };
  const saveEdit = () => { setEvents(events.map(e => e.id === editing ? { ...e, ...form } : e)); setEditing(null); setForm({ title: '', date: '', location: '', description: '' }); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4 animate-fade-up">Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <input placeholder="Title" className="p-3 rounded bg-white/5 text-white" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            <input placeholder="Date" className="p-3 rounded bg-white/5 text-white" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
            <input placeholder="Location" className="p-3 rounded bg-white/5 text-white" value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
            <input placeholder="Description" className="p-3 rounded bg-white/5 text-white" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          </div>

          <div className="mb-6">
            {editing ? (
              <>
                <button onClick={saveEdit} className="px-4 py-2 bg-green-600 text-white rounded mr-2 shadow hover:scale-105 transition-transform">Save</button>
                <button onClick={() => { setEditing(null); setForm({ title: '', date: '', location: '', description: '' }); }} className="px-4 py-2 bg-gray-700 text-white rounded">Cancel</button>
              </>
            ) : (
              <button onClick={addEvent} className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:scale-105 transition-transform">Add Event</button>
            )}
          </div>

          <div className="space-y-3">
            {events.map((ev, idx) => (
              <div key={ev.id} className="p-4 rounded-2xl bg-white/6 flex items-center justify-between backdrop-blur-xl border border-white/10 hover:scale-[1.02] transition-transform shadow-card animate-fade-up" style={{ animationDelay: `${idx * 40}ms` }}>
                <div>
                  <div className="text-white font-semibold">{ev.title}</div>
                  <div className="text-sm text-blue-200/70">{ev.date} • {ev.location}</div>
                  <div className="text-sm text-blue-100">{ev.description}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(ev)} className="px-3 py-1 bg-yellow-600 text-white rounded">Edit</button>
                  <button onClick={() => deleteEvent(ev.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
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
