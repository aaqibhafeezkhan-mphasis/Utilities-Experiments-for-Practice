"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, Heart, Lightbulb } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Feedback {
    id: string;
    content: string;
    created_at: string;
    is_requested?: boolean;
}

export function FeedbackList({ weekNumber }: { weekNumber: number }) {
    // Demo data for now
    const feedbackItems: Feedback[] = [
        {
            id: "1",
            content: "Your presentation today was fantastic! The way you simplified the complex architecture was impressive. Keep it up!",
            created_at: new Date().toISOString(),
            is_requested: false,
        },
        {
            id: "2",
            content: "The feedback you gave on the PR was very constructive. I appreciated how you pointed out the edge cases I missed without being discouraging.",
            created_at: new Date(Date.now() - 86400000).toISOString(),
            is_requested: true,
        }
    ];

    if (feedbackItems.length === 0) {
        return (
            <div className="text-center py-20 bg-slate-100 rounded-xl border-2 border-dashed border-slate-200">
                <p className="text-slate-500">No feedback received for this week yet.</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6">
            {feedbackItems.map((item) => (
                <FeedbackCard key={item.id} feedback={item} />
            ))}
        </div>
    );
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
    return (
        <Card className="group relative overflow-hidden transition-all hover:shadow-md hover:translate-y-[-2px] bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/30">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-medium text-slate-500">
                        {formatDistanceToNow(new Date(feedback.created_at))} ago
                    </span>
                    {feedback.is_requested && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                            Requested Feedback
                        </Badge>
                    )}
                </div>

                <p className="text-slate-800 dark:text-slate-100 leading-relaxed text-lg italic serif font-medium">
                    "{feedback.content}"
                </p>

                <div className="mt-6 flex items-center gap-2">
                    <button className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors">
                        <ThumbsUp className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors">
                        <Heart className="w-4 h-4 text-slate-400 group-hover:text-red-500" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors">
                        <Lightbulb className="w-4 h-4 text-slate-400 group-hover:text-yellow-500" />
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
