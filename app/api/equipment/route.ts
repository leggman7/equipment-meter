import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const sql = getDb();
    const rows = await sql`SELECT id, name, hours FROM equipment ORDER BY created_at ASC`;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch equipment" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "Equipment name is required" },
        { status: 400 }
      );
    }

    const sql = getDb();
    const rows = await sql`
      INSERT INTO equipment (name, hours) VALUES (${name.trim()}, 0)
      RETURNING id, name, hours
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to add equipment" },
      { status: 500 }
    );
  }
}
