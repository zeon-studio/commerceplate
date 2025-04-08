import { getCustomerAccessToken, getUserDetails } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();
    const { token, customerLoginErrors } = await getCustomerAccessToken(input);
    if (customerLoginErrors.length > 0) {
      return NextResponse.json(
        { errors: customerLoginErrors },
        { status: 400 },
      );
    }
    const cookieStore = await cookies();
    cookieStore.set("token", token);

    const { customer } = await getUserDetails(token);

    return NextResponse.json({ ...customer, token });
  } catch (error: any) {
    const { message, status } = error.error;
    return NextResponse.json(
      { errors: [{ code: "INTERNAL_ERROR", message }] },
      { status },
    );
  }
}
