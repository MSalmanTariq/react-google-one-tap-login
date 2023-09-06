import { type NextRequest, NextResponse } from 'next/server' 
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  const reqData = await request.json();

  const email = reqData.email;
  cookies().set({
    name: 'email',
    value: email
  })
  
  const name = reqData.name;
  cookies().set({
    name: 'name',
    value: name
  })

  const picture = reqData.picture;
  cookies().set({
    name: 'picture',
    value: picture
  })
  return NextResponse.json({result:'success'})
}
