-- Add missing columns to team_registrations table
ALTER TABLE team_registrations 
ADD COLUMN IF NOT EXISTS present BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS rating INTEGER CHECK (rating >= 0 AND rating <= 10),
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Add missing columns to project_ideas table
ALTER TABLE project_ideas 
ADD COLUMN IF NOT EXISTS rating INTEGER CHECK (rating >= 0 AND rating <= 10),
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Create leaderboard table for team scores across rounds
CREATE TABLE IF NOT EXISTS leaderboard (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL UNIQUE,
    total_members INTEGER NOT NULL DEFAULT 0,
    linkedin_posts INTEGER NOT NULL DEFAULT 0,
    round1_points INTEGER NOT NULL DEFAULT 0,
    round2_points INTEGER DEFAULT 0,
    round3_points INTEGER DEFAULT 0,
    round3_technical_points INTEGER DEFAULT 0,
    round3_presentation_points INTEGER DEFAULT 0,
    total_points INTEGER GENERATED ALWAYS AS (
        COALESCE(round1_points, 0) + 
        COALESCE(round2_points, 0) + 
        COALESCE(round3_points, 0) + 
        COALESCE(round3_technical_points, 0) + 
        COALESCE(round3_presentation_points, 0)
    ) STORED,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_team_registrations_present ON team_registrations(present);
CREATE INDEX IF NOT EXISTS idx_team_registrations_rating ON team_registrations(rating);
CREATE INDEX IF NOT EXISTS idx_project_ideas_rating ON project_ideas(rating);
CREATE INDEX IF NOT EXISTS idx_leaderboard_team_name ON leaderboard(team_name);
CREATE INDEX IF NOT EXISTS idx_leaderboard_total_points ON leaderboard(total_points DESC);
CREATE INDEX IF NOT EXISTS idx_leaderboard_round1_points ON leaderboard(round1_points DESC);

-- Add comments for documentation
COMMENT ON COLUMN team_registrations.present IS 'Whether the team is present at the event';
COMMENT ON COLUMN team_registrations.rating IS 'Team rating from 0-10 stars';
COMMENT ON COLUMN team_registrations.created_at IS 'Timestamp when the team was registered';
COMMENT ON COLUMN project_ideas.rating IS 'Project idea rating from 0-10 stars';
COMMENT ON COLUMN project_ideas.created_at IS 'Timestamp when the project idea was submitted';
COMMENT ON COLUMN leaderboard.team_name IS 'Name of the team';
COMMENT ON COLUMN leaderboard.total_members IS 'Total number of team members';
COMMENT ON COLUMN leaderboard.linkedin_posts IS 'Number of LinkedIn posts made by team';
COMMENT ON COLUMN leaderboard.round1_points IS 'Points earned in Round 1';
COMMENT ON COLUMN leaderboard.round2_points IS 'Points earned in Round 2';
COMMENT ON COLUMN leaderboard.round3_points IS 'Points earned in Round 3';
COMMENT ON COLUMN leaderboard.round3_technical_points IS 'Technical points in Round 3';
COMMENT ON COLUMN leaderboard.round3_presentation_points IS 'Presentation points in Round 3';
COMMENT ON COLUMN leaderboard.total_points IS 'Total points across all rounds (computed)';

-- Update existing records to have default values
UPDATE team_registrations SET present = FALSE WHERE present IS NULL;
UPDATE team_registrations SET rating = 0 WHERE rating IS NULL;
UPDATE team_registrations SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL;
UPDATE project_ideas SET rating = 0 WHERE rating IS NULL;
UPDATE project_ideas SET created_at = CURRENT_TIMESTAMP WHERE created_at IS NULL;

-- Insert Round 1 data
INSERT INTO leaderboard (team_name, total_members, linkedin_posts, round1_points) VALUES
('.404 FOUND', 5, 5, 5),
('3VP (3 Visionary Programmers)', 3, 3, 5),
('404 Coder Not Found', 5, 5, 5),
('404 found', 5, 5, 5),
('404 Founders', 5, 5, 5),
('404 Founders (External)', 3, 3, 5),
('8-BIT', 4, 4, 5),
('ABC', 5, 5, 5),
('ACTIVE LEARNERS✨️', 2, 1, 0),
('Æegris', 4, 1, 0),
('Algo Ninjas', 5, 5, 5),
('Anjani', 5, 4, 0),
('Beyond Boundaries', 4, 4, 5),
('Binary brains', 4, 4, 5),
('BUG - SLAYER', 5, 5, 5),
('Bug Buster', 5, 5, 5),
('BugHiBug', 5, 5, 5),
('Byte Bandits', 5, 3, 0),
('Chill code club', 5, 5, 5),
('Code Catalyst', 4, 4, 5),
('Code Catalysts', 5, 4, 0),
('Code Commanders', 2, 1, 0),
('Code Crew', 5, 5, 5),
('Code hunt', 3, 1, 0),
('Code Quest', 5, 5, 5),
('Code Rebels', 4, 4, 5),
('CODE STORM (external)', 2, 2, 5),
('Code verz', 5, 1, 0),
('Code_Rafters', 4, 1, 0),
('Code-Edge', 5, 2, 0),
('Code2gether', 2, 2, 5),
('Code4Cause', 2, 2, 5),
('CodeMerners', 4, 4, 5),
('Codestorm', 4, 4, 5),
('CodeV', 5, 5, 5),
('Codeverz', 5, 4, 0),
('CodeXhunters', 5, 5, 5),
('CODING SPARTANS', 5, 5, 5),
('Codyssey', 5, 5, 5),
('coffee-codes', 5, 5, 5),
('CreativeBuddies', 5, 1, 0),
('CRYPTOXIS', 5, 5, 5),
('Ctrl Alt Defeat', 5, 5, 5),
('Ctrl Alt Elite', 4, 4, 5),
('Ctrl+Z', 5, 1, 0),
('Debug Thugs', 4, 4, 5),
('DoubleR', 2, 2, 5),
('Duo devs', 2, 2, 5),
('Dynamic coders', 5, 1, 0),
('Elite Coders (Team Elite)', 4, 4, 5),
('Error 404', 5, 5, 5),
('ERROR BREAKERS', 5, 5, 5),
('ExpressOPS', 5, 5, 5),
('F3', 3, 1, 0),
('Future_frames', 1, 1, 5),
('Genix', 2, 1, 0),
('Git Gud', 4, 1, 0),
('Godlike', 5, 1, 0),
('HACKON 5', 5, 1, 0),
('Hackstreet boys', 4, 4, 5),
('HelloWorld', 5, 5, 5),
('Hyper Brahmos', 3, 3, 5),
('Idea igniters', 5, 3, 0),
('Igniters', 5, 4, 0),
('IMPROVECTS', 4, 4, 5),
('Infinite Binary', 5, 4, 0),
('Infinite_loopers', 5, 5, 5),
('Inno Unity', 5, 4, 0),
('Innov_8', 2, 2, 5),
('Kabhi Khushi Kabhi Gham', 5, 1, 0),
('Karmix', 5, 5, 5),
('Kernel Crew', 5, 5, 5),
('Kodeastra', 5, 5, 5),
('LogicLayers', 3, 3, 5),
('MethXAI', 4, 4, 5),
('Meticulous Masterminds', 4, 3, 0),
('Mystic Squad (Mystic Trio)', 3, 3, 5),
('Narayani Sena', 5, 4, 0),
('Neuralink', 5, 2, 0),
('Noob Hackers', 4, 1, 0),
('Noobsatwork', 3, 3, 5),
('NU-GEN', 3, 3, 5),
('Pandav', 5, 3, 0),
('Pandavas', 5, 1, 0),
('Pirates of the Caribbean', 2, 2, 5),
('Potato Coders', 4, 3, 0),
('Pseudo Coders', 4, 3, 0),
('QodX', 4, 4, 5),
('Quantum coders', 5, 1, 0),
('React Racoons', 5, 1, 0),
('Runtime Terror', 5, 4, 0),
('Shaktimaan', 5, 5, 5),
('Skill issue', 5, 2, 0),
('SnakeBytes', 5, 5, 5),
('Solution Seekers', 4, 2, 0),
('Spark', 5, 5, 5),
('Spark plug', 5, 2, 0),
('SpiderCoders', 2, 2, 5),
('Stack over achievers', 2, 2, 5),
('StackForge', 5, 5, 5),
('Stranger string', 5, 1, 0),
('Synapse', 3, 3, 5),
('TASQB', 5, 1, 0),
('TEAM ELITE', 4, 4, 5),
('Team flanker', 3, 3, 5),
('Team Neuralink', 5, 1, 0),
('Team Rocket', 3, 3, 5),
('Team sols', 5, 4, 0),
('Team UpsideDown', 2, 1, 0),
('Tech Jam', 4, 4, 5),
('TechGiants', 3, 3, 5),
('Tesseract', 4, 4, 5),
('The Decrypters', 4, 4, 5),
('The Hackenings', 5, 5, 5),
('The Kraken', 5, 5, 5),
('The Optimizers', 5, 5, 5),
('The Orders', 4, 4, 5),
('The Synergic Squad', 4, 2, 0),
('TirthaYatra', 4, 4, 5),
('Trailblazers', 2, 2, 5),
('Tristack', 3, 3, 5),
('Trojan Bots', 4, 1, 0),
('VAQ-U', 3, 1, 0),
('Vision X', 5, 5, 5),
('While(0){!Deafeat}', 5, 5, 5),
('Why-Φ''s Fault', 4, 4, 5),
('Zenith', 5, 5, 5)
ON CONFLICT (team_name) DO UPDATE SET
    total_members = EXCLUDED.total_members,
    linkedin_posts = EXCLUDED.linkedin_posts,
    round1_points = EXCLUDED.round1_points,
    updated_at = CURRENT_TIMESTAMP;

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_leaderboard_updated_at 
    BEFORE UPDATE ON leaderboard 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
