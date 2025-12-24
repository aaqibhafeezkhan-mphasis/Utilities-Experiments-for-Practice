"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/client';
import { Mail, Loader2, Sparkles } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
            setIsSent(true);
        } catch (error) {
            alert('Error sending magic link. Please check your email.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
            </div>

            <Card className="w-full max-w-md bg-slate-900 border-slate-800 text-slate-100 relative z-10 shadow-2xl">
                <CardHeader className="space-y-4 pb-8">
                    <div className="flex justify-center">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                    </div>
                    <div className="space-y-2 text-center">
                        <CardTitle className="text-3xl font-bold tracking-tight">GhostWrite</CardTitle>
                        <CardDescription className="text-slate-400">
                            Transforming workplace feedback through safe, anonymous appreciation.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    {!isSent ? (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Work Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                                    <Input
                                        type="email"
                                        placeholder="name@company.com"
                                        className="pl-10 bg-slate-800 border-slate-700 focus:ring-blue-500 text-white h-11"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 font-semibold text-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                ) : (
                                    "Send Magic Link"
                                )}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center py-8 space-y-4">
                            <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                <Mail className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-xl font-semibold">Check your email</h3>
                            <p className="text-slate-400">
                                We've sent a magic link to <strong>{email}</strong>. Click it to log in securely.
                            </p>
                            <Button
                                variant="ghost"
                                className="text-slate-400 hover:text-white mt-4"
                                onClick={() => setIsSent(false)}
                            >
                                Use a different email
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
