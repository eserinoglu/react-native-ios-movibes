import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ihmsucjyfbgippgjcfnp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlobXN1Y2p5ZmJnaXBwZ2pjZm5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIyMTQwMTcsImV4cCI6MjAxNzc5MDAxN30.bno56hEiQbC7GsY3hqqKS2P9qELbElnaPMFNGcHyRLo";

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export default supabase;
