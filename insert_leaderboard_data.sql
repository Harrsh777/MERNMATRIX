-- Insert all team data from the leaderboard image into the database
-- This script populates the leaderboard table with all the teams and their scores

-- Clear existing data (optional - remove if you want to keep existing data)
-- DELETE FROM leaderboard;

-- Insert all teams with their data from the image
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

-- Verify the data was inserted correctly
SELECT 
    COUNT(*) as total_teams,
    COUNT(CASE WHEN round1_points = 5 THEN 1 END) as successful_teams,
    COUNT(CASE WHEN round1_points = 0 THEN 1 END) as incomplete_teams,
    COUNT(CASE WHEN team_type = 'VIT' THEN 1 END) as vit_teams,
    COUNT(CASE WHEN team_type = 'External' THEN 1 END) as external_teams
FROM leaderboard;

-- Show top 10 teams
SELECT 
    team_name,
    total_members,
    linkedin_posts,
    round1_points,
    total_points,
    team_type
FROM leaderboard 
ORDER BY total_points DESC, round1_points DESC 
LIMIT 10;
