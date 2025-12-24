-- Enable pgcrypto for encryption/hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Teams Table
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  admin_user_id UUID NOT NULL, -- The user who created the team
  weekly_prompt_day INTEGER DEFAULT 5, -- 1=Mon, 5=Fri
  salt TEXT NOT NULL DEFAULT gen_random_uuid()::text, -- Team-specific salt for anonymizing sender IDs
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Users Table (Extended from auth.users)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  team_id UUID REFERENCES teams(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Feedback Submissions
CREATE TABLE feedback_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id_hash TEXT NOT NULL, -- Encrypted/Hashed sender ID with team salt
  to_user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  ai_sentiment_score FLOAT, -- 0.0 to 1.0
  week_number INTEGER NOT NULL, -- ISO week number
  year INTEGER NOT NULL,
  is_anonymous BOOLEAN DEFAULT true,
  is_moderated_override BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Feedback Requests
CREATE TABLE feedback_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  requesting_user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  status TEXT CHECK (status IN ('active', 'fulfilled', 'archived')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reactions
CREATE TABLE reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  feedback_id UUID REFERENCES feedback_submissions(id) ON DELETE CASCADE NOT NULL,
  reactor_user_id_hash TEXT NOT NULL, -- Hashed reactor ID
  emoji_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(feedback_id, reactor_user_id_hash)
);

-- RLS POLICIES

ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- Users can see their own data
CREATE POLICY "Users can see own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Team members can see team metadata
CREATE POLICY "Team members can see team" ON teams
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.team_id = teams.id
    )
  );

-- Feedback Submissions Policies
-- 1. Users can see feedback sent TO them
CREATE POLICY "Users can see feedback sent to them" ON feedback_submissions
  FOR SELECT USING (to_user_id = auth.uid());

-- 2. Users can insert feedback
CREATE POLICY "Users can insert feedback" ON feedback_submissions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE users.id = auth.uid() AND users.team_id IS NOT NULL
    )
  );

-- 3. Admins can see aggregated data (but we'll handle this via views or specific queries that don't reveal IDs)
-- For the dashboard, we'll create a view that doesn't include sensitive info.

-- Feedback Requests Policies
-- 1. Everyone in the team can see active requests
CREATE POLICY "Team can see active requests" ON feedback_requests
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users u1 
      JOIN users u2 ON u1.team_id = u2.team_id 
      WHERE u1.id = auth.uid() AND u2.id = feedback_requests.requesting_user_id
    )
  );

-- 2. Users can create requests
CREATE POLICY "Users can create requests" ON feedback_requests
  FOR INSERT WITH CHECK (auth.uid() = requesting_user_id);

-- Reactions Policies
-- 1. Users can see reactions on feedback they can see
CREATE POLICY "Users can see reactions" ON reactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM feedback_submissions WHERE id = reactions.feedback_id AND to_user_id = auth.uid()
    )
  );

-- 2. Users can react to feedback sent to them
CREATE POLICY "Users can react" ON reactions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM feedback_submissions WHERE id = reactions.feedback_id AND to_user_id = auth.uid()
    )
  );

-- FUNCTIONS

-- Function to hash user ID with team salt
CREATE OR REPLACE FUNCTION hash_user_id(target_user_id UUID, team_salt TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN encode(digest(target_user_id::text || team_salt, 'sha256'), 'hex');
END;
$$ LANGUAGE plpgsql IMMUTABLE;
