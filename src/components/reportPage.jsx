import React, { useState } from 'react';
import TeacherSidebar from './TeacherSidebar.jsx';

export default function ReportPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
  <div className="min-h-screen bg-linear-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
      <TeacherSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`transition-all duration-500 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <div className="p-8 min-h-[80vh] flex items-center justify-center">
          <h1 className="coming-soon">COMING SOON!!</h1>
        </div>
      </div>

      <style jsx>{`
        .coming-soon {
          font-size: 6rem;
          font-weight: 800;
          letter-spacing: 0.02em;
          background: linear-gradient(90deg, rgba(255,255,255,0.9) 0%, #a78bfa 30%, #60a5fa 60%, rgba(255,255,255,0.9) 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-align: center;
          animation: shimmer 3s linear infinite, fade 2.8s ease-in-out infinite;
          margin: 0;
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @keyframes fade {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }

        @media (max-width: 640px) {
          .coming-soon { font-size: 2.2rem; }
        }
      `}</style>
    </div>
  );
}
