import type { Campaign, Promotion } from "@/lib/supabase/types";

const inputCls =
  "w-full rounded border border-neutral-300 dark:border-neutral-700 bg-transparent px-3 py-2 text-sm";
const labelCls = "block text-sm font-medium mb-1 mt-4";

function toLocalInputValue(iso: string | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export default function CampaignForm({
  action,
  promotions,
  campaign,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  promotions: Promotion[];
  campaign?: Campaign;
  submitLabel: string;
}) {
  return (
    <form action={action} className="max-w-lg">
      <label className={labelCls} htmlFor="name">
        Nume campanie
      </label>
      <input
        id="name"
        name="name"
        required
        defaultValue={campaign?.name}
        className={inputCls}
        placeholder="Black Friday"
      />

      <label className={labelCls} htmlFor="description">
        Descriere (opțional)
      </label>
      <textarea
        id="description"
        name="description"
        rows={2}
        defaultValue={campaign?.description}
        className={inputCls}
      />

      <label className={labelCls} htmlFor="promotion_id">
        Promoție asociată (opțional)
      </label>
      <select
        id="promotion_id"
        name="promotion_id"
        defaultValue={campaign?.promotion_id ?? ""}
        className={inputCls}
      >
        <option value="">Fără promoție</option>
        {promotions.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls} htmlFor="starts_at">
            Începe la
          </label>
          <input
            id="starts_at"
            name="starts_at"
            type="datetime-local"
            required
            defaultValue={toLocalInputValue(campaign?.starts_at)}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls} htmlFor="ends_at">
            Se termină la
          </label>
          <input
            id="ends_at"
            name="ends_at"
            type="datetime-local"
            required
            defaultValue={toLocalInputValue(campaign?.ends_at)}
            className={inputCls}
          />
        </div>
      </div>

      <label className={labelCls} htmlFor="status">
        Status
      </label>
      <select
        id="status"
        name="status"
        defaultValue={campaign?.status ?? "scheduled"}
        className={inputCls}
      >
        <option value="scheduled">Programată</option>
        <option value="active">Activă</option>
        <option value="ended">Încheiată</option>
        <option value="cancelled">Anulată</option>
      </select>

      <button
        type="submit"
        className="mt-6 rounded bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium px-4 py-2"
      >
        {submitLabel}
      </button>
    </form>
  );
}
