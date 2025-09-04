-- Insert the 40 external teams into team_marks table
-- This will populate the table with all the teams from your list

INSERT INTO public.team_marks (team_number, team_name, team_leader_name, marks, notes) VALUES
(1, 'Tristack', 'ishan singh patel', NULL, NULL),
(2, 'LogicLayers', 'Mohammed Anas', NULL, NULL),
(3, 'The-weakends', 'Shubham sayaji', NULL, NULL),
(4, 'Future_frames', 'Sahil Kourav', NULL, NULL),
(5, 'CreativeBuddies', 'Kenil Sangani', NULL, NULL),
(6, 'Quantum coders', 'Piya Biswas', NULL, NULL),
(7, 'CodeVerz', 'Ujjwal Gupta', NULL, NULL),
(8, 'Info Unity', 'Parv Modi', NULL, NULL),
(9, 'SpiderCoders', 'Sayak Pramanik', NULL, NULL),
(10, 'TechGiants', 'Prashant Gupta', NULL, NULL),
(11, 'Code Cabbit', 'Manish Dhaka', NULL, NULL),
(12, 'Dev Buddies', 'Gaurav Pratap Singh', NULL, NULL),
(13, 'Hyper Brahmos', 'Rahul Bankar', NULL, NULL),
(14, '404 Founders', 'Rathod Henil D.', NULL, NULL),
(15, 'Duo Devs', 'Madhur Bhavsar', NULL, NULL),
(16, 'CODE STORM', 'Krishna Jain', NULL, NULL),
(17, 'Quantum Codexz', 'Pritish Mandal', NULL, NULL),
(18, 'Innov_B', 'Debaditya Dasgupta', NULL, NULL),
(19, 'Algo evengers', 'Unnati khare', NULL, NULL),
(20, 'codeZEN', 'Parth Gupta', NULL, NULL),
(21, 'Code Rebels', 'Naman Gyanchandani', NULL, NULL),
(22, 'StackForge', 'Raghav Sharma', NULL, NULL),
(23, 'Stork', 'Dishant Hooda', NULL, NULL),
(24, 'HelloWorld', 'Divyansh Kumar', NULL, NULL),
(25, 'Runtime Terrors', 'Saurav Kumar', NULL, NULL),
(26, 'Visionary', 'Khushboo Khator', NULL, NULL),
(27, 'Code Learner', 'Shivani Kumari', NULL, NULL),
(28, 'Buildon', 'Shreya Dilip Wani', NULL, NULL),
(29, 'Abc', 'Aniket srivastava', NULL, NULL),
(30, 'Ctrl+Z', 'Harshwardhan Patil', NULL, NULL),
(31, 'Guncoder', 'Vibhor Mishra', NULL, NULL),
(32, 'Code2gether', 'Mohd Fazil', NULL, NULL),
(33, 'BUG - SLAYER', 'Akshay varma', NULL, NULL),
(34, '404 Coder Not Found', 'Abhishek singh', NULL, NULL),
(35, 'Raghav Sharma', 'Raghav Sharma', NULL, NULL),
(36, 'Beyond Boundaries', 'Payal Rani', NULL, NULL),
(37, 'CodeCatalyst', 'Suraj patel', NULL, NULL),
(38, 'Trailblazers', 'Anshuman khare', NULL, NULL),
(39, 'Skyship', 'Vishal', NULL, NULL);

-- Note: If you get a duplicate key error, you can use this instead:
-- INSERT INTO public.team_marks (team_number, team_name, team_leader_name, marks, notes) 
-- VALUES (1, 'Tristack', 'ishan singh patel', NULL, NULL)
-- ON CONFLICT (team_number) DO NOTHING;
