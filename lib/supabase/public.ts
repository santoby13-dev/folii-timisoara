import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Client Supabase doar cu anon key, fără cookies — pentru citiri publice
 * (catalog, categorii). Sigur de apelat oriunde, inclusiv la build time
 * (generateStaticParams, sitemap.ts), unde nu există sesiune de request.
 */
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  return createSupabaseClient<Database>(url, anonKey);
}
