import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/is-configured";
import { logout } from "@/app/admin/actions";

const navItems = [
  { href: "/admin", label: "Panou" },
  { href: "/admin/produse", label: "Produse" },
  { href: "/admin/promotii", label: "Promoții" },
  { href: "/admin/campanii", label: "Campanii" },
];

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
        <div className="max-w-md text-center">
          <h1 className="text-lg font-semibold mb-2">Supabase neconfigurat</h1>
          <p className="text-sm text-neutral-500">
            Completează <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
            <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> și{" "}
            <code>SUPABASE_SERVICE_ROLE_KEY</code> în <code>.env.local</code>,
            apoi repornește serverul.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Rezervă de siguranță — proxy.ts protejează deja aceste rute.
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <aside className="w-56 shrink-0 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col">
        <div className="px-4 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <p className="font-semibold text-sm">Folii Timișoara</p>
          <p className="text-xs text-neutral-500">Admin</p>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-500 truncate mb-2">{user.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="text-xs text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 underline"
            >
              Deconectare
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-6 max-w-5xl">{children}</main>
    </div>
  );
}
