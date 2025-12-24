"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/feedback/sidebar";
import { Users, TrendingUp, BarChart, ShieldAlert } from "lucide-react";

export default function AdminDashboard() {
    const stats = [
        {
            title: "Participation Rate",
            value: "84%",
            description: "+12% from last week",
            icon: Users,
            color: "text-blue-600",
            bg: "bg-blue-100",
        },
        {
            title: "Avg. Sentiment",
            value: "4.8/5",
            description: "Steady positive trend",
            icon: TrendingUp,
            color: "text-green-600",
            bg: "bg-green-100",
        },
        {
            title: "Constructive Ratio",
            value: "32%",
            description: "Normal for healthy teams",
            icon: BarChart,
            color: "text-purple-600",
            bg: "bg-purple-100",
        },
        {
            title: "Moderation Overrides",
            value: "2",
            description: "Manually reviewed: 2",
            icon: ShieldAlert,
            color: "text-orange-600",
            bg: "bg-orange-100",
        },
    ];

    return (
        <div className="flex h-screen bg-slate-50">
            <Sidebar currentWeek={52} />

            <main className="flex-1 overflow-y-auto p-10">
                <div className="max-w-5xl mx-auto">
                    <header className="mb-10">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Team Insights</h1>
                        <p className="text-slate-500 mt-2">
                            Aggregated metrics for Team <strong>Product Design</strong>. No individual data is shown to protect anonymity.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {stats.map((stat) => (
                            <Card key={stat.title}>
                                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                    <div className={`${stat.bg} p-2 rounded-lg`}>
                                        <stat.icon className={`w-4 h-4 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    <Card className="mb-10">
                        <CardHeader>
                            <CardTitle>Constructive Feedback Density</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] flex items-end gap-4 pb-4">
                                {[40, 60, 45, 70, 50, 80, 55].map((val, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                        <div
                                            className="w-full bg-blue-600/20 rounded-t-md relative group transition-all hover:bg-blue-600/40"
                                            style={{ height: `${val}%` }}
                                        >
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-slate-800 text-white text-xs px-2 py-1 rounded">
                                                {val}%
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-medium">Week {i + 46}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Top Commendations</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {["Collaboration", "Technical Quality", "Problem Solving", "Mentorship"].map((topic) => (
                                    <div key={topic} className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">{topic}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${Math.random() * 60 + 40}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Growth Areas</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {["Meeting Clarity", "Refactoring", "Documentation", "Project Sync"].map((topic) => (
                                    <div key={topic} className="flex items-center justify-between">
                                        <span className="text-sm text-slate-600">{topic}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-orange-400 rounded-full" style={{ width: `${Math.random() * 40 + 20}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}
