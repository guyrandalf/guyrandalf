import { Metadata } from "next";
import LeadFormWrapper from "@/components/referrals/lead-form-wrapper";

export const metadata: Metadata = {
  title: "Referral Lead Connector | Portfolio",
  description: "A mini referral system inspired by Baton Leads",
};

async function getPastReferrals() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/projects/referrals/api/referrals`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch referrals");
  return res.json();
}

export default async function ReferralsPage() {
  const initialReferrals = await getPastReferrals();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Referral Lead Connector</h1>
      <p className="text-muted-foreground mb-6">
        A simple demo of submitting and matching service leads, inspired by
        Baton Leads' referral network.
      </p>
      <LeadFormWrapper initialReferrals={initialReferrals} />
    </div>
  );
}
