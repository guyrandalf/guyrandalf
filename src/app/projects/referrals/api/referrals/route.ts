import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { ReferralResponse } from "@/lib/types";

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
    discounts: { discountCode: string; products: { name: string } } | null;
  };
  
  type FormattedReferral = {
    leadName: string;
    service: string;
    location: string;
    partner: string | null;
    status: "Referred" | "Pending";
    discountCode?: string;
  productName?: string;
  };

  function generateDiscountCode(referralId: number): string {
    return `REF${referralId}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  }

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
    const { data: referral, error: insertError } = await supabase.from("referrals").insert({
      leadName: name,
      service,
      location,
      partnerId: partner?.id || null,
      status,
    })
    .select("id, leadName, status")
      .single();

    if (insertError) throw insertError;

    let discountCode: string | undefined;
    let productName: string | undefined;

    if (status === "Referred") {
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("id, name")
        .limit(1)
        .single();

      if (productError || !product) throw new Error("No products available");

      discountCode = generateDiscountCode(referral.id);

      const { error: discountError } = await supabase
        .from("discounts")
        .insert({
          referralId: referral.id,
          productId: product.id,
          discountCode,
        });

      if (discountError) throw discountError;

      productName = product.name;
    }

    const response: ReferralResponse = {
      id: referral
        ? referral.id.toString()
        : "0",
      leadName: name,
      partner: partner?.name || null,
      status,
      ...(discountCode && { discountCode }),
      ...(productName && { productName }),
    };
    // Return response
    return NextResponse.json(response);
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
      .select(`
        *,
        partners:partnerId (
          name
        ),
        discounts (
          discountCode,
          products:productId (
            name
          )
        )
      `)
      .order("id", { ascending: false });

    if (error) throw error;

    const formattedData = data?.map(referral => ({
      id: referral.id,
      leadName: referral.leadName,
      partner: referral.partners?.name || null,
      status: referral.status,
      discountCode: referral.discounts?.[0]?.discountCode,
      productName: referral.discounts?.[0]?.products?.name
    }));

    return NextResponse.json(formattedData || []);
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return NextResponse.json(
      { error: "Failed to fetch referrals" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    const { error: discountError } = await supabase
      .from("discounts")
      .delete()
      .eq("referralId", id);

    if (discountError) throw discountError;

    const { error: referralError } = await supabase.from("referrals").delete().eq("id", id);

    if (referralError) throw referralError;

    return NextResponse.json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("Error deleting lead:", error);
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}