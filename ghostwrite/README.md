# GhostWrite 👻

GhostWrite is a workplace tool for weekly anonymous peer appreciation and constructive feedback with AI-moderated tone checking. It helps remote teams build a culture of recognition and growth without the awkwardness of attribution.

## Features

- **Weekly Prompt System**: Encourages regular feedback exchange.
- **AI Tone Checker**: Real-time moderation using OpenAI GPT-4 to ensure feedback is constructive and respectful.
- **Anonymous Submissions**: Sender identities are hashed with a team-specific salt and nunca stored directly.
- **Kudos Digest**: Weekly aggregated feedback delivered to users every Friday.
- **Admin Dashboard**: Team-level analytics (participation, sentiment) with zero individual tracking.
- **Slack Integration**: Stay notified about feedback cycles via Slack webhooks.

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), TypeScript, Tailwind CSS (v4), shadcn/ui.
- **Backend**: Supabase (PostgreSQL, Auth, RLS).
- **AI**: OpenAI (Moderation API + GPT-4o).

## Getting Started

### 1. Prerequisites
- Node.js 18+
- Supabase account
- OpenAI API key

### 2. Setup Database
Run the SQL migration located in `supabase/migrations/0001_initial_schema.sql` in your Supabase SQL Editor.

### 3. Environment Variables
Copy `.env.example` to `.env.local` and fill in your credentials:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-api-key
SLACK_WEBHOOK_URL=your-slack-webhook-url
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Run Locally
```bash
npm run dev
```

## Security & Anonymity
- **Hashing**: Every feedback submission stores a `from_user_id_hash` created from the sender's ID and a secret team salt. This prevents direct linkage in the database.
- **RLS**: Row Level Security policies ensure that users can only see feedback sent TO them, and admins can only see aggregated views.
- **Moderation**: All feedback passes through OpenAI's Moderation API. GPT-4 provides real-time suggestions to rephrase harsh comments before they are sent.
