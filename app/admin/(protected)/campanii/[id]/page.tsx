import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CampaignForm from "@/components/admin/CampaignForm";
import { updateCampaign } from "@/app/admin/(protected)/campanii/actions";

export default async function EditCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: campaign }, { data: promotions }] = await Promise.all([
    supabase.from("campaigns").select("*").eq("id", id).single(),
    supabase.from("promotions").select("*").order("name"),
  ]);

  if (!campaign) notFound();

  return (
    <div>
      <h1 className="text-lg font-semibold mb-6">Editează: {campaign.name}</h1>
      <CampaignForm
        action={updateCampaign.bind(null, id)}
        promotions={promotions ?? []}
        campaign={campaign}
        submitLabel="Salvează modificările"
      />
    </div>
  );
}
