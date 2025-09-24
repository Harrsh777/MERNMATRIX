-- Remove the GitHub URL check constraint from finals_submissions table
-- Run this in your Supabase SQL editor or database client

-- First, let's see what constraints exist (modern PostgreSQL syntax)
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.finals_submissions'::regclass;

-- Remove the GitHub URL constraint
ALTER TABLE public.finals_submissions 
DROP CONSTRAINT IF EXISTS finals_submissions_github_url_check;

-- Verify the constraint is removed
SELECT 
    conname as constraint_name,
    contype as constraint_type,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.finals_submissions'::regclass 
AND conname LIKE '%github%';

-- Alternative method if the above doesn't work:
-- ALTER TABLE public.finals_submissions DROP CONSTRAINT finals_submissions_github_url_check;
