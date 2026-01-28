import { NextResponse } from "next/server";
import brands from "@data/brands.json";

export async function GET() {
  return NextResponse.json(brands);
}
