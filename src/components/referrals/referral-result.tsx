import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Referral = {
  leadName: string;
  partner: string | null;
  status: "Referred" | "Pending";
};

export default function ReferralResult({
  leadName,
  partner,
  status,
}: Referral) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Referral Outcome</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          <span className="font-medium">Lead:</span> {leadName}
        </p>
        <p>
          <span className="font-medium">Partner:</span>{" "}
          {partner || "No match found"}
        </p>
        <p>
          <span className="font-medium">Status:</span>{" "}
          <span
            className={
              status === "Referred" ? "text-green-600" : "text-yellow-600"
            }
          >
            {status}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
