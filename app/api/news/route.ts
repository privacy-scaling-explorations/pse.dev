import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const announcements = await sql`SELECT * FROM Announcements;`;
    return NextResponse.json({ announcements: announcements?.rows ?? [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
