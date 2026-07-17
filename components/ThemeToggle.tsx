"use client";

export default function ThemeToggle({
  className = "",
}: {
  className?: string;
}) {
  function toggleTheme() {
    const root = document.documentElement;
    const next =
      root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  // Ambele iconițe sunt în DOM; CSS-ul decide care se vede, deci butonul
  // rămâne identic pe server și client (fără hydration mismatch).
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Comută între tema luminoasă și cea întunecată"
      className={`h-10 w-10 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 ${className}`}
    >
      {/* Lună — vizibilă pe tema light (comută spre dark) */}
      <svg
        className="h-5 w-5 dark:hidden"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M17 11.5A7 7 0 0 1 8.5 3a7 7 0 1 0 8.5 8.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {/* Soare — vizibil pe tema dark (comută spre light) */}
      <svg
        className="hidden h-5 w-5 dark:block"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M10 1.5v2M10 16.5v2M18.5 10h-2M3.5 10h-2M16 4l-1.4 1.4M5.4 14.6 4 16M16 16l-1.4-1.4M5.4 5.4 4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
}
