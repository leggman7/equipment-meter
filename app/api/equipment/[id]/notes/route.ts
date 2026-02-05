import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const sql = getDb();
    const rows = await sql`
      SELECT id, content, created_at FROM notes
      WHERE equipment_id = ${id}
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { content } = await request.json();

    if (!content || typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "Note content is required" },
        { status: 400 }
      );
    }

    const sql = getDb();
    const rows = await sql`
      INSERT INTO notes (equipment_id, content) VALUES (${id}, ${content.trim()})
      RETURNING id, content, created_at
    `;
    return NextResponse.json(rows[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to add note" },
      { status: 500 }
    );
  }
}
