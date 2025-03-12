"use client";
import { useState } from "react";
import LeadForm from "@/components/referrals/lead-form";
import ReferralResult from "@/components/referrals/referral-result";
import type { ReferralResponse } from "@/lib/types";
import { toast } from "react-toastify";

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

  const handleDelete = async (id: string) => {
    console.log("DELETE", id);
    try {
      setReferrals((prev) => prev.filter((ref) => ref.id !== id));

      const response = await fetch("/projects/referrals/api/referrals", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        setReferrals(initialReferrals);
        toast.error("Failed to delete lead");
      } else {
        toast.success("Lead deleted successfully");
      }
    } catch (error) {
      setReferrals(initialReferrals);
      toast.error("Failed to delete lead");
    }
  };

  return (
    <div className="space-y-4">
      <LeadForm onLeadSubmitted={handleLeadSubmitted} />
      {referrals.length > 0 && (
        <div className="space-y-4">
          {referrals.map((referral, index) => (
            <ReferralResult
              key={index}
              id={referral.id}
              leadName={referral.leadName}
              partner={referral.partner}
              status={referral.status}
              discountCode={referral.discountCode}
              productName={referral.productName}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
