"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function NewsletterSignup() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = data.get("email");
    const company = data.get("company");

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Eroare la trimitere.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Eroare la trimitere."
      );
    }
  }

  return (
    <div>
      <p className="text-lg font-semibold">Rămâi la curent</p>
      <p className="mt-2 max-w-sm text-zinc-600 dark:text-zinc-400">
        Lasă-ți emailul și te anunțăm despre produse noi și oferte.
      </p>

      {status === "success" ? (
        <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-green-800 dark:bg-green-950 dark:text-green-200">
          Mulțumim! Te-ai abonat cu succes.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2">
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              required
              placeholder="adresa@email.com"
              disabled={status === "sending"}
              className="min-w-0 flex-1 rounded-lg border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-blue-600 disabled:opacity-60 dark:border-white/10"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "..." : "Abonează-te"}
            </button>
          </div>
          {status === "error" && (
            <p className="text-xs text-red-600 dark:text-red-400">
              {errorMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
