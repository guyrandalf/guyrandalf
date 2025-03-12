"use client";
import { useState } from "react";
import LeadForm from "@/components/referrals/lead-form";
import ReferralResult from "@/components/referrals/referral-result";
import type { ReferralResponse } from "@/lib/types";

export default function LeadFormWrapper({
  initialReferrals,
}: {
  initialReferrals: ReferralResponse[];
}) {
  const [referrals, setReferrals] =
    useState<ReferralResponse[]>(initialReferrals);

  const handleLeadSubmitted = (referral: ReferralResponse) => {
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
