import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { Sparkles, User, LogOut, LayoutDashboard } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-purple-500 selection:text-white flex flex-col">
            <nav className="sticky top-0 z-40 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        <div className="flex items-center space-x-6">
                            <Link href="/dashboard" className="flex items-center space-x-2.5 group">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/20">
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold tracking-tight text-white">Noir<span className="text-purple-400">drop</span></span>
                                </div>
                            </Link>

                            <div className="hidden space-x-4 sm:flex">
                                <Link
                                    href={route('dashboard')}
                                    className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-300 hover:bg-zinc-900 hover:text-white transition"
                                >
                                    <LayoutDashboard className="h-4 w-4 text-purple-400" />
                                    <span>Generator Dashboard</span>
                                </Link>
                            </div>
                        </div>

                        <div className="hidden sm:flex sm:items-center">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center space-x-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:border-zinc-700 hover:text-white transition">
                                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-purple-300 font-bold text-xs">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span>{user.name}</span>
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
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center rounded-lg p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white focus:outline-none"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden border-t border-zinc-800'}>
                    <div className="space-y-1 pb-3 pt-2 px-4">
                        <Link href={route('dashboard')} className="block py-2 text-sm text-zinc-300">
                            Dashboard
                        </Link>
                        <Link href={route('profile.edit')} className="block py-2 text-sm text-zinc-300">
                            Profile
                        </Link>
                        <Link href={route('logout')} method="post" as="button" className="block w-full text-left py-2 text-sm text-rose-400">
                            Log Out
                        </Link>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="border-b border-zinc-800 bg-zinc-900/50">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="flex-1">{children}</main>
        </div>
    );
}
