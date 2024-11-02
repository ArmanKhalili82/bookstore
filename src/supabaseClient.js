import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zxmojbbduanxklikmnot.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4bW9qYmJkdWFueGtsaWttbm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk3ODU1NzUsImV4cCI6MjA0NTM2MTU3NX0.8WCYfuHKOtimNQg72ZIoWvvGcEXT9CqnWMCpZnmmqXA';

export const supabase = createClient(supabaseUrl, supabaseKey);
