/**
 * Adaugă un utilizator existent (creat din Supabase Dashboard → Authentication
 * → Users → Add user) în allowlist-ul admin_users, ca să poată scrie date din
 * /admin (autentificarea singură nu e suficientă — RLS verifică admin_users).
 *
 *   npx tsx scripts/add-admin.ts email@exemplu.com
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.argv[2];

if (!url || !serviceKey) {
  console.error("Lipsesc cheile Supabase din .env.local");
  process.exit(1);
}
if (!email) {
  console.error("Utilizare: npx tsx scripts/add-admin.ts email@exemplu.com");
  process.exit(1);
}

const supabase = createClient(url, serviceKey);

async function main() {
  let page = 1;
  let user: { id: string; email?: string } | undefined;

  while (!user) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw new Error(error.message);
    user = data.users.find((u) => u.email?.toLowerCase() === email.toLowerCase());
    if (user || data.users.length < 200) break;
    page += 1;
  }

  if (!user) {
    console.error(
      `Niciun utilizator cu emailul ${email}. Creează-l mai întâi din Supabase Dashboard → Authentication → Users → Add user.`
    );
    process.exit(1);
  }

  const { error } = await supabase
    .from("admin_users")
    .upsert({ user_id: user.id, email }, { onConflict: "user_id" });

  if (error) throw new Error(error.message);

  console.log(`${email} e acum admin — se poate loga pe /admin.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
