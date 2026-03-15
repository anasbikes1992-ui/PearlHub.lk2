import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, CheckCircle2, AlertCircle, Clock, Download, Shield } from 'lucide-react';

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState('agreements');

  const agreements = [
    { id: 'MSA-001', role: 'Driver', status: 'active', date: '2026-03-10', users: 1240 },
    { id: 'MSA-002', role: 'Fleet Owner', status: 'pending_review', date: '2026-03-14', users: 45 },
    { id: 'TOS-004', role: 'Customer', status: 'active', date: '2026-01-15', users: 8902 },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Compliance & Legal</h1>
          <p className="text-slate-400 mt-1">Manage Master Service Agreements and role-based policies.</p>
        </div>
        <button className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium transition-colors flex items-center gap-2 shadow-lg shadow-indigo-500/20">
          <Shield className="w-4 h-4" />
          New Policy
        </button>
      </header>

      <div className="flex gap-4 border-b border-white/10 pb-px">
        {['agreements', 'audits', 'kyc'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition-colors ${
              activeTab === tab 
                ? 'border-indigo-500 text-indigo-400' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {activeTab === 'agreements' && (
        <div className="grid grid-cols-1 gap-4">
          {agreements.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-5 rounded-2xl flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center border border-white/5">
                  <FileText className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-white">{doc.id}</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-300 text-xs font-medium border border-white/10">
                      {doc.role}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">Last updated: {doc.date} â¢ {doc.users} active users</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  {doc.status === 'active' ? (
                    <span className="flex items-center gap-1.5 text-sm text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                      <CheckCircle2 className="w-4 h-4" /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-sm text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                      <Clock className="w-4 h-4" /> Pending Review
                    </span>
                  )}
                </div>
                <button className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab !== 'agreements' && (
        <div className="glass-panel p-12 rounded-2xl flex flex-col items-center justify-center text-center border border-dashed border-slate-700">
          <AlertCircle className="w-12 h-12 text-slate-500 mb-4" />
          <h3 className="text-lg font-medium text-white">Module in Development</h3>
          <p className="text-slate-400 mt-2 max-w-md">The {activeTab} module is currently being integrated with third-party compliance providers.</p>
        </div>
      )}
    </motion.div>
  );
}
