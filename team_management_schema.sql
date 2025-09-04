-- Team Management Table Schema
-- This table will store team management data with marking functionality

CREATE TABLE IF NOT EXISTS public.team_management (
    id SERIAL NOT NULL,
    team_number INTEGER NOT NULL,
    team_name CHARACTER VARYING(255) NOT NULL,
    team_leader_name CHARACTER VARYING(255) NOT NULL,
    team_type CHARACTER VARYING(50) NOT NULL DEFAULT 'External' CHECK (team_type IN ('VIT', 'External')),
    
    -- Marking fields
    registration_status CHARACTER VARYING(50) NOT NULL DEFAULT 'Pending' CHECK (registration_status IN ('Pending', 'Approved', 'Rejected', 'On Hold')),
    attendance_status CHARACTER VARYING(50) NOT NULL DEFAULT 'Absent' CHECK (attendance_status IN ('Present', 'Absent', 'Late', 'Excused')),
    project_status CHARACTER VARYING(50) NOT NULL DEFAULT 'Not Started' CHECK (project_status IN ('Not Started', 'In Progress', 'Submitted', 'Under Review', 'Approved', 'Rejected')),
    presentation_status CHARACTER VARYING(50) NOT NULL DEFAULT 'Not Scheduled' CHECK (presentation_status IN ('Not Scheduled', 'Scheduled', 'Completed', 'Rescheduled', 'Cancelled')),
    
    -- Rating and scoring
    overall_rating INTEGER NULL CHECK (overall_rating >= 0 AND overall_rating <= 10),
    technical_score INTEGER NULL CHECK (technical_score >= 0 AND technical_score <= 100),
    presentation_score INTEGER NULL CHECK (presentation_score >= 0 AND presentation_score <= 100),
    innovation_score INTEGER NULL CHECK (innovation_score >= 0 AND innovation_score <= 100),
    
    -- Additional information
    notes TEXT NULL,
    feedback TEXT NULL,
    assigned_mentor CHARACTER VARYING(255) NULL,
    meeting_schedule TIMESTAMP WITHOUT TIME ZONE NULL,
    
    -- Timestamps
    created_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT CURRENT_TIMESTAMP,
    last_attendance_update TIMESTAMP WITHOUT TIME ZONE NULL,
    last_status_update TIMESTAMP WITHOUT TIME ZONE NULL,
    
    -- Constraints
    CONSTRAINT team_management_pkey PRIMARY KEY (id),
    CONSTRAINT team_management_team_number_unique UNIQUE (team_number)
) TABLESPACE pg_default;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_team_management_team_number ON public.team_management USING btree (team_number) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_team_management_team_name ON public.team_management USING btree (team_name) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_team_management_team_type ON public.team_management USING btree (team_type) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_team_management_registration_status ON public.team_management USING btree (registration_status) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_team_management_attendance_status ON public.team_management USING btree (attendance_status) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_team_management_project_status ON public.team_management USING btree (project_status) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_team_management_presentation_status ON public.team_management USING btree (presentation_status) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_team_management_created_at ON public.team_management USING btree (created_at) TABLESPACE pg_default;
CREATE INDEX IF NOT EXISTS idx_team_management_updated_at ON public.team_management USING btree (updated_at) TABLESPACE pg_default;

-- Create trigger for updating the updated_at column
CREATE OR REPLACE FUNCTION update_team_management_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_team_management_updated_at
    BEFORE UPDATE ON public.team_management
    FOR EACH ROW
    EXECUTE FUNCTION update_team_management_updated_at();

-- Create trigger for updating last_attendance_update when attendance_status changes
CREATE OR REPLACE FUNCTION update_team_management_attendance_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.attendance_status IS DISTINCT FROM NEW.attendance_status THEN
        NEW.last_attendance_update = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_team_management_attendance_timestamp
    BEFORE UPDATE ON public.team_management
    FOR EACH ROW
    EXECUTE FUNCTION update_team_management_attendance_timestamp();

