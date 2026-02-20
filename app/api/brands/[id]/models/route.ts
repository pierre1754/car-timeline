import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!/^[a-z0-9-]+$/.test(id)) {
    return NextResponse.json({ error: "Invalid brand id" }, { status: 400 });
  }

  const filePath = path.join(
    process.cwd(),
    "lib",
    "data",
    "models",
    `${id}.json`,
  );

  if (!fs.existsSync(filePath)) {
    return NextResponse.json([]);
  }

  const models = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(models);
}
