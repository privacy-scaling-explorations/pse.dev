import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';


// /api/new-announce?id=123&type=info&url=https://example.com&short=Example&description=Learnings from the KZG Ceremony
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id') ?? new Date().getTime().toString(); // use timestamp as id if not provided
  const type = searchParams.get('type');
  const url = searchParams.get('url');
  const short = searchParams.get('short');
  const description = searchParams.get('description');

  console.table({ id, type, url, short, description })

  try {
    if (!type || !url || !short || !description || !id) throw new Error('Missing parameters');
    await sql`INSERT INTO Announcements (id, type, short, url, description) VALUES (${id},${type}, ${short}, ${url}, ${description});`;
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error }, { status: 500 });
  }

  const announcements = await sql`SELECT * FROM Announcements;`;
  return NextResponse.json({ announcements }, { status: 200 });
}
