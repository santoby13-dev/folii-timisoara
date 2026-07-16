"use client";

import { useMemo, useState } from "react";
import { useCart, formatPrice } from "@/lib/cart";
import { trackAddToCart } from "@/lib/analytics";
import type { FolieVariant } from "@/lib/folie-variants";
import { siteConfig } from "@/lib/site-config";

type Props = {
  productSlug: string;
  categorySlug: string;
  productName: string;
  variants: FolieVariant[];
  unitLabel?: string;
};

type Recommendation = {
  variant: FolieVariant;
  /** Metri de rolă rămași după acoperirea lungimii cerute. */
  spareLength: number;
};

const meters = (value: string) => parseFloat(value.replace(",", "."));

/**
 * Calculator de dimensiuni pentru folia vândută la rolă: clientul introduce
 * înălțimea închiderii și lungimea totală de acoperit, iar noi îi recomandăm,
 * pentru fiecare grosime, cea mai ieftină rolă reală care acoperă ambele
 * dimensiuni (lățimea rolei ≥ înălțime, lungimea rolei ≥ lungimea totală).
 * Elimina nesiguranța „ce comand exact" — recomandarea finală rămâne
 * confirmată telefonic la plasarea comenzii.
 */
export default function SizeCalculator({
  productSlug,
  categorySlug,
  productName,
  variants,
  unitLabel = "rolă",
}: Props) {
  const { addItem, openDrawer } = useCart();
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const maxWidth = useMemo(
    () => Math.max(...variants.map((v) => meters(v.width))),
    [variants]
  );
  const maxLength = useMemo(
    () => Math.max(...variants.map((v) => meters(v.length))),
    [variants]
  );

  const h = parseFloat(height.replace(",", "."));
  const l = parseFloat(length.replace(",", "."));
  const inputsValid =
    Number.isFinite(h) && Number.isFinite(l) && h > 0 && l > 0;

  const recommendations = useMemo<Recommendation[]>(() => {
    if (!inputsValid) return [];
    const byThickness = new Map<string, Recommendation>();
    for (const variant of variants) {
      if (meters(variant.width) < h) continue;
      if (meters(variant.length) < l) continue;
      const current = byThickness.get(variant.thickness);
      if (!current || variant.price < current.variant.price) {
        byThickness.set(variant.thickness, {
          variant,
          spareLength: meters(variant.length) - l,
        });
      }
    }
    return [...byThickness.values()].sort(
      (a, b) => a.variant.price - b.variant.price
    );
  }, [variants, inputsValid, h, l]);

  function handleAdd(variant: FolieVariant) {
    const item = {
      productSlug,
      categorySlug,
      name: productName,
      thickness: variant.thickness,
      width: variant.width,
      length: variant.length,
      unitPrice: variant.price,
      quantity: 1,
      unitLabel,
      sku: variant.sku,
    };
    addItem(item);
    trackAddToCart(item);
    openDrawer();
  }

  return (
    <div className="mt-8 rounded-2xl border border-black/10 p-6 dark:border-white/10">
      <h2 className="text-base font-semibold">
        Ce rolă comand pentru terasa mea?
      </h2>
      <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Introdu dimensiunile și îți arătăm variantele care se potrivesc.
      </p>

      <form
        className="mt-4 grid gap-4 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
        }}
      >
        <div>
          <label htmlFor="calc-height" className="block text-sm font-medium">
            Înălțimea închiderii (m)
          </label>
          <input
            id="calc-height"
            type="number"
            inputMode="decimal"
            min="0.1"
            max="10"
            step="0.01"
            value={height}
            onChange={(e) => {
              setHeight(e.target.value);
              setSubmitted(false);
            }}
            className="mt-1 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none focus:border-blue-600 dark:border-white/10"
            placeholder="ex: 2.20"
          />
        </div>
        <div>
          <label htmlFor="calc-length" className="block text-sm font-medium">
            Lungimea totală de acoperit (m)
          </label>
          <input
            id="calc-length"
            type="number"
            inputMode="decimal"
            min="0.1"
            max="200"
            step="0.1"
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
              setSubmitted(false);
            }}
            className="mt-1 w-full rounded-xl border border-black/10 bg-transparent px-4 py-3 outline-none focus:border-blue-600 dark:border-white/10"
            placeholder="ex: 8"
          />
        </div>
        <button
          type="submit"
          disabled={!inputsValid}
          className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40 sm:col-span-2 sm:justify-self-start"
        >
          Arată variantele potrivite
        </button>
      </form>

      {submitted && inputsValid && (
        <div className="mt-5 border-t border-black/10 pt-5 dark:border-white/10">
          {recommendations.length > 0 ? (
            <>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Role care acoperă o înălțime de{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {h.toLocaleString("ro-RO")} m
                </span>{" "}
                și o lungime totală de{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {l.toLocaleString("ro-RO")} m
                </span>
                , pe grosimi:
              </p>
              <ul className="mt-3 flex flex-col gap-3">
                {recommendations.map(({ variant, spareLength }) => (
                  <li
                    key={`${variant.thickness}-${variant.width}-${variant.length}`}
                    className="flex flex-col gap-3 rounded-xl border border-black/10 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10"
                  >
                    <div>
                      <p className="font-semibold">
                        {variant.thickness} · lățime {variant.width} · rolă{" "}
                        {variant.length}
                      </p>
                      <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                        {formatPrice(variant.price)} / {unitLabel}
                        {spareLength > 0 && (
                          <>
                            {" "}
                            · îți rămân ~{spareLength.toLocaleString("ro-RO")}{" "}
                            m de rezervă
                          </>
                        )}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAdd(variant)}
                      className="shrink-0 rounded-full border border-blue-600 px-5 py-2 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                    >
                      Adaugă în coș
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
                Recomandare orientativă — confirmăm împreună varianta potrivită
                la confirmarea telefonică a comenzii.
              </p>
            </>
          ) : (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {h > maxWidth ? (
                <>
                  Înălțimea introdusă depășește lățimea maximă de rolă (
                  {maxWidth.toLocaleString("ro-RO")} m).
                </>
              ) : l > maxLength ? (
                <>
                  Lungimea introdusă depășește cea mai lungă rolă (
                  {maxLength.toLocaleString("ro-RO")} m) — e posibil să ai
                  nevoie de mai multe role.
                </>
              ) : (
                <>Nu am găsit o rolă care să acopere exact aceste dimensiuni.</>
              )}{" "}
              Sună-ne la{" "}
              <a
                href={siteConfig.phoneHref}
                className="font-semibold text-blue-600 hover:underline"
              >
                {siteConfig.phone}
              </a>{" "}
              și găsim împreună soluția potrivită.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
