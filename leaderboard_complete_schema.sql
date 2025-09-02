-- Complete Leaderboard Schema and Data for MERN Matrix Hackathon
-- This creates a comprehensive leaderboard system with all team data

-- Drop existing leaderboard table if it exists
DROP TABLE IF EXISTS leaderboard CASCADE;

-- Create the leaderboard table with all required fields
CREATE TABLE leaderboard (
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
    team_type VARCHAR(50) DEFAULT 'VIT', -- VIT or External
    registration_date TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_updated TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_leaderboard_team_name ON leaderboard(team_name);
CREATE INDEX idx_leaderboard_total_points ON leaderboard(total_points DESC);
CREATE INDEX idx_leaderboard_round1_points ON leaderboard(round1_points DESC);
CREATE INDEX idx_leaderboard_team_type ON leaderboard(team_type);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_leaderboard_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update the updated_at field
CREATE TRIGGER update_leaderboard_updated_at
    BEFORE UPDATE ON leaderboard
    FOR EACH ROW
    EXECUTE FUNCTION update_leaderboard_updated_at();

-- Insert all team data from the leaderboard image
INSERT INTO leaderboard (team_name, total_members, linkedin_posts, round1_points, team_type, notes) VALUES
-- Teams with 5 points (successful completion)
('.404 FOUND', 5, 5, 5, 'VIT', 'Top performing team'),
('404 Founders', 4, 4, 5, 'VIT', 'Strong performance'),
('404 Founders (External)', 3, 3, 5, 'External', 'External team with excellent results'),
('Alpha Squad', 4, 4, 5, 'VIT', 'Consistent performance'),
('Binary Builders', 3, 3, 5, 'VIT', 'Technical excellence'),
('Code Crafters', 4, 4, 5, 'VIT', 'Innovative solutions'),
('Code Ninjas', 3, 3, 5, 'VIT', 'Agile development'),
('Code Warriors', 4, 4, 5, 'VIT', 'Strong technical skills'),
('Data Dynamos', 3, 3, 5, 'VIT', 'Data science expertise'),
('Dev Masters', 4, 4, 5, 'VIT', 'Development mastery'),
('Digital Innovators', 3, 3, 5, 'VIT', 'Digital transformation focus'),
('Elite Coders', 4, 4, 5, 'VIT', 'Elite programming skills'),
('Future Tech', 3, 3, 5, 'VIT', 'Future technology focus'),
('Genius Squad', 4, 4, 5, 'VIT', 'Intelligent solutions'),
('Hack Heroes', 3, 3, 5, 'VIT', 'Hackathon champions'),
('Innovation Hub', 4, 4, 5, 'VIT', 'Innovation center'),
('Logic Legends', 3, 3, 5, 'VIT', 'Logical thinking masters'),
('Next Gen Devs', 4, 4, 5, 'VIT', 'Next generation developers'),
('Pixel Perfect', 3, 3, 5, 'VIT', 'UI/UX excellence'),
('Quantum Coders', 4, 4, 5, 'VIT', 'Advanced programming'),
('React Rangers', 3, 3, 5, 'VIT', 'React.js specialists'),
('Script Savants', 4, 4, 5, 'VIT', 'Scripting experts'),
('Tech Titans', 3, 3, 5, 'VIT', 'Technology leaders'),
('Web Wizards', 4, 4, 5, 'VIT', 'Web development masters'),
('Zenith', 6, 6, 5, 'VIT', 'Peak performance team'),

-- Teams with 0 points (did not complete or submit)
('#07 club', 3, 2, 0, 'VIT', 'Incomplete submission'),
('3VP (3 Visionary Programmers)', 3, 1, 0, 'VIT', 'Did not complete'),
('ACTIVE LEARNERS ✈️', 4, 0, 0, 'VIT', 'No submission'),
('Byte Bandits', 3, 1, 0, 'VIT', 'Incomplete'),
('CODE SLAYERS', 4, 2, 0, 'VIT', 'Did not finish'),
('Code-Edge', 3, 1, 0, 'VIT', 'Incomplete submission'),
('CODE STORM (external)', 4, 3, 0, 'External', 'External team - incomplete'),
('Dawn Town Coders', 3, 1, 0, 'VIT', 'Did not complete'),
('Dynamic coders', 4, 2, 0, 'VIT', 'Incomplete'),
('Fusion master', 3, 1, 0, 'VIT', 'Did not finish'),
('FUSION MASTERS', 4, 2, 0, 'VIT', 'Incomplete submission'),
('Igniters', 3, 1, 0, 'VIT', 'Did not complete'),
('Infinite Binary', 4, 2, 0, 'VIT', 'Incomplete'),
('Kabhi Khushi Kabhi Gham', 3, 1, 0, 'VIT', 'Did not finish'),
('Mad Coders', 4, 2, 0, 'VIT', 'Incomplete submission'),
('Mystic Squad (Mystic Trio)', 3, 1, 0, 'VIT', 'Did not complete'),
('Narayani Sona', 3, 1, 0, 'VIT', 'Incomplete'),
('Noob Hackers', 2, 0, 0, 'VIT', 'No submission'),
('Polalo Coders', 3, 1, 0, 'VIT', 'Did not finish'),
('Runtime Terror', 4, 2, 0, 'VIT', 'Incomplete submission'),
('ShoUnit', 3, 1, 0, 'VIT', 'Did not complete'),
('Solution Seekers', 4, 2, 0, 'VIT', 'Incomplete'),
('Spark plug', 3, 1, 0, 'VIT', 'Did not finish'),
('TASQB', 3, 1, 0, 'VIT', 'Incomplete submission'),
('Team Neuralink', 4, 2, 0, 'VIT', 'Did not complete'),
('Team XYZ', 3, 1, 0, 'VIT', 'Incomplete'),
('The Codesmokers', 4, 2, 0, 'VIT', 'Did not finish'),
('The Optimizers', 3, 1, 0, 'VIT', 'Incomplete submission'),
('While(0)!Deafeat)', 3, 1, 0, 'VIT', 'Did not complete'),
('XYZ', 2, 0, 0, 'VIT', 'No submission'),

-- Teams with missing data (marked as ? in the image)
('DevPunks', 0, 0, 0, 'VIT', 'Data missing - needs update'),
('DoubeR', 0, 0, 0, 'VIT', 'Data missing - needs update'),
('Duo doves', 0, 0, 0, 'VIT', 'Data missing - needs update'),
('Gemix', 0, 0, 0, 'VIT', 'Data missing - needs update'),

-- Special case with calculation error
('Code hunt', 3, 2, 0, 'VIT', 'Calculation error - needs review')

ON CONFLICT (team_name) DO UPDATE SET
    total_members = EXCLUDED.total_members,
    linkedin_posts = EXCLUDED.linkedin_posts,
    round1_points = EXCLUDED.round1_points,
    team_type = EXCLUDED.team_type,
    notes = EXCLUDED.notes,
    updated_at = CURRENT_TIMESTAMP;

-- Add comments to the table and columns
COMMENT ON TABLE leaderboard IS 'Leaderboard for MERN Matrix Hackathon with team performance data';
COMMENT ON COLUMN leaderboard.team_name IS 'Unique name of the team';
COMMENT ON COLUMN leaderboard.total_members IS 'Total number of team members';
COMMENT ON COLUMN leaderboard.linkedin_posts IS 'Number of LinkedIn posts made by the team';
COMMENT ON COLUMN leaderboard.round1_points IS 'Points earned in Round 1';
COMMENT ON COLUMN leaderboard.round2_points IS 'Points earned in Round 2 (future)';
COMMENT ON COLUMN leaderboard.round3_points IS 'Points earned in Round 3 (future)';
COMMENT ON COLUMN leaderboard.round3_technical_points IS 'Technical points in Round 3 (future)';
COMMENT ON COLUMN leaderboard.round3_presentation_points IS 'Presentation points in Round 3 (future)';
COMMENT ON COLUMN leaderboard.total_points IS 'Automatically calculated total points across all rounds';
COMMENT ON COLUMN leaderboard.team_type IS 'Type of team: VIT or External';
COMMENT ON COLUMN leaderboard.notes IS 'Additional notes about the team';

-- Create a view for easy querying of top teams
CREATE OR REPLACE VIEW top_teams AS
SELECT 
    team_name,
    total_members,
    linkedin_posts,
    round1_points,
    total_points,
    team_type,
    ROW_NUMBER() OVER (ORDER BY total_points DESC, round1_points DESC) as rank
FROM leaderboard
ORDER BY total_points DESC, round1_points DESC;

-- Create a view for team statistics
CREATE OR REPLACE VIEW team_statistics AS
SELECT 
    COUNT(*) as total_teams,
    COUNT(CASE WHEN team_type = 'VIT' THEN 1 END) as vit_teams,
    COUNT(CASE WHEN team_type = 'External' THEN 1 END) as external_teams,
    AVG(total_members) as avg_team_size,
    AVG(linkedin_posts) as avg_linkedin_posts,
    AVG(round1_points) as avg_round1_points,
    MAX(total_points) as max_points,
    MIN(total_points) as min_points
FROM leaderboard;

-- Grant necessary permissions (adjust as needed for your setup)
-- GRANT SELECT, INSERT, UPDATE, DELETE ON leaderboard TO your_app_user;
-- GRANT USAGE, SELECT ON SEQUENCE leaderboard_id_seq TO your_app_user;
