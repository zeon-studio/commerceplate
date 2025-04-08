import { createCustomer, getCustomerAccessToken } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();
    const { customer, customerCreateErrors } = await createCustomer(input);
    const { token } = await getCustomerAccessToken(input);

    if (customerCreateErrors.length > 0) {
      return NextResponse.json(
        { errors: customerCreateErrors },
        { status: 400 },
      );
    }
    const cookieStore = await cookies();
    cookieStore.set("token", token);

    return NextResponse.json({ ...customer, token });
  } catch (error: any) {
    const { message, status } = error.error;
    return NextResponse.json(
      { errors: [{ code: "INTERNAL_ERROR", message }] },
      { status },
    );
  }
}
