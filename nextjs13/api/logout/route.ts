import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    cookies().delete('email');
    cookies().delete('name');
    cookies().delete('picture');
    if (cookies().get('email')?.value !== '' || cookies().get('name')?.value !== '' || cookies().get('picture')?.value !== '') {
      throw new Error('cookie can not be deleted');
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ result: 'failed', error: error });
  }
  return NextResponse.json({ result: 'success' });
}
