import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { hours } = await request.json();

    if (typeof hours !== "number" || hours < 0) {
      return NextResponse.json(
        { error: "Hours must be a non-negative number" },
        { status: 400 }
      );
    }

    const sql = getDb();
    const rows = await sql`
      UPDATE equipment SET hours = ${hours} WHERE id = ${id}
      RETURNING id, name, hours
    `;

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Equipment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch {
    return NextResponse.json(
      { error: "Failed to update equipment" },
      { status: 500 }
    );
  }
}
