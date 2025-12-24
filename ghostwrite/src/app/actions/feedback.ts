'use server'

import { checkTone as checkToneAI } from '@/lib/openai/tone-check';
import { createClient } from '@/lib/supabase/server';
import { getISOWeek, getYear } from 'date-fns';

export async function checkToneAction(content: string) {
    return await checkToneAI(content);
}

export async function submitFeedback({
    toUserId,
    content,
    isAnonymous = true,
    isModeratedOverride = false,
    sentimentScore = 0.5
}: {
    toUserId: string;
    content: string;
    isAnonymous?: boolean;
    isModeratedOverride?: boolean;
    sentimentScore?: number;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('Unauthorized');

    // Get user's team and salt
    const { data: userData } = await supabase
        .from('users')
        .select('team_id, teams(salt)')
        .eq('id', user.id)
        .single();

    if (!userData?.team_id) throw new Error('User has no team');

    const teamSalt = (userData.teams as any)?.salt || '';

    // Hash the from_user_id
    const { data: hashData } = await supabase.rpc('hash_user_id' as any, {
        target_user_id: user.id,
        team_salt: teamSalt
    });

    const from_user_id_hash = hashData as string;

    const now = new Date();
    const weekNumber = getISOWeek(now);
    const year = getYear(now);

    const { error } = await supabase.from('feedback_submissions').insert({
        from_user_id_hash,
        to_user_id: toUserId,
        content,
        week_number: weekNumber,
        year,
        is_anonymous: isAnonymous,
        is_moderated_override: isModeratedOverride,
        ai_sentiment_score: sentimentScore
    } as any);

    if (error) throw error;

    return { success: true };
}
