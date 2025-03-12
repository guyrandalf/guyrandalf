import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ReferralResponse } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface ReferralResultProps extends ReferralResponse {
  onDelete: (id: string) => void;
}

export default function ReferralResult({
  id,
  leadName,
  partner,
  status,
  discountCode,
  productName,
  onDelete,
}: ReferralResultProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Referral Outcome</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(id)}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
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
        {discountCode && productName && (
          <p className="text-sm text-blue-600">
            <span className="font-medium">Discount Unlocked:</span> 10% off{" "}
            {productName} (Code: {discountCode})
          </p>
        )}
      </CardContent>
    </Card>
  );
}
