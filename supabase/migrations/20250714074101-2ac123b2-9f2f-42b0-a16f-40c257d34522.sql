-- Remove user authentication related database tables and functions

-- Drop triggers first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_workspaces_updated_at ON public.workspaces;
DROP TRIGGER IF EXISTS update_workspace_templates_updated_at ON public.workspace_templates;

-- Drop functions
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- Drop tables that reference user_id
DROP TABLE IF EXISTS public.workspace_operations;
DROP TABLE IF EXISTS public.workspace_templates;
DROP TABLE IF EXISTS public.workspaces;
DROP TABLE IF EXISTS public.profiles;