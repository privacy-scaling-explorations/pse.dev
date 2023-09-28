import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const url = searchParams.get('url');
  const short = searchParams.get('short');
  const description = searchParams.get('description');

  try {
    if (!type || !url || !short || !description) throw new Error('Missing parameters');
    await sql`INSERT INTO Announcements (type, short, url, description) VALUES (${type}, ${short}, ${url}, ${description});`;
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }

  const announcements = await sql`SELECT * FROM Announcements;`;
  return NextResponse.json({ announcements }, { status: 200 });
}
