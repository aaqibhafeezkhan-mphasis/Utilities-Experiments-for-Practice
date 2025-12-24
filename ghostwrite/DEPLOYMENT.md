# Deployment Guide: GhostWrite

## Supabase Setup
1. Create a new Supabase project.
2. Go to the **SQL Editor** and paste the contents of `supabase/migrations/0001_initial_schema.sql`. Run it.
3. In **Authentication > Providers**, enable **Email** and ensure **Magic Link** is enabled.
4. Set the **Site URL** to your production URL (e.g., `https://ghostwrite.vercel.app`) and add `https://ghostwrite.vercel.app/auth/callback` to the redirect whitelist.

## Vercel Deployment
1. Connect your GitHub repository to Vercel.
2. Add the following Environment Variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OPENAI_API_KEY`
   - `SLACK_WEBHOOK_URL`
   - `NEXT_PUBLIC_APP_URL` (Use your Vercel production URL)
   - `CRON_SECRET` (A random string to secure your cron job)
3. Deploy!

## Weekly Cron Job
To trigger the weekly digest, setup a Vercel Cron or GitHub Action to call:
`GET https://your-app.vercel.app/api/cron/digest`
Header: `Authorization: Bearer YOUR_CRON_SECRET`

Recommended schedule: Every Friday at 4 PM.
