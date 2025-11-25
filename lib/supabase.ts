import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yviaelacdlfarkpbgxps.supabase.co'
// 使用用户提供的密钥
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_secret_terZJb5evnYgpKtpfK1A0w_S7NL_7xR'

export const supabase = createClient(supabaseUrl, supabaseKey)

