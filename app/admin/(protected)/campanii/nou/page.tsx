import { createClient } from "@/lib/supabase/server";
import CampaignForm from "@/components/admin/CampaignForm";
import { createCampaign } from "@/app/admin/(protected)/campanii/actions";

export default async function NewCampaignPage() {
  const supabase = await createClient();
  const { data: promotions } = await supabase
    .from("promotions")
    .select("*")
    .order("name");

  return (
    <div>
      <h1 className="text-lg font-semibold mb-6">Campanie nouă</h1>
      <CampaignForm
        action={createCampaign}
        promotions={promotions ?? []}
        submitLabel="Creează campanie"
      />
    </div>
  );
}
