import type { ReactNode } from "react";

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-2 flex flex-col gap-3 text-sm leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Ultima actualizare: {updated}
      </p>
      <div className="mt-10 flex flex-col gap-8 text-zinc-700 dark:text-zinc-300">
        {children}
      </div>
    </div>
  );
}
