export type Database = {
    public: {
        Tables: {
            teams: {
                Row: {
                    id: string
                    name: string
                    admin_user_id: string
                    weekly_prompt_day: number
                    salt: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    admin_user_id: string
                    weekly_prompt_day?: number
                    salt?: string
                    created_at?: string
                }
            }
            users: {
                Row: {
                    id: string
                    email: string
                    full_name: string
                    team_id: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name: string
                    team_id?: string | null
                    created_at?: string
                }
            }
            feedback_submissions: {
                Row: {
                    id: string
                    from_user_id_hash: string
                    to_user_id: string
                    content: string
                    ai_sentiment_score: number | null
                    week_number: number
                    year: number
                    is_anonymous: boolean
                    is_moderated_override: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    from_user_id_hash: string
                    to_user_id: string
                    content: string
                    ai_sentiment_score?: number | null
                    week_number: number
                    year: number
                    is_anonymous?: boolean
                    is_moderated_override?: boolean
                    created_at?: string
                }
            }
            feedback_requests: {
                Row: {
                    id: string
                    requesting_user_id: string
                    question: string
                    status: 'active' | 'fulfilled' | 'archived'
                    created_at: string
                }
                Insert: {
                    id?: string
                    requesting_user_id: string
                    question: string
                    status?: 'active' | 'fulfilled' | 'archived'
                    created_at?: string
                }
            }
            reactions: {
                Row: {
                    id: string
                    feedback_id: string
                    reactor_user_id_hash: string
                    emoji_type: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    feedback_id: string
                    reactor_user_id_hash: string
                    emoji_type: string
                    created_at?: string
                }
            }
        }
    }
}
