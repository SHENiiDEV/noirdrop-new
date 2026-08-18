import React, { useState } from 'react';
import { Copy, Check, Eye, Code2 } from 'lucide-react';
import { toast } from 'sonner';

export default function BentoCard({ icon: Icon, title, badgeText, copyText, isHtml = false, children, className = '' }) {
  const [copied, setCopied] = useState(false);
  const [showCodeView, setShowCodeView] = useState(false);

  const handleCopy = () => {
    const textToCopy = showCodeView && copyText ? copyText : (copyText || '');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success(`${title} copied to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-5 backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:bg-zinc-900/80 hover:shadow-xl hover:shadow-purple-500/5 ${className}`}>
      
      {/* Subtle Card Glow Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3 mb-4">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 group-hover:scale-105 transition-transform">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">{title}</h3>
            {badgeText && (
              <span className="text-[10px] text-zinc-400">{badgeText}</span>
            )}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-1.5">
          {isHtml && (
            <button
              onClick={() => setShowCodeView(!showCodeView)}
              className="flex items-center space-x-1 rounded-lg border border-zinc-800 bg-zinc-950 px-2 py-1 text-[11px] font-medium text-zinc-400 hover:border-zinc-700 hover:text-white transition"
              title={showCodeView ? 'View Rendered' : 'View HTML Code'}
            >
              {showCodeView ? <Eye className="h-3.5 w-3.5" /> : <Code2 className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{showCodeView ? 'Preview' : 'HTML'}</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-semibold text-purple-300 hover:bg-purple-500/20 hover:text-white transition"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="relative text-xs leading-relaxed text-zinc-300">
        {isHtml && showCodeView ? (
          <pre className="overflow-x-auto rounded-xl bg-zinc-950 p-3 text-[11px] font-mono text-purple-300 border border-zinc-800/80">
            <code>{copyText}</code>
          </pre>
        ) : (
          children
        )}
      </div>

    </div>
  );
}