-- Create trigger for updating last_status_update when any status field changes
CREATE OR REPLACE FUNCTION update_team_management_status_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    IF (OLD.registration_status IS DISTINCT FROM NEW.registration_status OR
        OLD.project_status IS DISTINCT FROM NEW.project_status OR
        OLD.presentation_status IS DISTINCT FROM NEW.presentation_status) THEN
        NEW.last_status_update = CURRENT_TIMESTAMP;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_team_management_status_timestamp
    BEFORE UPDATE ON public.team_management
    FOR EACH ROW
    EXECUTE FUNCTION update_team_management_status_timestamp();

-- Insert sample data for external teams (based on the OnlinePitch data)
INSERT INTO public.team_management (team_number, team_name, team_leader_name, team_type, registration_status, attendance_status, project_status, presentation_status, overall_rating, notes) VALUES
(1, 'Tristack', 'ishan singh patel', 'External', 'Approved', 'Present', 'In Progress', 'Scheduled', 8, 'Strong technical background'),
(2, 'LogicLayers', 'Mohammed Anas', 'External', 'Approved', 'Present', 'Submitted', 'Completed', 9, 'Excellent presentation skills'),
(3, 'The-weakends', 'Shubham sayaji', 'External', 'Pending', 'Absent', 'Not Started', 'Not Scheduled', NULL, 'Awaiting confirmation'),
(4, 'Future_frames', 'Sahil Kourav', 'External', 'Approved', 'Present', 'In Progress', 'Scheduled', 7, 'Good project concept'),
(5, 'CreativeBuddies', 'Kenil Sangani', 'External', 'Approved', 'Present', 'Submitted', 'Under Review', 8, 'Creative approach to problem solving'),
(6, 'Quantum coders', 'Piya Biswas', 'External', 'Approved', 'Present', 'In Progress', 'Scheduled', 6, 'Technical complexity high'),
(7, 'CodeVerz', 'Ujjwal Gupta', 'External', 'Approved', 'Present', 'Submitted', 'Completed', 9, 'Outstanding implementation'),
(8, 'Info Unity', 'Parv Modi', 'External', 'Approved', 'Present', 'In Progress', 'Scheduled', 7, 'Good team coordination'),
(9, 'SpiderCoders', 'Sayak Pramanik', 'External', 'Approved', 'Present', 'Submitted', 'Under Review', 8, 'Innovative solution'),
(10, 'TechGiants', 'Prashant Gupta', 'External', 'Approved', 'Present', 'In Progress', 'Scheduled', 7, 'Strong technical skills');

-- Add comments for documentation
COMMENT ON TABLE public.team_management IS 'Team management table for tracking external teams registration, attendance, project status, and ratings';
COMMENT ON COLUMN public.team_management.team_number IS 'Unique team number identifier';
COMMENT ON COLUMN public.team_management.team_name IS 'Name of the team';
COMMENT ON COLUMN public.team_management.team_leader_name IS 'Name of the team leader';
COMMENT ON COLUMN public.team_management.team_type IS 'Type of team - VIT or External';
COMMENT ON COLUMN public.team_management.registration_status IS 'Current registration status of the team';
COMMENT ON COLUMN public.team_management.attendance_status IS 'Current attendance status';
COMMENT ON COLUMN public.team_management.project_status IS 'Current project development status';
COMMENT ON COLUMN public.team_management.presentation_status IS 'Current presentation status';
COMMENT ON COLUMN public.team_management.overall_rating IS 'Overall team rating (0-10)';
COMMENT ON COLUMN public.team_management.technical_score IS 'Technical implementation score (0-100)';
COMMENT ON COLUMN public.team_management.presentation_score IS 'Presentation quality score (0-100)';
COMMENT ON COLUMN public.team_management.innovation_score IS 'Innovation and creativity score (0-100)';
COMMENT ON COLUMN public.team_management.notes IS 'Additional notes about the team';
COMMENT ON COLUMN public.team_management.feedback IS 'Feedback for the team';
COMMENT ON COLUMN public.team_management.assigned_mentor IS 'Name of assigned mentor';
COMMENT ON COLUMN public.team_management.meeting_schedule IS 'Scheduled meeting time';
