import React from 'react';
import { motion } from 'motion/react';
import { Car, Users, AlertTriangle, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Active Rentals', value: '124', icon: Car, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Total Users', value: '8,432', icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Compliance Alerts', value: '3', icon: AlertTriangle, color: 'text-rose-400', bg: 'bg-rose-400/10' },
    { label: 'Revenue (Today)', value: '$4,250', icon: TrendingUp, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Platform Overview</h1>
        <p className="text-slate-400 mt-1">Welcome back. Here's what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-2xl flex items-start justify-between group hover:bg-white/5 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-slate-400">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 h-[400px] flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4">Revenue Analytics</h2>
          <div className="flex-1 flex items-center justify-center border border-dashed border-slate-700 rounded-xl bg-slate-800/30">
            <p className="text-slate-500">Chart visualization placeholder</p>
          </div>
        </div>
        <div className="glass-panel rounded-2xl p-6 h-[400px] flex flex-col">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <div>
                  <p className="text-sm text-slate-200">New booking #B{8400 + i}</p>
                  <p className="text-xs text-slate-500">{i * 15} mins ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
