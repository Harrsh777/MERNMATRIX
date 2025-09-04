-- Simple Team Marks Table
-- This table stores marks/ratings for the 40 external teams

CREATE TABLE IF NOT EXISTS public.team_marks (
    id SERIAL NOT NULL,
    team_number INTEGER NOT NULL,
    team_name CHARACTER VARYING(255) NOT NULL,
    team_leader_name CHARACTER VARYING(255) NOT NULL,
    
    -- Marks/Ratings (0-100 scale)
    marks INTEGER NULL CHECK (marks >= 0 AND marks <= 100),
    
    -- Additional fields
    notes TEXT NULL,
    marked_by CHARACTER VARYING(255) NULL,
    
    -- Timestamps
    created_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraints
    CONSTRAINT team_marks_pkey PRIMARY KEY (id),
    CONSTRAINT team_marks_team_number_unique UNIQUE (team_number)
) TABLESPACE pg_default;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_team_marks_team_number ON public.team_marks USING btree (team_number) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_team_marks_team_name ON public.team_marks USING btree (team_name) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_team_marks_marks ON public.team_marks USING btree (marks) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_team_marks_created_at ON public.team_marks USING btree (created_at) TABLESPACE pg_default;

-- Create trigger for updating the updated_at column
CREATE OR REPLACE FUNCTION update_team_marks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_team_marks_updated_at
    BEFORE UPDATE ON public.team_marks
    FOR EACH ROW
    EXECUTE FUNCTION update_team_marks_updated_at();

-- Insert the 40 external teams with initial data
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

-- Add comments for documentation
COMMENT ON TABLE public.team_marks IS 'Simple table for storing marks/ratings for external teams';
COMMENT ON COLUMN public.team_marks.team_number IS 'Unique team number identifier';
COMMENT ON COLUMN public.team_marks.team_name IS 'Name of the team';
COMMENT ON COLUMN public.team_marks.team_leader_name IS 'Name of the team leader';
COMMENT ON COLUMN public.team_marks.marks IS 'Marks/rating given to the team (0-100)';
COMMENT ON COLUMN public.team_marks.notes IS 'Additional notes about the team';
COMMENT ON COLUMN public.team_marks.marked_by IS 'Name of the person who marked the team';
