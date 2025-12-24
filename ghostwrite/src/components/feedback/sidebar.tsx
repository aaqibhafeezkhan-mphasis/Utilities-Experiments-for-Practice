"use client";

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Calendar, Inbox, Settings, BarChart3, MessageSquarePlus } from 'lucide-react';

export function Sidebar({ currentWeek }: { currentWeek: number }) {
    const weeks = Array.from({ length: 5 }, (_, i) => currentWeek - i).filter(w => w > 0);

    return (
        <div className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">G</span>
                    </div>
                    <span className="text-white font-semibold text-lg tracking-tight">GhostWrite</span>
                </div>

                <nav className="space-y-1">
                    <Link
                        href="/dashboard"
                        className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                            "bg-slate-800 text-white"
                        )}
                    >
                        <Inbox className="w-4 h-4" />
                        Inbox
                    </Link>
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        <BarChart3 className="w-4 h-4" />
                        Admin Panel
                    </Link>
                </nav>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-3">
                    Weekly History
                </h3>
                <div className="space-y-1">
                    {weeks.map((week) => (
                        <Link
                            key={week}
                            href={`/dashboard?week=${week}`}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                                currentWeek === week ? "text-blue-400 font-medium" : "hover:text-white"
                            )}
                        >
                            <Calendar className="w-4 h-4" />
                            Week {week}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="p-6 border-t border-slate-800">
                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm hover:bg-slate-800 transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                </button>
            </div>
        </div>
    );
}
