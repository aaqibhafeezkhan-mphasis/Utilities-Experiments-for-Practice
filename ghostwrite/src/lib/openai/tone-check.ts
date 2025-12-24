import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
}) : null;

export async function checkTone(content: string) {
    if (!openai) {
        // Mock response if OpenAI is not configured
        return {
            status: 'clean',
            suggestion: null,
            reason: 'OpenAI not configured - running in mock mode',
        };
    }

    // 1. Run Moderation API
    const moderation = await openai.moderations.create({ input: content });
    const [results] = moderation.results;

    if (results.flagged) {
        return {
            status: 'flagged',
            reasons: Object.entries(results.categories)
                .filter(([_, v]) => v)
                .map(([k]) => k),
        };
    }

    // 2. GPT-4 Tone Analysis
    const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {
                role: 'system',
                content: `Analyze this workplace feedback for tone. If it contains passive-aggressive, sarcastic, or demotivating language, flag it and suggest a constructive rephrase. 
        Format your response as a JSON object: { "is_harsh": boolean, "suggestion": string | null, "reason": string | null }`,
            },
            {
                role: 'user',
                content: `Feedback: ${content}`,
            },
        ],
        response_format: { type: 'json_object' },
    });

    const analysis = JSON.parse(response.choices[0].message.content || '{}');

    return {
        status: analysis.is_harsh ? 'warning' : 'clean',
        suggestion: analysis.suggestion,
        reason: analysis.reason,
    };
}
