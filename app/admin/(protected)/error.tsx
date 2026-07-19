"use client";

export default function AdminError({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-lg font-semibold mb-2">A apărut o eroare</h1>
        <p className="text-sm text-neutral-500">{error.message}</p>
        <p className="text-sm text-neutral-500 mt-2">
          Dacă mesajul menționează cheile Supabase, completează{" "}
          <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
          <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> și{" "}
          <code>SUPABASE_SERVICE_ROLE_KEY</code> în <code>.env.local</code>,
          apoi repornește serverul.
        </p>
      </div>
    </div>
  );
}
