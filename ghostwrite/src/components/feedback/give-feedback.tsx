"use client";

import { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToneChecker } from '@/hooks/use-tone-checker';
import { submitFeedback } from '@/app/actions/feedback';
import { AlertTriangle, Sparkles, Send } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from '@/lib/utils';

export function GiveFeedback() {
    const [content, setContent] = useState('');
    const [targetUser, setTargetUser] = useState('demo-id'); // In real app, this would be a select
    const { isChecking, analysis, performCheck } = useToneChecker();
    const [isPending, startTransition] = useTransition();

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const val = e.target.value;
        setContent(val);

        // Debounced tone check (simplified for now)
        const timeout = setTimeout(() => {
            performCheck(val);
        }, 1000);
        return () => clearTimeout(timeout);
    };

    const handleSubmit = (override = false) => {
        startTransition(async () => {
            await submitFeedback({
                toUserId: targetUser,
                content,
                isModeratedOverride: override
            });
            setContent('');
            alert('Feedback sent anonymously!');
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-500">To Colleague (Randomly Selected or Requested)</label>
                <div className="px-3 py-2 bg-slate-100 rounded-lg text-sm text-slate-700 font-medium">
                    Alex Johnson
                </div>
            </div>

            <div className="space-y-4">
                <div className="relative">
                    <Textarea
                        placeholder="What did they do well this week? What could be improved?"
                        className="min-h-[200px] resize-none border-slate-200 focus:ring-blue-500"
                        value={content}
                        onChange={handleContentChange}
                    />
                    {isChecking && (
                        <div className="absolute top-2 right-2">
                            <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                        </div>
                    )}
                </div>

                {analysis?.status === 'warning' && (
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg space-y-3">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-orange-900">
                                    Tone Warning: {analysis.reason}
                                </p>
                                <p className="text-sm text-orange-800 mt-1">
                                    This might sound harsh. Try: "{analysis.suggestion}"
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                className="bg-white text-orange-900 border-orange-200"
                                onClick={() => setContent(analysis.suggestion || '')}
                            >
                                Use Suggestion
                            </Button>
                        </div>
                    </div>
                )}

                {analysis?.status === 'flagged' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-red-900">
                                    Submission Blocked
                                </p>
                                <p className="text-sm text-red-800 mt-1">
                                    Your feedback contains language that violates our community standards. Please rephrase to be constructive.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-3">
                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={!content || isChecking || analysis?.status === 'flagged' || isPending}
                        onClick={() => handleSubmit(false)}
                    >
                        <Send className="w-4 h-4 mr-2" />
                        {isPending ? 'Sending...' : 'Send Anonymously'}
                    </Button>

                    {analysis?.status === 'warning' && (
                        <button
                            className="text-xs text-slate-400 hover:text-slate-600 underline text-center"
                            onClick={() => handleSubmit(true)}
                        >
                            I understand, send as is (log for moderation)
                        </button>
                    )}
                </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl">
                <h4 className="text-xs font-bold text-blue-700 uppercase mb-2">Weekly Tip</h4>
                <p className="text-xs text-blue-600 leading-relaxed">
                    The best constructive feedback is specific, actionable, and focused on behaviors rather than personality traits.
                </p>
            </div>
        </div>
    );
}
