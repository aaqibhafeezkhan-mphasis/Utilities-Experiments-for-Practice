import { createClient } from '@/lib/supabase/server';
import { sendSlackNotification } from '@/lib/slack';
import { getISOWeek, getYear } from 'date-fns';

export async function generateWeeklyDigest() {
    const supabase = await createClient();
    const now = new Date();
    const weekNumber = getISOWeek(now);
    const year = getYear(now);

    // 1. Get all teams
    const { data: teams } = await supabase.from('teams').select('*');

    if (!teams) return;

    for (const team of teams) {
        // 2. Notify team on Slack
        await sendSlackNotification({
            title: '👻 GhostWrite: Weekly Digest is Ready!',
            message: `Hi Team ${team.name}, your anonymous peer feedback for Week ${weekNumber} has been aggregated. Check your inbox to see what your colleagues appreciated about you this week!`,
            link: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
        });

        // In a real app, you would also trigger emails here using Resend or SendGrid.
    }

    return { success: true };
}

// API Route version for Vercel Cron
export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    await generateWeeklyDigest();
    return new Response('Digest generated', { status: 200 });
}
