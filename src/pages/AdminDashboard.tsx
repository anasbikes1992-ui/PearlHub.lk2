import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Trash2, CheckCircle, Search, X } from 'lucide-react';

export default function AdminDashboard() {
  const [items, setItems] = useState([
    { id: 'REQ-892', type: 'Vehicle Listing', user: 'John Doe', status: 'pending', risk: 'high' },
    { id: 'REQ-893', type: 'Driver KYC', user: 'Alice Smith', status: 'pending', risk: 'low' },
    { id: 'REQ-894', type: 'Payout Request', user: 'Bob Wilson', status: 'flagged', risk: 'critical' },
  ]);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const handleForceApprove = async (id: string) => {
    setActionLoading(true);
    try {
      await fetch(`/api/admin/force-approve/${id}`, { method: 'POST' });
      setItems(items.filter(item => item.id !== id));
      setSelectedItem(null);
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  const handleHardDelete = async (id: string) => {
    setActionLoading(true);
    try {
      await fetch(`/api/admin/hard-delete/${id}`, { method: 'DELETE' });
      setItems(items.filter(item => item.id !== id));
      setSelectedItem(null);
    } catch (e) {
      console.error(e);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 relative"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-rose-500 tracking-tight flex items-center gap-3">
          <ShieldAlert className="w-8 h-8" />
          SuperAdmin Console
        </h1>
        <p className="text-slate-400 mt-1">Elevated privileges. Actions taken here are irreversible.</p>
      </header>

      <div className="glass-panel rounded-2xl overflow-hidden border border-rose-500/20">
        <div className="p-4 border-b border-white/10 bg-black/20 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Pending Escalations</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search ID..." 
              className="bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-rose-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {items.map((item) => (
            <div key={item.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-colors">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm text-slate-300">{item.id}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    item.risk === 'critical' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                    item.risk === 'high' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}>
                    {item.risk.toUpperCase()} RISK
                  </span>
                </div>
                <p className="text-white font-medium mt-1">{item.type}</p>
                <p className="text-sm text-slate-400">Requested by: {item.user}</p>
              </div>
              
              <button 
                onClick={() => setSelectedItem(item.id)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors"
              >
                Review Action
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No pending escalations.
            </div>
          )}
        </div>
      </div>

      {/* Glassmorphic Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md glass-dark rounded-2xl p-6 border border-rose-500/30 shadow-2xl shadow-rose-500/10"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center mb-4 border border-rose-500/30">
                <ShieldAlert className="w-6 h-6 text-rose-400" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">SuperAdmin Action</h3>
              <p className="text-slate-300 text-sm mb-6">
                You are about to perform an irreversible action on <span className="font-mono text-rose-400">{selectedItem}</span>. Please select carefully.
              </p>

              <div className="space-y-3">
                <button 
                  onClick={() => handleForceApprove(selectedItem)}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  <CheckCircle className="w-5 h-5" />
                  Force Approve
                </button>
                <button 
                  onClick={() => handleHardDelete(selectedItem)}
                  disabled={actionLoading}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-5 h-5" />
                  Hard Delete (Purge)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
