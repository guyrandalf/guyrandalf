import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


type RawReferral = {
    leadName: string;
    service: string;
    location: string;
    status: "Referred" | "Pending";
    partners: { name: string }[] | null;
  };
  
  type FormattedReferral = {
    leadName: string;
    service: string;
    location: string;
    partner: string | null;
    status: "Referred" | "Pending";
  };

export async function POST(req: NextRequest) {
  try {
    const { name, service, location } = await req.json();

    if (!service || !location) {
      return NextResponse.json(
        { error: "Service and location are required" },
        { status: 400 }
      );
    }

    // Check for a matching partner
    const { data: partner, error: partnerError } = await supabase
      .from("partners")
      .select("*")
      .eq("service", service)
      .eq("location", location)
      .maybeSingle();

    if (partnerError) throw partnerError;

    // Determine referral status
    const status = partner ? "Referred" : "Pending";

    // Insert the referral into the database
    const { error: insertError } = await supabase.from("referrals").insert({
      leadName: name,
      service,
      location,
      partnerId: partner?.id || null,
      status,
    });

    if (insertError) throw insertError;

    // Return response
    return NextResponse.json({
      leadName: name,
      partner: partner?.name || null,
      status,
    });
  } catch (error) {
    console.error("Error processing lead:", error);
    return NextResponse.json(
      { error: "Failed to process lead" },
      { status: 500 }
    );
  }
}


export async function GET() {
    try {
      const { data, error } = await supabase
        .from("referrals")
        .select(
          `
          leadName,
          service,
          location,
          status,
          partners (
            name
          )
          `
        )
        .order("id", { ascending: false });
  
      if (error) throw error;
  
      const formattedData = (data as RawReferral[]).map(
        (referral): FormattedReferral => ({
          leadName: referral.leadName,
          service: referral.service,
          location: referral.location,
          partner: referral.partners?.name || null,
          status: referral.status,
        })
      );
  
      return NextResponse.json(formattedData || []);
    } catch (error) {
      console.error("Error fetching referrals:", error);
      return NextResponse.json(
        { error: "Failed to fetch referrals" },
        { status: 500 }
      );
    }
  }