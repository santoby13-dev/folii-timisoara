import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-zinc-50 dark:border-white/10 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-zinc-600 sm:flex-row sm:items-center sm:justify-between dark:text-zinc-400">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. Toate drepturile
          rezervate.
        </p>
        <div className="flex gap-4">
          <a href={siteConfig.phoneHref} className="hover:text-blue-600">
            {siteConfig.phone}
          </a>
          <a href={`mailto:${siteConfig.email}`} className="hover:text-blue-600">
            {siteConfig.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
