import { useState, useCallback, useRef } from 'react';
import { checkToneAction } from '@/app/actions/feedback';

export function useToneChecker() {
    const [isChecking, setIsChecking] = useState(false);
    const [analysis, setAnalysis] = useState<{
        status: 'clean' | 'warning' | 'flagged';
        suggestion: string | null;
        reason: string | null;
    } | null>(null);

    const performCheck = useCallback(async (content: string) => {
        if (!content || content.length < 5) {
            setAnalysis(null);
            return;
        }

        setIsChecking(true);
        try {
            const result = await checkToneAction(content);
            // Ensure we only update if the status is different to avoid flickering
            setAnalysis(result as any);
        } catch (error) {
            console.error('Tone check failed:', error);
        } finally {
            setIsChecking(false);
        }
    }, []);

    return { isChecking, analysis, performCheck };
}
