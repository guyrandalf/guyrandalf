"use client";
import { useState } from "react";
import LeadForm from "@/components/referrals/lead-form";
import ReferralResult from "@/components/referrals/referral-result";

type Referral = {
  leadName: string;
  partner: string | null;
  status: "Referred" | "Pending";
};

export default function LeadFormWrapper({
  initialReferrals,
}: {
  initialReferrals: Referral[];
}) {
  const [referrals, setReferrals] = useState<Referral[]>(initialReferrals);

  const handleLeadSubmitted = (referral: Referral) => {
    setReferrals((prev) => [referral, ...prev]);
  };

  return (
    <div className="space-y-4">
      <LeadForm onLeadSubmitted={handleLeadSubmitted} />
      {referrals.length > 0 && (
        <div className="space-y-4">
          {referrals.map((referral, index) => (
            <ReferralResult
              key={index}
              leadName={referral.leadName}
              partner={referral.partner}
              status={referral.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}
