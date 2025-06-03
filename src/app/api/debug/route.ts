import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasShopifyDomain: !!process.env.SHOPIFY_STORE_DOMAIN,
    hasStorefrontToken: !!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    hasApiSecret: !!process.env.SHOPIFY_API_SECRET_KEY,
    domain: process.env.SHOPIFY_STORE_DOMAIN ? '[MASKED]' : 'undefined',
    nodeEnv: process.env.NODE_ENV,
  });
}