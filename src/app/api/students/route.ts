import { pool } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

export async function GET() {
  const [rows] = await pool.query<RowDataPacket[]>(
    "SELECT * FROM students ORDER BY id DESC",
  );
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const { name, course } = await req.json();
  await pool.query<ResultSetHeader>(
    "INSERT INTO students (name, course) VALUES (?, ?)",
    [name, course],
  );
  return NextResponse.json({ ok: true });
}

export async function PUT(req: Request) {
  const { id, name, course } = await req.json();
  await pool.query<ResultSetHeader>(
    "UPDATE students SET name=?, course=? WHERE id=?",
    [name, course, id],
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await pool.query<ResultSetHeader>("DELETE FROM students WHERE id=?", [id]);
  return NextResponse.json({ ok: true });
}
