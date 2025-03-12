"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

type Lead = {
  name: string;
  service: string;
  location: string;
};

type ReferralResponse = {
  leadName: string;
  partnerName: string | null;
  status: "Referred" | "Pending";
};

type LeadFormProps = {
  onLeadSubmitted: (referral: ReferralResponse) => void;
};

export default function LeadForm({ onLeadSubmitted }: LeadFormProps) {
  const [lead, setLead] = useState<Lead>({
    name: "",
    service: "",
    location: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/projects/referrals/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });

      if (!response.ok) {
        toast.error("Failed to submit lead");
        return false;
      }

      const data: ReferralResponse = await response.json();
      onLeadSubmitted(data);
      setLead({ name: "", service: "", location: "" });
    } catch (error) {
      console.error("Error submitting lead:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Customer Name
        </label>
        <Input
          id="name"
          value={lead.name}
          onChange={(e) => setLead({ ...lead, name: e.target.value })}
          placeholder="e.g., John Doe"
          className="mt-1"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-sm font-medium">
          Service Type
        </label>
        <Select
          value={lead.service}
          onValueChange={(value) => setLead({ ...lead, service: value })}
          disabled={isSubmitting}
        >
          <SelectTrigger id="service" className="mt-1">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="plumbing">Plumbing</SelectItem>
            <SelectItem value="electrical">Electrical</SelectItem>
            <SelectItem value="hvac">HVAC</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium">
          Location
        </label>
        <Select
          value={lead.location}
          onValueChange={(value) => setLead({ ...lead, location: value })}
          disabled={isSubmitting}
        >
          <SelectTrigger id="location" className="mt-1">
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="NY">New York</SelectItem>
            <SelectItem value="CA">California</SelectItem>
            <SelectItem value="TX">Texas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Lead"}
      </Button>
    </form>
  );
}
