import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yqrmgftslsdwjjflijbt.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlxcm1nZnRzbHNkd2pqZmxpamJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3Mzc3NzYsImV4cCI6MjA2NTMxMzc3Nn0.vG5TVJVJlJByYEbksWI7dYcdcOs3ChbYBr_ve5wQuSM'


export const supabase = createClient(supabaseUrl, supabaseAnonKey)