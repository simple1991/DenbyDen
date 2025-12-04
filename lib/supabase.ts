import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yviaelacdlfarkpbgxps.supabase.co'

// 直接使用 Legacy Anon Key（硬编码，确保一定有值）
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2aWFlbGFjZGxmYXJrcGJneHBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM1NDY0NzcsImV4cCI6MjA3OTEyMjQ3N30.p199voR5rSx8vFGWXyNTVx835p6xbv7Eb_5I1sQ8Gv8'

// 添加日志，方便调试
console.log('🔑 Supabase initialized with key:', supabaseKey.substring(0, 20) + '...')

export const supabase = createClient(supabaseUrl, supabaseKey)
