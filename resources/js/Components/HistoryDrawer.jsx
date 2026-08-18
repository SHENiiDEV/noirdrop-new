import React, { useState } from 'react';
import { X, Search, Clock, Copy, Check, Sparkles, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export default function HistoryDrawer({ isOpen, onClose, history, onSelectDrop }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  if (!isOpen) return null;

  const filteredHistory = (history || []).filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      (item.seo_title && item.seo_title.toLowerCase().includes(term)) ||
      (item.input_prompt && item.input_prompt.toLowerCase().includes(term))
    );
  });

  const handleCopyTitle = (e, item) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.seo_title);
    setCopiedId(item.id);
    toast.success('SEO Title copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md border-l border-zinc-800 bg-zinc-950 p-6 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white">Generation History</h2>
                  <p className="text-xs text-zinc-400">Past product drops saved to your account</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Search history..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* List Content */}
          <div className="my-4 flex-1 overflow-y-auto pr-1 space-y-3">
            {filteredHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-center px-4">
                <Sparkles className="h-8 w-8 text-zinc-600 mb-2 animate-pulse" />
                <p className="text-sm font-medium text-zinc-400">No drops found</p>
                <p className="text-xs text-zinc-600 mt-1">Generate your first product drop to see it listed here.</p>
              </div>
            ) : (
              filteredHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectDrop(item);
                    onClose();
                  }}
                  className="group relative cursor-pointer rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 transition-all duration-200 hover:border-purple-500/40 hover:bg-zinc-900 hover:shadow-lg hover:shadow-purple-500/5"
                >
                  <div className="flex items-start justify-between">
                    <div className="pr-2">
                      <p className="text-xs font-semibold text-white line-clamp-1 group-hover:text-purple-300">
                        {item.seo_title || item.input_prompt}
                      </p>
                      <p className="text-[11px] text-zinc-400 line-clamp-2 mt-1">
                        {item.input_prompt}
                      </p>
                      <p className="text-[10px] text-zinc-500 mt-2">
                        {new Date(item.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={(e) => handleCopyTitle(e, item)}
                        className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
                        title="Copy SEO Title"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <ChevronRight className="h-4 w-4 text-zinc-600 group-hover:text-purple-400 group-hover:translate-x-0.5 transition" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-zinc-800 text-center">
            <p className="text-[11px] text-zinc-500">
              Total Drops: <span className="font-semibold text-zinc-300">{history ? history.length : 0}</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
