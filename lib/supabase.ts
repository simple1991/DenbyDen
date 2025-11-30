import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yviaelacdlfarkpbgxps.supabase.co'
// 优先使用环境变量，如果没有则使用默认的 anon key
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2aWFlbGFjZGxmYXJrcGJneHBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NDY0NzcsImV4cCI6MjA3OTEyMjQ3N30.p199voR5rSx8vFGWXyNTVx835p6xbv7Eb_5I1sQ8Gv8'

export const supabase = createClient(supabaseUrl, supabaseKey)

