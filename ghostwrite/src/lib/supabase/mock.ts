import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database } from './types'

// Mock implementation of Supabase client
export const mockSupabaseClient = {
    auth: {
        getUser: async () => ({
            data: {
                user: {
                    id: 'mock-user-id',
                    email: 'mock@example.com',
                    user_metadata: { full_name: 'Mock User' }
                }
            },
            error: null
        }),
        signInWithOtp: async () => ({ data: { user: null, session: null }, error: null }),
        signOut: async () => ({ error: null }),
        exchangeCodeForSession: async (code: string) => ({ data: { user: {}, session: {} }, error: null }),
    },
    from: (table: string) => ({
        select: (query: string) => ({
            eq: (col: string, val: any) => ({
                single: async () => {
                    if (table === 'users') {
                        return { data: { id: 'mock-user-id', team_id: 'mock-team-id', teams: { salt: 'mock-salt' } }, error: null }
                    }
                    return { data: null, error: null }
                },
                order: (col: string, { ascending }: any) => ({
                    data: [],
                    error: null
                }),
                limit: (count: number) => ({
                    data: [],
                    error: null
                })
            }),
            order: (col: string, { ascending }: any) => ({
                data: [],
                error: null
            }),
            limit: (count: number) => ({
                data: [],
                error: null
            })
        }),
        insert: (data: any) => ({
            select: () => ({
                single: async () => ({ data: { id: 'mock-id', ...data }, error: null }),
            }),
            error: null
        }),
        update: (data: any) => ({
            eq: (col: string, val: any) => ({
                select: () => ({
                    single: async () => ({ data: { id: 'mock-id', ...data }, error: null }),
                }),
            }),
        }),
    }),
    rpc: async (fn: string, args: any) => {
        if (fn === 'hash_user_id') {
            return { data: 'mock-hash-' + args.target_user_id, error: null }
        }
        return { data: null, error: null }
    }
} as any

export function getClient() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key || url === 'your-project-url') {
        return mockSupabaseClient
    }

    return null // Return null to indicate we should use the real client
}
