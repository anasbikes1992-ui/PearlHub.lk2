import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, ShieldCheck, Users, Activity, Settings, Menu } from 'lucide-react';
import { cn } from './lib/utils';
import { motion } from 'motion/react';

// Pages
import Dashboard from './pages/Dashboard';
import TrackerPage from './pages/TrackerPage';
import AdminDashboard from './pages/AdminDashboard';
import SocialHub from './pages/SocialHub';
import CompliancePage from './pages/CompliancePage';

function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Map, label: 'Live Tracker', path: '/tracker' },
    { icon: ShieldCheck, label: 'Compliance', path: '/compliance' },
    { icon: Activity, label: 'Super Admin', path: '/admin' },
    { icon: Users, label: 'Social Hub', path: '/social' },
  ];

  return (
    <div className="w-64 h-screen glass-dark border-r border-white/10 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          PearlHub
        </span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" 
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-nav"
                  className="absolute inset-0 bg-indigo-500/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={cn("w-5 h-5 relative z-10", isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300")} />
              <span className="font-medium relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl glass-panel">
          <img src="https://picsum.photos/seed/admin/100/100" alt="Admin" className="w-10 h-10 rounded-full border border-white/20" />
          <div>
            <p className="text-sm font-medium text-white">Super Admin</p>
            <p className="text-xs text-slate-400">System Owner</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 relative">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tracker" element={<TrackerPage />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/social" element={<SocialHub />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
