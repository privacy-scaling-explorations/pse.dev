import { getChannelMessages } from '@/common/discord';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const announcements = await getChannelMessages();
    return NextResponse.json({ announcements: announcements ?? [] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
