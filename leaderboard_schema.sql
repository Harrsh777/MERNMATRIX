-- Complete SQL Schema for Leaderboard Table
-- This script creates the table and inserts all the team data

-- Create the leaderboard table if it doesn't exist
CREATE TABLE IF NOT EXISTS leaderboard (
    id SERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL UNIQUE,
    total_members INTEGER NOT NULL DEFAULT 0,
    linkedin_posts INTEGER NOT NULL DEFAULT 0,
    round1_points INTEGER NOT NULL DEFAULT 0,
    round2_points INTEGER DEFAULT NULL,
    round3_points INTEGER DEFAULT NULL,
    round3_technical_points INTEGER DEFAULT NULL,
    round3_presentation_points INTEGER DEFAULT NULL,
    total_points INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leaderboard_team_name ON leaderboard(team_name);
CREATE INDEX IF NOT EXISTS idx_leaderboard_total_points ON leaderboard(total_points);
CREATE INDEX IF NOT EXISTS idx_leaderboard_round1_points ON leaderboard(round1_points);

-- Clear existing data (optional - remove this line if you want to keep existing data)
-- DELETE FROM leaderboard;

-- Insert all team data into the leaderboard table
INSERT INTO leaderboard (team_name, total_members, linkedin_posts, round1_points, created_at, updated_at) VALUES
('.404 FOUND', 5, 5, 5, NOW(), NOW()),
('3VP (3 Visionary Programmers)', 3, 3, 5, NOW(), NOW()),
('404 Coder Not Found', 5, 5, 5, NOW(), NOW()),
('404 found', 5, 5, 5, NOW(), NOW()),
('404 Founders', 5, 5, 5, NOW(), NOW()),
('404 Founders (External)', 3, 3, 5, NOW(), NOW()),
('8-BIT', 4, 4, 5, NOW(), NOW()),
('ABC', 5, 5, 5, NOW(), NOW()),
('ACTIVE LEARNERS✨️', 2, 1, 0, NOW(), NOW()),
('Æegris', 4, 1, 0, NOW(), NOW()),
('Algo Ninjas', 5, 5, 5, NOW(), NOW()),
('Anjani', 5, 5, 5, NOW(), NOW()),
('Beyond Boundaries', 4, 4, 5, NOW(), NOW()),
('Binary brains', 4, 4, 5, NOW(), NOW()),
('BUG - SLAYER', 5, 5, 5, NOW(), NOW()),
('Bug Buster', 5, 5, 5, NOW(), NOW()),
('BugHiBug', 5, 5, 5, NOW(), NOW()),
('Byte Bandits', 5, 3, 0, NOW(), NOW()),
('Chill code club', 5, 5, 5, NOW(), NOW()),
('Code Catalyst', 4, 4, 5, NOW(), NOW()),
('Code Catalysts', 5, 5, 5, NOW(), NOW()),
('Code Commanders', 2, 2, 5, NOW(), NOW()),
('Code Crew', 5, 5, 5, NOW(), NOW()),
('Code hunt', 3, 0, 0, NOW(), NOW()),
('Code Quest', 5, 5, 5, NOW(), NOW()),
('Code Rebels', 4, 4, 5, NOW(), NOW()),
('CODE STORM (external)', 2, 2, 5, NOW(), NOW()),
('Code verz', 5, 1, 0, NOW(), NOW()),
('Code_Rafters', 4, 4, 5, NOW(), NOW()),
('Code-Edge', 5, 4, 0, NOW(), NOW()),
('Code2gether', 2, 2, 5, NOW(), NOW()),
('Code4Cause', 2, 2, 5, NOW(), NOW()),
('CodeMerners', 4, 4, 5, NOW(), NOW()),
('Codestorm', 4, 4, 5, NOW(), NOW()),
('CodeV', 5, 5, 5, NOW(), NOW()),
('Codeverz', 5, 4, 0, NOW(), NOW()),
('CodeXhunters', 5, 5, 5, NOW(), NOW()),
('CODING SPARTANS', 5, 5, 5, NOW(), NOW()),
('Codyssey', 5, 5, 5, NOW(), NOW()),
('coffee-codes', 5, 5, 5, NOW(), NOW()),
('CreativeBuddies', 5, 5, 5, NOW(), NOW()),
('CRYPTOXIS', 5, 5, 5, NOW(), NOW()),
('Ctrl Alt Defeat', 5, 5, 5, NOW(), NOW()),
('Ctrl Alt Elite', 4, 4, 5, NOW(), NOW()),
('Ctrl+Z', 5, 5, 5, NOW(), NOW()),
('Debug Thugs', 4, 4, 5, NOW(), NOW()),
('DoubleR', 2, 2, 5, NOW(), NOW()),
('Duo devs', 2, 2, 5, NOW(), NOW()),
('Dynamic coders', 5, 1, 0, NOW(), NOW()),
('Elite Coders (Team Elite)', 4, 4, 5, NOW(), NOW()),
('Error 404', 5, 5, 5, NOW(), NOW()),
('ERROR BREAKERS', 5, 5, 5, NOW(), NOW()),
('ExpressOPS', 5, 5, 5, NOW(), NOW()),
('F3', 3, 3, 5, NOW(), NOW()),
('Future_frames', 1, 1, 5, NOW(), NOW()),
('Genix', 2, 2, 5, NOW(), NOW()),
('Git Gud', 4, 4, 5, NOW(), NOW()),
('Godlike', 5, 5, 5, NOW(), NOW()),
('HACKON 5', 5, 5, 5, NOW(), NOW()),
('Hackstreet boys', 4, 4, 5, NOW(), NOW()),
('HelloWorld', 5, 5, 5, NOW(), NOW()),
('Hyper Brahmos', 3, 3, 5, NOW(), NOW()),
('Idea igniters', 5, 5, 5, NOW(), NOW()),
('Igniters', 5, 4, 0, NOW(), NOW()),
('IMPROVECTS', 4, 4, 5, NOW(), NOW()),
('Infinite Binary', 5, 4, 0, NOW(), NOW()),
('Infinite_loopers', 5, 5, 5, NOW(), NOW()),
('Inno Unity', 5, 5, 5, NOW(), NOW()),
('Innov_8', 2, 2, 5, NOW(), NOW()),
('Kabhi Khushi Kabhi Gham', 5, 1, 0, NOW(), NOW()),
('Karmix', 5, 5, 5, NOW(), NOW()),
('Kernel Crew', 5, 5, 5, NOW(), NOW()),
('Kodeastra', 5, 5, 5, NOW(), NOW()),
('LogicLayers', 3, 3, 5, NOW(), NOW()),
('MethXAI', 4, 4, 5, NOW(), NOW()),
('Meticulous Masterminds', 4, 4, 5, NOW(), NOW()),
('Mystic Squad (Mystic Trio)', 3, 3, 5, NOW(), NOW()),
('Narayani Sena', 5, 4, 0, NOW(), NOW()),
('Neuralink', 5, 5, 5, NOW(), NOW()),
('Noob Hackers', 4, 2, 0, NOW(), NOW()),
('Noobsatwork', 3, 3, 5, NOW(), NOW()),
('NU-GEN', 3, 3, 5, NOW(), NOW()),
('Pandav', 5, 5, 5, NOW(), NOW()),
('Pirates of the Caribbean', 2, 2, 5, NOW(), NOW()),
('Potato Coders', 4, 4, 0, NOW(), NOW()),
('Pseudo Coders', 4, 4, 5, NOW(), NOW()),
('QodX', 4, 4, 5, NOW(), NOW()),
('Quantum coders', 5, 5, 5, NOW(), NOW()),
('React Racoons', 5, 5, 5, NOW(), NOW()),
('Runtime Terror', 5, 4, 0, NOW(), NOW()),
('Shaktimaan', 5, 5, 5, NOW(), NOW()),
('Skill issue', 5, 5, 5, NOW(), NOW()),
('Skyship', 4, 4, 5, NOW(), NOW()),
('SnakeBytes', 5, 5, 5, NOW(), NOW()),
('Solution Seekers', 4, 3, 0, NOW(), NOW()),
('Spark', 5, 5, 5, NOW(), NOW()),
('Spark plug', 5, 2, 0, NOW(), NOW()),
('SpiderCoders', 2, 2, 5, NOW(), NOW()),
('Stack over achievers', 2, 2, 5, NOW(), NOW()),
('StackForge', 5, 5, 5, NOW(), NOW()),
('Stork', 1, 1, 5, NOW(), NOW()),
('Stranger string', 5, 5, 5, NOW(), NOW()),
('Synapse', 3, 3, 5, NOW(), NOW()),
('TASQB', 5, 4, 0, NOW(), NOW()),
('TEAM ELITE', 4, 4, 5, NOW(), NOW()),
('Team flanker', 3, 3, 5, NOW(), NOW()),
('Team Neuralink', 5, 1, 0, NOW(), NOW()),
('Team Rocket', 3, 3, 5, NOW(), NOW()),
('Team sols', 5, 5, 5, NOW(), NOW()),
('Team UpsideDown', 2, 2, 5, NOW(), NOW()),
('Tech Jam', 4, 4, 5, NOW(), NOW()),
('TechGiants', 3, 3, 5, NOW(), NOW()),
('Tesseract', 4, 4, 5, NOW(), NOW()),
('The Decrypters', 4, 4, 5, NOW(), NOW()),
('The Eighteens', 5, 5, 5, NOW(), NOW()),
('The Hackenings', 5, 5, 5, NOW(), NOW()),
('The Kraken', 5, 5, 5, NOW(), NOW()),
('The Optimizers', 5, 5, 5, NOW(), NOW()),
('The Orders', 4, 4, 5, NOW(), NOW()),
('The Synergic Squad', 4, 4, 5, NOW(), NOW()),
('TirthaYatra', 4, 4, 5, NOW(), NOW()),
('Trailblazers', 2, 2, 5, NOW(), NOW()),
('Tristack', 3, 3, 5, NOW(), NOW()),
('Trojan Bots', 4, 4, 5, NOW(), NOW()),
('VAQ-U', 3, 3, 5, NOW(), NOW()),
('Vision X', 5, 5, 5, NOW(), NOW()),
('While(0){!Deafeat}', 5, 5, 5, NOW(), NOW()),
('Why-Φ\'s Fault', 4, 4, 5, NOW(), NOW()),
('Zenith', 5, 5, 5, NOW(), NOW())
ON CONFLICT (team_name) DO UPDATE SET
    total_members = EXCLUDED.total_members,
    linkedin_posts = EXCLUDED.linkedin_posts,
    round1_points = EXCLUDED.round1_points,
    total_points = EXCLUDED.total_points,
    updated_at = NOW();

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
DROP TRIGGER IF EXISTS update_leaderboard_updated_at ON leaderboard;
CREATE TRIGGER update_leaderboard_updated_at
    BEFORE UPDATE ON leaderboard
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Verify the data was inserted correctly
SELECT 
    COUNT(*) as total_teams,
    COUNT(CASE WHEN total_points > 0 THEN 1 END) as teams_with_points,
    COUNT(CASE WHEN total_points = 0 THEN 1 END) as teams_without_points
FROM leaderboard;

-- Show top 10 teams by points
SELECT 
    ROW_NUMBER() OVER (ORDER BY total_points DESC, team_name ASC) as rank,
    team_name, 
    total_members, 
    linkedin_posts, 
    round1_points, 
    total_points 
FROM leaderboard 
ORDER BY total_points DESC, team_name ASC 
LIMIT 10;
