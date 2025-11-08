import React from 'react';
import { Check, X, RotateCw, Edit } from 'lucide-react';

export default function CardStudent({ student, onMark, onReset, onEdit, locked }) {
  const { id, name, roll, status } = student;

  return (
    <div className="relative backdrop-blur-xl bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
          <div className="text-white font-semibold">{roll ? roll.slice(-3) : '---'}</div>
        </div>
        <div>
          <div className="text-white font-medium">{name || 'Unnamed'}</div>
          <div className="text-purple-200/70 text-sm">{roll || 'No Roll'}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onMark(id, 'P')}
          disabled={locked || status !== null}
          className={`px-3 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 ${
            status === 'P' ? 'bg-green-500/20 text-green-300 border border-green-400/50' : 'bg-white/5 text-green-200 hover:bg-green-500/10'
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <Check className="w-4 h-4" /> P
        </button>

        <button
          onClick={() => onMark(id, 'A')}
          disabled={locked || status !== null}
          className={`px-3 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 ${
            status === 'A' ? 'bg-red-500/20 text-red-300 border border-red-400/50' : 'bg-white/5 text-red-200 hover:bg-red-500/10'
          } disabled:opacity-40 disabled:cursor-not-allowed`}
        >
          <X className="w-4 h-4" /> A
        </button>

        <button
          onClick={() => onReset(id)}
          title="Reset status"
          disabled={locked}
          className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-blue-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        <button
          onClick={() => onEdit(student)}
          title="Edit student"
          disabled={locked}
          className="p-2 rounded-md bg-white/5 hover:bg-white/10 text-yellow-200 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Edit className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
