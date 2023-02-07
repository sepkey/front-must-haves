import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bltuutomneoflzauidrg.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsdHV1dG9tbmVvZmx6YXVpZHJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU1MTAwMjYsImV4cCI6MTk5MTA4NjAyNn0.vsrkwjdsNvsotmlI775ukB0QzD1EFu6NM0yIF2US6RE";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
