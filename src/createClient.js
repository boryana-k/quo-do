import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://bqdrzuevafefeiitbqed.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxZHJ6dWV2YWZlZmVpaXRicWVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MjQ5MjEsImV4cCI6MjA0MTQwMDkyMX0.vKRA4rk5JWZbXBIPcUbxsezCCA2VLL344hQ5MaYGH20"
)