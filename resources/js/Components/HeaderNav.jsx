import React from 'react';
import { Link } from '@inertiajs/react';
import { Sparkles, History, PlusCircle, LogOut, User, Zap } from 'lucide-react';
import Dropdown from '@/Components/Dropdown';
import CurrencySwitcher from './CurrencySwitcher';

export default function HeaderNav({ user, tokensBalance, onOpenHistory, onOpenBuyTokens }) {
  const maxTokens = 100;
  const percentage = Math.min(100, Math.max(0, (tokensBalance / maxTokens) * 100));

  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <Link href="/dashboard" className="group flex items-center space-x-2.5">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20 transition-transform duration-300 group-hover:scale-105">
              <Sparkles className="h-5 w-5 text-white animate-pulse" />
              <div className="absolute -inset-0.5 rounded-xl bg-purple-500/30 opacity-0 blur transition-opacity group-hover:opacity-100" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-bold tracking-tight text-white">Noir<span className="text-purple-400">drop</span></span>
                <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-400 border border-purple-500/20">B2B SaaS</span>
              </div>
              <span className="text-[11px] text-zinc-400">1-Click Product Engine</span>
            </div>
          </Link>
        </div>

        {/* Action Controls & Tokens Balance */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Currency Switcher */}
          <CurrencySwitcher />

          {/* Token Progress Counter */}
          <div className="flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/90 px-3.5 py-1.5 text-xs text-zinc-300 shadow-inner">
            <Zap className="h-4 w-4 text-purple-400 fill-purple-400/20" />
            <div className="flex items-center space-x-1.5">
              <span className="font-semibold text-white">{tokensBalance}</span>
              <span className="text-zinc-500">/</span>
              <span className="text-zinc-400">Drops</span>
            </div>
            <div className="hidden h-1.5 w-12 rounded-full bg-zinc-800 sm:block overflow-hidden">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500" 
                style={{ width: `${percentage}%` }}
              />
            </div>
            <button
              onClick={onOpenBuyTokens}
              className="ml-1 flex items-center space-x-1 rounded-full bg-purple-600/20 px-2 py-0.5 text-[11px] font-medium text-purple-300 hover:bg-purple-600/30 hover:text-white transition"
              title="Top up tokens"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Top Up</span>
            </button>
          </div>

          {/* History Drawer Trigger */}
          <button
            onClick={onOpenHistory}
            className="flex items-center space-x-2 rounded-xl border border-zinc-800 bg-zinc-900/80 px-3.5 py-2 text-xs font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
          >
            <History className="h-4 w-4 text-purple-400" />
            <span className="hidden md:inline">History</span>
          </button>

          {/* User Profile Dropdown */}
          {user && (
            <div className="relative">
              <Dropdown>
                <Dropdown.Trigger>
                  <button className="flex items-center space-x-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline font-medium">{user.name}</span>
                  </button>
                </Dropdown.Trigger>

                <Dropdown.Content align="right" width="48" contentClasses="py-1 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
                  <div className="px-4 py-2 border-b border-zinc-800">
                    <p className="text-xs font-medium text-white">{user.name}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{user.email}</p>
                  </div>
                  <Dropdown.Link
                    href={route('profile.edit')}
                    className="flex items-center space-x-2 text-zinc-300 hover:bg-zinc-800 hover:text-white text-xs px-4 py-2"
                  >
                    <User className="h-3.5 w-3.5 text-zinc-400" />
                    <span>Profile Settings</span>
                  </Dropdown.Link>
                  <Dropdown.Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="flex w-full items-center space-x-2 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 text-xs px-4 py-2 text-left"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Log Out</span>
                  </Dropdown.Link>
                </Dropdown.Content>
              </Dropdown>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}
