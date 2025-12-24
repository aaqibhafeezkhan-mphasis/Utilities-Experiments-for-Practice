import { Sidebar } from '@/components/feedback/sidebar';
import { FeedbackList } from '@/components/feedback/feedback-list';
import { GiveFeedback } from '@/components/feedback/give-feedback';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: { week?: string };
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    const currentWeek = searchParams.week ? parseInt(searchParams.week) : 52; // Needs dynamic current week

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            {/* Left Sidebar: Week Selector */}
            <Sidebar currentWeek={currentWeek} />

            {/* Main Content Area */}
            <main className="flex-1 flex overflow-hidden">
                {/* Center Pane: Received Feedback */}
                <section className="flex-1 overflow-y-auto p-6 border-r border-slate-200 dark:border-slate-800">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <header className="flex items-center justify-between mb-8">
                            <h1 className="text-2xl font-bold tracking-tight">Your Feedback Digest</h1>
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-full text-sm font-medium">
                                Week {currentWeek}
                            </span>
                        </header>

                        <FeedbackList weekNumber={currentWeek} />
                    </div>
                </section>

                {/* Right Pane: Give Feedback */}
                <aside className="w-96 bg-white dark:bg-slate-900 p-6 overflow-y-auto hidden lg:block">
                    <div className="sticky top-0">
                        <h2 className="text-xl font-semibold mb-6">Share Appreciation</h2>
                        <GiveFeedback />
                    </div>
                </aside>
            </main>
        </div>
    );
}
