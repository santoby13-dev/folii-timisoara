"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <form
        action={formAction}
        className="w-full max-w-sm bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 shadow-sm"
      >
        <h1 className="text-lg font-semibold mb-1">Admin — Folii Timișoara</h1>
        <p className="text-sm text-neutral-500 mb-6">
          Autentifică-te pentru a gestiona produse, prețuri și promoții.
        </p>

        <label className="block text-sm font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          className="w-full mb-4 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
        />

        <label className="block text-sm font-medium mb-1" htmlFor="password">
          Parolă
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full mb-4 rounded border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm"
        />

        {state?.error && (
          <p className="text-sm text-red-600 mb-4">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium py-2 disabled:opacity-60"
        >
          {pending ? "Se conectează…" : "Conectare"}
        </button>
      </form>
    </div>
  );
}
