import React, { useState } from 'react';
import StudentSidebar from '../components/StudentSidebar.jsx';

export default function Notes() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notes, setNotes] = useState([
    { id: 1, title: 'Revision Topics', content: 'Focus on graphs and trees.' }
  ]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [editing, setEditing] = useState(null);

  const addNote = () => { if (!form.title) return; setNotes([{ id: Date.now(), ...form }, ...notes]); setForm({ title: '', content: '' }); };
  const deleteNote = id => setNotes(notes.filter(n => n.id !== id));
  const startEdit = n => { setEditing(n.id); setForm({ title: n.title, content: n.content }); };
  const saveEdit = () => { setNotes(notes.map(n => n.id === editing ? { ...n, ...form } : n)); setEditing(null); setForm({ title: '', content: '' }); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4 animate-fade-up">Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input placeholder="Title" className="p-3 rounded bg-white/5 text-white" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
            <input placeholder="Content" className="p-3 rounded bg-white/5 text-white" value={form.content} onChange={e => setForm({...form, content: e.target.value})} />
          </div>

          <div className="mb-6">
            {editing ? (
              <>
                <button onClick={saveEdit} className="px-4 py-2 bg-green-600 text-white rounded mr-2 shadow hover:scale-105 transition-transform">Save</button>
                <button onClick={() => { setEditing(null); setForm({ title: '', content: '' }); }} className="px-4 py-2 bg-gray-700 text-white rounded">Cancel</button>
              </>
            ) : (
              <button onClick={addNote} className="px-4 py-2 bg-indigo-600 text-white rounded shadow hover:scale-105 transition-transform">Add Note</button>
            )}
          </div>

          <div className="space-y-3">
            {notes.map((n, idx) => (
              <div key={n.id} className="p-4 rounded-2xl bg-white/6 flex items-start justify-between backdrop-blur-xl border border-white/10 hover:scale-[1.02] transition-transform shadow-card animate-fade-up" style={{ animationDelay: `${idx * 40}ms` }}>
                <div>
                  <div className="text-white font-semibold">{n.title}</div>
                  <div className="text-sm text-blue-100 mt-1">{n.content}</div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button onClick={() => startEdit(n)} className="px-3 py-1 bg-yellow-600 text-white rounded">Edit</button>
                  <button onClick={() => deleteNote(n.id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
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
