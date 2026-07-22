const steps = ["Coș", "Livrare și plată", "Confirmare"];

/**
 * Indicator de pași pentru flow-ul de comandă: Coș → Livrare și plată →
 * Confirmare. `current` este indexul pasului activ (0-based).
 */
export default function CheckoutSteps({ current }: { current: 0 | 1 | 2 }) {
  return (
    <ol className="flex items-center gap-2 text-sm" aria-label="Pașii comenzii">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={step} className="flex items-center gap-2">
            {i > 0 && (
              <span
                className={`h-px w-6 sm:w-10 ${
                  i <= current
                    ? "bg-blue-600"
                    : "bg-zinc-300 dark:bg-zinc-700"
                }`}
                aria-hidden="true"
              />
            )}
            <span
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                done
                  ? "bg-blue-600 text-white"
                  : active
                    ? "border-2 border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border border-zinc-300 text-zinc-400 dark:border-zinc-700 dark:text-zinc-500"
              }`}
              aria-hidden="true"
            >
              {done ? "✓" : i + 1}
            </span>
            <span
              className={
                active
                  ? "font-semibold text-zinc-900 dark:text-zinc-100"
                  : done
                    ? "text-zinc-600 dark:text-zinc-400"
                    : "hidden text-zinc-400 sm:inline dark:text-zinc-500"
              }
              aria-current={active ? "step" : undefined}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
